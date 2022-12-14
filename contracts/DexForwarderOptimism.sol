pragma solidity 0.8.13;

import "./interfaces/IRouterVelodrome.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./interfaces/IFactoryVelodrome.sol";

contract DexForwarderOptimism is Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IRouterVelodrome public router;
    address public trustedForwarder;
    IFactory public factory;

    function initialize(IRouterVelodrome _router, address _trustedForwarder) external initializer {
        __Ownable_init();
        router = _router;
        trustedForwarder = _trustedForwarder;
        factory = IFactory(_router.factory());
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
        uint256 excessA = amountADesired - amountA; // tokenA.balanceOf(address(this));
        if(excessA > 0) {
            tokenA.safeTransfer(_msgSender(), excessA);
        }

        uint256 excessB = amountBDesired - amountB; //tokenB.balanceOf(address(this));
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
        factory = IFactory(router.factory());
    }
}
