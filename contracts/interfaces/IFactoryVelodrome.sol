pragma solidity >=0.5.0;

interface IFactory {
    function getPair(address tokenA, address tokenB, bool stable) external view returns (address pair);
}