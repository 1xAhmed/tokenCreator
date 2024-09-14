import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployContracts: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    console.log("Deploying ERC20Factory token contracts...");
    console.log("Deployer address:", deployer);

    const ercFactory = await deploy('ERC20Factory', {
        from: deployer,
        args: [],
        log: true,
    });

    console.log(`ERC20Factory deployed to: ${ercFactory.address}`);

};

export default deployContracts;