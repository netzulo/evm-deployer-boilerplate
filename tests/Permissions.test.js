const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("[UNIT]: Permissions --> all permissions classes", function () {
  async function deployFixture() {
    const [owner, user] = await ethers.getSigners();
    const mac = await (await ethers.getContractFactory("MAC")).deploy();
    return { owner, user, mac, };
  }
  describe("class: MAC", function () {
    it("constructor: instance works", async function () {
      const { mac } = await loadFixture(deployFixture);
      assert.equal(mac.address.length, 42);
      assert.equal(await mac.agentsTotal(), 0);
    });
    it("method: isAgent, fails if caller is not an agent", async function () {
      const { mac, owner, user } = await loadFixture(deployFixture);
      await (await mac.agentAdd(user.address)).wait();
      await (await mac.agentDel(user.address)).wait();
      //assert.equal(await mac.isAgent(user.address), true);
      await expect(mac.connect(user.address).isAgent(owner.address)).to.be.revertedWith("MAC: caller is not an agent");
    });
    it("method: agentAdd", async function () {
      const { mac, user } = await loadFixture(deployFixture);
      const txn = await (await mac.agentAdd(user.address)).wait();
      assert.equal(txn.transactionHash.length, 66);
      assert.equal(await mac.agentsTotal(), 1);
      assert.equal(await mac.isAgent(user.address), true);
    });
    it("method: agentAdd, fails if agent is already exist", async function () {
      const { mac, user } = await loadFixture(deployFixture);
      await (await mac.agentAdd(user.address)).wait();
      await expect(mac.agentAdd(user.address)).to.be.revertedWith("MAC: agent already exists");
    });
    it("method: agentDel", async function () {
      const { mac, user } = await loadFixture(deployFixture);
      await (await mac.agentAdd(user.address)).wait();
      const txn = await (await mac.agentDel(user.address)).wait();
      assert.equal(txn.transactionHash.length, 66);
      assert.equal(await mac.agentsTotal(), 1);
    });
    it("method: agentDel, fails if agent does not exist", async function () {
      const { mac, user } = await loadFixture(deployFixture);
      await expect(mac.agentDel(user.address)).to.be.revertedWith("MAC: agent does not exist");
    });
  });
});
