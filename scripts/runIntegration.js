const { spawnSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const https = require("https");
const { spawn } = require("child_process");

const TARGET = process.argv[2] || "docker";
const DEFAULT_TIMEOUT_MS = 60000;
const KEEP_ALIVE = process.argv.includes("--keep-alive");

const TARGETS = {
  docker: {
    networkName: "docker",
    rpcUrl: process.env.DOCKER_RPC_URL || "http://127.0.0.1:9545",
    start() {
      run("docker", ["compose", "-f", "docker-compose.yml", "up", "-d", "--build"]);
      return async () => {
        safeRun("docker", ["compose", "-f", "docker-compose.yml", "down", "--remove-orphans"]);
      };
    },
  },
  devnet: {
    networkName: "devnet",
    rpcUrl: process.env.DEVNET_RPC_URL || "http://127.0.0.1:8545",
    start() {
      const processRef = spawn(
        "npx",
        ["hardhat", "node", "--hostname", "127.0.0.1", "--port", "8545"],
        {
          stdio: "inherit",
          shell: false,
        }
      );

      return async () => {
        if (processRef.exitCode !== null) {
          return;
        }

        processRef.kill("SIGTERM");
        await new Promise((resolve) => {
          processRef.once("exit", () => resolve());
          setTimeout(() => {
            if (processRef.exitCode === null) {
              processRef.kill("SIGKILL");
            }
            resolve();
          }, 5000);
        });
      };
    },
  },
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

function safeRun(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
  });

  return result.status === 0;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRpc(url, timeoutMs) {
  const target = new URL(url);
  const client = target.protocol === "https:" ? https : http;
  const body = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_chainId",
    params: [],
    id: 1,
  });
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      await new Promise((resolve, reject) => {
        const request = client.request(
          {
            method: "POST",
            hostname: target.hostname,
            port: target.port,
            path: target.pathname || "/",
            headers: {
              "content-type": "application/json",
              "content-length": Buffer.byteLength(body),
            },
          },
          (response) => {
            let data = "";
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                resolve(data);
                return;
              }
              reject(new Error(`rpc responded with status ${response.statusCode}`));
            });
          }
        );

        request.on("error", reject);
        request.write(body);
        request.end();
      });

      return;
    } catch (error) {
      await wait(1500);
    }
  }

  throw new Error(`RPC ${url} was not ready after ${timeoutMs}ms`);
}

async function main() {
  const targetConfig = TARGETS[TARGET];
  if (!targetConfig) {
    throw new Error(`Unsupported integration target: ${TARGET}`);
  }

  const integrationFiles = fs
    .readdirSync("tests/integration")
    .filter((fileName) => fileName.endsWith(".test.js"))
    .map((fileName) => `tests/integration/${fileName}`);

  if (integrationFiles.length === 0) {
    throw new Error("No integration test files were found in tests/integration");
  }

  run("yarn", ["build"]);
  const cleanup = await targetConfig.start();

  try {
    await waitForRpc(targetConfig.rpcUrl, DEFAULT_TIMEOUT_MS);
    run("npx", ["hardhat", "test", "--network", targetConfig.networkName, ...integrationFiles, "--no-compile"]);
  } finally {
    if (!KEEP_ALIVE) {
      await cleanup();
    }
  }
}

main().catch((error) => {
  console.error("[integration]", error.message);
  process.exitCode = 1;
});