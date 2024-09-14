// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Base.sol";
import "./ERC20Mintable.sol";
import "./ERC20BurnableMintable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Factory is Ownable {
    struct TokenInfo {
        string name;
        string ticker;
        uint256 totalSupply;
        bool mintable;
        bool burnable;
        address tokenAddress;
        address creator;
    }

    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string ticker,
        uint256 totalSupply,
        address indexed creator
    );

    constructor() Ownable(msg.sender) {}

    // Mapping to keep track of token names and tickers (symbols)
    mapping(string => bool) private nameExists;
    mapping(string => bool) private tickerExists;

    mapping(address => TokenInfo) public tokens;
    address[] public tokenList;

    modifier isUnique(string memory name, string memory ticker) {
        require(!nameExists[name], "Token name already exists");
        require(!tickerExists[ticker], "Token ticker already exists");
        _;
    }

    function createToken(
        string memory _name,
        string memory _ticker,
        uint256 _totalSupply,
        bool _mintable,
        bool _burnable,
        address _creator
    ) public onlyOwner isUnique(_name, _ticker) returns (address) {
        address tokenAddress;

        if (_mintable && _burnable) {
            ERC20BurnableMintable token = new ERC20BurnableMintable(_name, _ticker, _totalSupply, _creator);
            tokenAddress = address(token);
        } else if (_mintable) {
            ERC20Mintable token = new ERC20Mintable(_name, _ticker, _totalSupply, _creator);
            tokenAddress = address(token);
        } else {
            ERC20Base token = new ERC20Base(_name, _ticker, _totalSupply, _creator);
            tokenAddress = address(token);
        }

        TokenInfo memory newToken = TokenInfo({
            name: _name,
            ticker: _ticker,
            totalSupply: _totalSupply,
            mintable: _mintable,
            burnable: _burnable,
            tokenAddress: tokenAddress,
            creator: _creator
        });

        tokens[tokenAddress] = newToken;
        tokenList.push(tokenAddress);

        // Mark the token name and ticker as used
        nameExists[_name] = true;
        tickerExists[_ticker] = true;

        emit TokenCreated(tokenAddress, _name, _ticker, _totalSupply, _creator);

        return tokenAddress;
    }

    function getTokens() public view returns (address[] memory) {
        return tokenList;
    }

    function getTokenInfo(address _tokenAddress) public view returns (TokenInfo memory) {
        return tokens[_tokenAddress];
    }
}