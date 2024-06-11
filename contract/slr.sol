// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Registry {
    struct Order {
        address seller;
        address owner;
        uint256 orderId;
        uint256 sellPrice;
        bool isBuy;
        bool isSale;
        bool isOption;
        uint256 optionFee;
        uint256 optionDuration;
        bool fulfilled;
        uint256 noOfSLRTokens;
        uint256 createdAt;
    }
    
   

    string[] verifiedSensors = [
        "b8715fb98feb70c3f3f1b01174577bbdbf7fe32892846aaad96776fb58270216",
        "2105742f5adb229dd4be3898314fdd0f0dd35efbf0a5724cc7d5a17eee9afd1f"
    ];

    Order[] public orderArray;
 

    uint256 public LatestTimestamp;
    uint256 public credsMarketPrice = 10;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public recBalances;
    mapping(string => address) public   genStationToAddress;
    mapping(address => string[]) public addressToEligiblePromotions;
    mapping(address => bool)public isBrand;
    mapping(address => string)public addressToPromotionSecret;

    event optionCreated(
        address indexed lessor,
        uint256 optionId,
        uint256 noOfSLRTokens,
        uint256 collateral
    );
    event optionTaken(address indexed lessee, uint256 optionId);
    event optionEnded(
        address indexed lessee,
        uint256 optionId,
        uint256 refundAmount,
        uint256 extraAmount
    );

    function addPromotionSecret(string memory _promotionSecret)public{
        addressToPromotionSecret[msg.sender]=_promotionSecret;
    }
    function registerAsBrand()public{
        isBrand[msg.sender]=true;
    }

    function addEligiblePromotions(address _seller,string memory _promotionSecret)public{
        addressToEligiblePromotions[_seller].push(_promotionSecret);
    }
   function getAllEligiblePromotions(address _seller) public view returns (string[] memory) {
        return addressToEligiblePromotions[_seller];
    }

    function addGenStation(string memory _code) public {
        genStationToAddress[_code] = msg.sender;
    }

    function returnOrdersArrayLength() public view returns (uint256) {
        uint256 arrLength;
        arrLength = orderArray.length;
        return (arrLength);
    }

    function updateSLRTokenBalance(string memory _code, uint256 _newValue)
        public
    {
        //require(checkVerifiedSensors(_code));

        updateTime();
        checkExpiredOptions();

        // additional cheks to be implemented
        balances[genStationToAddress[_code]] = _newValue;
    }

    function returnSLRBalance() public view returns (uint256) {
        return (balances[msg.sender]);
    }

    function createBuyOrder(uint256 _orderId) public payable {
        // to update time in cintract and end options
        updateTime();
        checkExpiredOptions();
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.sellPrice, "Insufficient value sent");
        require(!order.fulfilled, "Order already fulfilled");

        order.owner = msg.sender;
        order.fulfilled = true;
        order.optionDuration = 0;
        balances[msg.sender] += order.noOfSLRTokens;
        payable(order.seller).transfer(msg.value);
        credsMarketPrice = order.sellPrice / order.noOfSLRTokens;
    }
    function consumeToken(uint256 _orderId) public payable {
        // to update time in cintract and end options
        updateTime();
        checkExpiredOptions();
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.sellPrice, "Insufficient value sent");
        require(!order.fulfilled, "Order already fulfilled");
        require(isBrand[msg.sender]);

        order.owner = msg.sender;
        order.fulfilled = true;
        order.optionDuration = 0;
        recBalances[msg.sender] += order.noOfSLRTokens;
        addEligiblePromotions(order.seller,addressToPromotionSecret[msg.sender]);
        payable(order.seller).transfer(msg.value); 
       credsMarketPrice = order.sellPrice / order.noOfSLRTokens;
    }

    function listOrder(
        uint256 _sellPrice,
        uint256 _noOfSLRTokens,
        uint256 _optionPrice,
        uint256 _duration
    ) public {
        // to update time in cintract and end options
        updateTime();
        checkExpiredOptions();

        require(balances[msg.sender] >= _noOfSLRTokens, "Insufficient SLRTokens");
        //require(usdtToken.transferFrom(msg.sender, address(this), _collateral), "Collateral transfer failed");

        orderArray.push(
            Order({
                seller: msg.sender,
                owner: msg.sender,
                orderId: orderArray.length,
                sellPrice: _sellPrice,
                isBuy: false,
                isSale: true,
                isOption: true,
                optionFee: _optionPrice,
                optionDuration: _duration,
                fulfilled: false,
                noOfSLRTokens: _noOfSLRTokens,
                createdAt: block.timestamp
            })
        );
        balances[msg.sender] -= _noOfSLRTokens;
        // emit optionCreated(msg.sender, optionId, _noOfSLRTokens, _collateral);
    }

    function takeOnOption(uint256 _orderId) public payable {
        // to update time and end options
        updateTime();
        checkExpiredOptions();
        Order storage order = orderArray[_orderId];
        require(msg.value >= order.optionFee, "Insufficient value sent");
        require(!order.fulfilled, "option already fulfilled");

        order.owner = msg.sender;
        order.fulfilled = true;
        order.createdAt = block.timestamp;
        balances[msg.sender] += order.noOfSLRTokens;
        payable(order.seller).transfer(msg.value);
    }

    function redeemTokens(uint256 _value,address _user)public onlyAdmin{
        // to be called bu authorities that offer some compensation for the amount of tokens redeemed
        checkExpiredOptions();
        balances[_user] = balances[_user]-_value;
    }

    function endOption(uint256 _orderId) public payable onlyAdmin {
        Order storage order = orderArray[_orderId];
        balances[order.owner] -= order.noOfSLRTokens;
        order.fulfilled = false;
        order.owner = order.seller;
    }

    modifier onlyAdmin() {
        // checks for approved users currently kept empty to simplify testing
        _;
    }

    function updateTime() public {
        LatestTimestamp = block.timestamp;
    }

    function checkExpiredOptions() public {
        updateTime();
        for (uint256 index = 0; index < orderArray.length; index++) {
            if (orderArray[index].optionDuration > 0) {
                if (
                    orderArray[index].createdAt +
                        orderArray[index].optionDuration <
                    LatestTimestamp
                ) {
                    endOption(index);
                }
            }
        }
    }

    bool public isVerified;

    function checkVerifiedSensors(string memory _code) public returns (bool) {
        for (uint256 index = 0; index < verifiedSensors.length; index++) {
            if (
                keccak256(abi.encodePacked(verifiedSensors[index])) ==
                keccak256(abi.encodePacked(_code))
            ) {
                isVerified = true;
                return true;
            }
        }
        return false;
    }
}