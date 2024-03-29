pragma solidity 0.8.13;

import "./interfaces/IRouterVelodrome.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./interfaces/IFactoryVelodrome.sol";

interface IPair {
    function token0() external view returns (address);
    function getReserves() external view returns(uint256, uint256);
}

contract DexForwarderOptimism is Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IRouterVelodrome public router;
    address public trustedForwarder;
    IFactory public factory;
    IERC20Upgradeable public nativeWrappedToken;

    event AddLiquidity(address tokenA, address tokenB, address user, uint256 amountA, uint256 amountB);
    event RemoveLiquidity(address tokenA, address tokenB, address user, uint256 amountA, uint256 amountB);

    function initialize(IRouterVelodrome _router, address _trustedForwarder, IERC20Upgradeable _nativeWrappedToken) external initializer {
        __Ownable_init();
        router = _router;
        trustedForwarder = _trustedForwarder;
        factory = IFactory(_router.factory());
        nativeWrappedToken = _nativeWrappedToken;
    }

    function swapExactTokensForTokens(
        //exactIn
        uint256 amountIn,
        uint256 amountOutMin,
        IRouterVelodrome.route[] calldata route,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        IERC20Upgradeable sourceToken = IERC20Upgradeable(route[0].from);
        sourceToken.safeTransferFrom(_msgSender(), address(this), amountIn);

        if (sourceToken.allowance(address(this), address(router)) < amountIn) {
            sourceToken.approve(address(router), type(uint256).max);
        }

        amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            route,
            to,
            deadline
        );
    }

    function addLiquidity(
        IERC20Upgradeable tokenA,
        IERC20Upgradeable tokenB,
        bool stable,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external  returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        tokenA.safeTransferFrom(_msgSender(), address(this), amountADesired);
        tokenB.safeTransferFrom(_msgSender(), address(this), amountBDesired);


        if (tokenA.allowance(address(this), address(router)) < amountADesired) {
            tokenA.safeApprove(address(router), type(uint256).max);
        }

        if (tokenB.allowance(address(this), address(router)) < amountBDesired) {
            tokenB.safeApprove(address(router), type(uint256).max);
        }

        (amountA, amountB, liquidity) = _addLiquidity(tokenA, tokenB, stable, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline);
    }

    function _addLiquidity(
        IERC20Upgradeable tokenA,
        IERC20Upgradeable tokenB,
        bool stable,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) internal  returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        (amountA, amountB, liquidity) = router.addLiquidity(
            address(tokenA),
            address(tokenB),
            stable,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );

        //transfer the excess funds back
        uint256 excessA = amountADesired - amountA;
        if(excessA > 0) {
            tokenA.safeTransfer(_msgSender(), excessA);
        }

        uint256 excessB = amountBDesired - amountB;
        if(excessB > 0) {
            tokenB.safeTransfer(_msgSender(), excessB);
        }
    }

    function removeLiquidity(
        IERC20Upgradeable tokenA,
        IERC20Upgradeable tokenB,
        bool stable,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB) {

        IERC20Upgradeable lpToken = IERC20Upgradeable(factory.getPair(address(tokenA), address(tokenB), stable));

        if(lpToken.allowance(address(this), address(router)) < liquidity) {
            lpToken.safeApprove(address(router), type(uint256).max);
        }

        lpToken.safeTransferFrom(_msgSender(), address(this), liquidity);
        
        (amountA, amountB) = router.removeLiquidity(
            address(tokenA),
            address(tokenB),
            stable,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );

        emit RemoveLiquidity(address(tokenA), address(tokenB), to, amountA, amountB);
    }

    function addLiquiditySingleToken(
        IERC20Upgradeable tokenA,
        IERC20Upgradeable tokenB,
        bool stable,
        uint256 amountA,
        uint256 minAmountB
    ) external returns (uint256 _amountA, uint256 _amountB, uint256 _liquidity) {
        address _sender = _msgSender();
        tokenA.safeTransferFrom(_sender, address(this), amountA);

        if (tokenA.allowance(address(this), address(router)) < amountA/2) {
            tokenA.safeApprove(address(router), type(uint256).max);
        }

        //swap
        IRouterVelodrome.route[] memory path = new IRouterVelodrome.route[](1);
        path[0] = IRouterVelodrome.route({
            from: address(tokenA),
            to: address(tokenB),
            stable: stable
        });
        uint256[] memory amounts = router.swapExactTokensForTokens(amountA/2, minAmountB, path, address(this), block.timestamp);

        if (tokenB.allowance(address(this), address(router)) < amounts[1]) {
            tokenB.safeApprove(address(router), type(uint256).max);
        }

        (_amountA, _amountB,) = router.quoteAddLiquidity(
            address(tokenA), address(tokenB), stable, amounts[0], amounts[1]
        );

        (_amountA, _amountB, _liquidity) = _addLiquidity(
            tokenA, tokenB, stable, amounts[0], amounts[1], _amountA, _amountB, _sender, block.timestamp
        );

        // (_amountA, _amountB, _liquidity) = _addLiquidity(tokenA, tokenB, stable, amounts[0], amounts[1], amounts[0] * amountAPerc / 100_00, amounts[1] * amountBPerc / 100_00, _sender, block.timestamp);
        emit AddLiquidity(address(tokenA), address(tokenB), _sender, amounts[0], amounts[1]);
    }

    function addLiquidityNative(
        IERC20Upgradeable token,
        bool stable,
        uint256 minAmount
    ) external payable returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        
        //`token` should not be WETH
        require(token != nativeWrappedToken, "Invalid inputs");
        address _sender = _msgSender();

        IRouterVelodrome.route[] memory path = new IRouterVelodrome.route[](1);
        path[0] = IRouterVelodrome.route({
            from: address(nativeWrappedToken),
            to: address(token),
            stable: stable
        });
        uint256[] memory amounts = router.swapExactETHForTokens{value: msg.value}(minAmount, path, address(this), block.timestamp);

        if (token.allowance(address(this), address(router)) < amounts[1]) {
            token.safeApprove(address(router), type(uint256).max);
        }

        (amountA, amountB, liquidity) = router.addLiquidityETH(address(token), stable, amounts[1], amounts[1] * 95_00 / 100_00, amounts[0] * 95_00 / 100_00, _sender, block.timestamp);
        uint256 excess = address(this).balance;
        if(excess > 0 ) {
            payable(_sender).transfer(excess);
        }
        emit AddLiquidity(address(nativeWrappedToken), address(token), _sender, amountB, amountA);
    }

    function removeLiquidityNative(
        IERC20Upgradeable tokenA,
        IERC20Upgradeable tokenB,
        bool stable,
        uint256 lpAmount,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB) {

        IERC20Upgradeable lpToken = IERC20Upgradeable(factory.getPair(address(tokenA), address(tokenB), stable));
        lpToken.safeTransferFrom(_msgSender(), address(this), lpAmount);

        if(lpToken.allowance(address(this), address(router)) > lpAmount) {
            lpToken.safeApprove(address(router), type(uint256).max);
        }

        (amountA, amountB) = router.removeLiquidityETH(
            tokenA == nativeWrappedToken ? address(tokenB) : address(tokenA),
            stable,
            lpAmount,
            amountAMin,
            amountBMin,
            to,
            deadline
        );

        address token = nativeWrappedToken == tokenA ? address(tokenB) : address(tokenA);

        emit RemoveLiquidity(address(nativeWrappedToken), token, to, amountB, amountA);
    }

    function setRouter(IRouterVelodrome _router) external onlyOwner {
        router = _router;
    }

    function isTrustedForwarder(address forwarder) public view returns(bool) {
        return forwarder == trustedForwarder;
    }

    function setTrustedForwarder(address forwarder) public onlyOwner {
        trustedForwarder = forwarder;
    }

    function _msgSender() internal override view returns (address ret) {
        if (msg.data.length >= 24 && isTrustedForwarder(msg.sender)) {
            // At this point we know that the sender is a trusted forwarder,
            // so we trust that the last bytes of msg.data are the verified sender address.
            // extract sender address from the end of msg.data
            assembly {
                ret := shr(96,calldataload(sub(calldatasize(),20)))
            }
        } else {
            return msg.sender;
        }
    }

    function versionRecipient() external pure returns (string memory) {
        return "1";
    }

    function postUpgrade() external {
        nativeWrappedToken = IERC20Upgradeable(router.weth());
    }

    fallback() external payable {}
}
