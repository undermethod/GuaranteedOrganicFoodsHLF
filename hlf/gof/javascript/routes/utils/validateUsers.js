const fs = require('fs');
const path = require('path');
const { Wallets } = require('fabric-network'); //Creates a new gateway and use it to connect to the network
    
const ccpPath = path.resolve(__dirname, '..','..', '..','..', 'gof-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
let  validateUser = name_user => {
    return new Promise ( async (resolve , reject ) => {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(name_user);
        if (!identity) {
            console.log(`An identity for the user ${name_user} does not exist in the wallet`);
            resolve(false);
        }
        resolve(true)
    });
}
module.exports = {validateUser}
            
            
