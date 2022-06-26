const {ether} = require('@openzeppelin/test-helpers');


const Contract = artifacts.require('MintingById');

const name = 'name';
const symbol = 'SYMBOL';
const _numberTokens = 16;
const _price = 1;


contract('MintingById', accounts => {
    const owner = accounts[0];
    const recipient = accounts[1];
    let contract;

    beforeEach(async () => {
        contract = await Contract.new(name, symbol, {from: owner});
    });


    it('has correct data', async () => {
        const actualName = await contract.name();
        assert.equal(actualName, name);

        const actualSymbol = await contract.symbol();
        assert.equal(actualSymbol, symbol);

        const actualNumberTokens = await contract._numberTokens();
        assert.equal(actualNumberTokens, _numberTokens);

        const actualPrice = await contract._price();
        assert.equal(actualPrice, web3.utils.toWei(_price.toString()));
    });

    it('does not mint if an invalid id is specified', async () => {
        const ID = _numberTokens;

        try {
            await contract.mint(ID, {
                from: recipient,
                value: ether(_price.toString())
            });
            assert.fail('The transaction should have thrown an error.');
        } catch (error) {
            assert.include(
                error.message,
                'Invalid ID!',
                'The error message should contain "Invalid ID!"'
            );
        }
    });

    it('mints if an invalid id is specified', async () => {
        const ID = 0;

        await contract.mint(ID, {
            from: recipient,
            value: ether(_price.toString())
        });

        const actualNumberMintedTokens = await contract._numberMintedTokens();
        assert.equal(actualNumberMintedTokens, 1);

        const actualMintedTokens = await contract._mintedTokens(ID);
        assert.equal(actualMintedTokens, true);
    });

    it('does not mint if paid less than the cost', async () => {
        const ID = 0;

        try {
            await contract.mint(ID, {
                from: recipient,
                value: ether((_price / 2).toString())
            });
            assert.fail('The transaction should have thrown an error.');
        } catch (error) {
            assert.include(
                error.message,
                'Value sent is not correct!',
                'The error message should contain "Value sent is not correct!"'
            );
        }
    });

    it('mints if paid more than value', async () => {
        const ID = 0;

        await contract.mint(ID, {
            from: recipient,
            value: ether((_price * 2).toString())
        });

        const actualNumberMintedTokens = await contract._numberMintedTokens();
        assert.equal(actualNumberMintedTokens, 1);

        const actualMintedTokens = await contract._mintedTokens(ID);
        assert.equal(actualMintedTokens, true);
    });

    it('does not mint a token multiple times', async () => {
        const ID = 0;

        await contract.mint(ID, {
            from: recipient,
            value: ether(_price.toString())
        });

        const actualNumberMintedTokens = await contract._numberMintedTokens();
        assert.equal(actualNumberMintedTokens, 1);

        try {
            await contract.mint(ID, {
                from: recipient,
                value: ether(_price.toString())
            });
            assert.fail('The transaction should have thrown an error.');
        } catch (error) {
            assert.include(
                error.message,
                'Specified token has already been minted!',
                'The error message should contain "Specified token has already been minted!"'
            );
        }
    });

    it('allows to withdraw funds only to the owner', async () => {
        const ID = 0;

        await contract.mint(ID, {
            from: recipient,
            value: ether((_price).toString())
        });

        try {
            await contract.withdraw({
                from: recipient
            });
        } catch (error) {
            assert.include(
                error.message,
                'caller is not the owner',
                'The error message should contain "caller is not the owner"'
            );
        }

        await contract.withdraw({
            from: owner
        });
    });
});
