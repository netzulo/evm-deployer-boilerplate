const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");


describe("[UNIT] Tokens --> base contracts to implemented tokens standards", function () {
  async function deployFixture() {
    const [owner, user] = await ethers.getSigners();
    const mac = await (await ethers.getContractFactory("MAC")).deploy();
    const uct = await (await ethers.getContractFactory("UserCreditToken")).deploy();
    // const auth = await (await ethers.getContractFactory("Auth")).deploy();
    return { owner, user, mac, uct, };
  }
  describe("class: UserCreditToken", function () {
    it("method: agentAdd", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      const txn = await (await uct.agentAdd(user.address)).wait();
      assert.equal(txn.transactionHash.length, 66);
      assert.equal((await uct.agents(user.address)).active, true);
    });
    it("method: agentDel", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await uct.agentAdd(user.address);
      const txn = await (await uct.agentDel(user.address)).wait();
      assert.equal(txn.transactionHash.length, 66);
      assert.equal((await uct.agents(user.address)).active, false);
    });
    it("method: mint, regular user can't generate tokens", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await expect(uct.connect(user).mint(
        user.address, 1)).to.be.revertedWith("Baac: caller is not an agent");
      assert.equal(await uct.balanceOf(user.address), 0);
    });
    it("method: burn, regular user can destroy tokens", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await (await uct.mint(user.address, 1)).wait();
      assert.equal(await uct.balanceOf(user.address), 1);
      const txn = await (await uct.connect(user).burn(1)).wait();
      assert.equal(txn.transactionHash.length, 66);
      assert.equal(await uct.balanceOf(user.address), 0);
    });
    it("method: pause, regular user can't pause", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await expect(uct.connect(user).pause()).to.be.reverted;
    });
    it("method: pause, agent user can pause", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await uct.agentAdd(user.address);
      await expect(uct.connect(user).pause()).to.not.be.revertedWith("MAC: caller is not an agent");
    });
    it("method: unpause, regular user can't unpause", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await expect(uct.connect(user).unpause()).to.be.reverted;
    });
    it("method: unpause, agent user can unpause", async function () {
      const { user, uct } = await loadFixture(deployFixture);
      await uct.agentAdd(user.address);
      await expect(uct.connect(user).unpause()).to.not.be.revertedWith("MAC: caller is not an agent");
    });
  });
  //describe("ERC4626", function () {
  //  // it("Can be minted", async function () {
  //  //   const { user, owner, exampleErc4626 } = await loadFixture(deployFixture);
  //  //   const sc = exampleErc4626;
  //  //   await sc.mint(0, owner.address);
  //  //   assert.equal(await l.balanceOf(owner.address), 0);
  //  // });
  //});
});
