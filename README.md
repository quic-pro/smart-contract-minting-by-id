# Contract with minting by id

## Description

Smart contract with the possibility of minting a token by ID.

## Install Dependencies

```
npm i
```

## Template .env

```
PRIVKEY // string, required
ETHERSCANAPIKEY // string, optional
BSCSCANAPIKEY // string, optional
POLYGONSCANAPIKEY // string, optional
```

## Test contracts

```
npm run test
```

## Deploy contracts in testnet
Rinkeby - Ethereum testnet
```
npm run deploy:rinkeby
```

BSC testnet
```
npm run deploy:testnet
```

Mumbai - Polygon testnet
```
npm run deploy:mumbai
```

## Deploy contracts in mainnet
Ethereum mainnet
```
npm run deploy:eth
```

BSC mainnet
```
npm run deploy:bsc
```

Polygon mainnet
```
npm run deploy:polygon
```

## Verify contracts in testnet
rinkeby.etherscan.io
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network rinkeby
```

testnet.bscscan.com
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network testnet
```

mumbai.polygonscan.com
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network mumbai
```

## Verify contracts in mainnet
etherscan.io
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network eth
```

bscscan.com
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network bsc
```

polygonscan.com
```
npx truffle run verify MintingById@YOUR_ADDRESS_CONTRACT --network polygon
```
