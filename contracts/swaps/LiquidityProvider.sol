// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISushiSwapRouter {
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity);
}

contract LiquidityProvider {
    address public token;
    address public router; // Dirección del SushiSwap Router
    address public owner;

    constructor(address _token, address _router) {
        token = _token;
        router = _router;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function provideLiquidity(uint256 tokenAmount, uint256 ethAmount) external onlyOwner {
        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);

        IERC20(token).approve(router, tokenAmount);

        ISushiSwapRouter(router).addLiquidity(
            token,
            0xC02aaa39b223FE8D0a0e5C4F27eAD9083C756Cc2, // WETH dirección
            tokenAmount,
            ethAmount,
            1,
            1,
            msg.sender,
            block.timestamp + 300
        );
    }
}
