//SPDX-License-Identifier: MIT
pragma solidity >=0.6.2;

interface IRouterVelodrome {

    struct route {
        address from;
        address to;
        bool stable;
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        route[] calldata routes,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}