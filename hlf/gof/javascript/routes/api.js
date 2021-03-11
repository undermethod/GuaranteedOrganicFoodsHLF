/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors')
const fs = require('fs');
const path = require('path');
const {validateUser} = require('./utils/validateUsers')
const { Wallets, Gateway } = require('fabric-network'); //Creates a new gateway and use it to connect to the network
const { response } = require('express');
const ccpPath = path.resolve(__dirname, '..', '..','..', 'gof-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(process.cwd(), 'wallet');
/* GET listing. */
router.post('/harvest', async function(req, res, next) {
    let d = new Date();
    let timestamp = d.getTime();
    validateUser(req.body.username).then( async isvalid => {
        if(!isvalid){
            res.json({error: 'Invalid user'});
        }else{
            try {
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: req.body.username, discovery: { enabled: true, asLocalhost: true } });

                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('gofchannel');

                // Get the contract from the network.
                const contract = network.getContract('gof');
                //harvest(ctx, role, weight, loc, producerId,timestamp)
                const result = await contract.evaluateTransaction('harvest', 'Producer', req.body.weight, req.body.location, req.body.producerID, timestamp)
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                //changeBoxState(ctx, boxId, newState)
                res.json(JSON.parse(result.toString()));  
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                res.json({error: 'Error user'});
            }   
        }    
    });    
});
router.post('/packaged', async function(req, res, next) {
    let d = new Date();
    let timestamp = d.getTime();
    validateUser(req.body.username).then( async isvalid => {
        if(!isvalid){
            res.json({error: 'Invalid user'});
        }else{
            try {
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: req.body.username, discovery: { enabled: true, asLocalhost: true } });

                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('gofchannel');

                // Get the contract from the network.
                const contract = network.getContract('gof');
                //harvest(ctx, role, weight, loc, producerId,timestamp)
                const result = await contract.evaluateTransaction('pack', req.body.username, req.body.weight, req.body.location, req.body.producerID, timestamp)
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                //changeBoxState(ctx, boxId, newState)
                res.json(JSON.parse(result.toString()));  
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                res.json({error: 'Error user'});
            }   
        }    
    });    
});
router.post('/querybox', async function(req, res, next) {
    let d = new Date();
    let timestamp = d.getTime();
    validateUser(req.body.username).then( async isvalid => {
        if(!isvalid){
            res.json({error: 'Invalid user'});
        }else{
            try {
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: req.body.username, discovery: { enabled: true, asLocalhost: true } });
                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('gofchannel');
                // Get the contract from the network.
                const contract = network.getContract('gof');
                //harvest(ctx, role, weight, loc, producerId,timestamp)
                const result = await contract.evaluateTransaction('queryAllBoxes')
                debugger
                console.log(`Query box, result is: ${result.toString()}`);
                //changeBoxState(ctx, boxId, newState)
                res.json(JSON.parse(result.toString()));  
            } catch (error) {
                console.error(`Failed to query box: ${error}`);
                res.json({error: 'Query box'});
            }   
        }    
    });    
});
module.exports = router;
