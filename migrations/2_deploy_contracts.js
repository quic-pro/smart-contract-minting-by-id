const Contract = artifacts.require('./MintingById');


module.exports = function (deployer) {
    deployer.then(async () => {
        await deployer.deploy(Contract, 'name', 'SYMBOL');
    });
};
