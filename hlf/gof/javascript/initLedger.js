/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'gof-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the users.
        const identityPro = await wallet.get('producer');
        const identityPac = await wallet.get('packager');
        const identityExp = await wallet.get('exporter');
        const identityShi = await wallet.get('shipper');
        const identityImp = await wallet.get('importer');
        const identityDis = await wallet.get('distributor');
        const identityRet = await wallet.get('retailer');
        const identityCon = await wallet.get('consumer');
        if (!identityPro || !identityPac || !identityExp || !identityShi || !identityImp || !identityDis || !identityRet || !identityCon) {
            console.log('An identity for one of the user roles does not exist in the wallet');
            console.log('Run the registerUsersGOF.js application before retrying');
            return;
        }

        const invokeUser = 'producer';

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: invokeUser, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('gofchannel');

        // Get the contract from the network.
        const contract = network.getContract('gof');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction('initLedger');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
