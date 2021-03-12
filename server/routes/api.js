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
const ccpPath = path.resolve(__dirname, '..','..','hlf', 'gof-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.resolve(__dirname, '..','..','hlf','gof','javascript','wallet');
/* GET listing. */
router.post('/harvest', async function(req, res, next) {
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
                //const box1 = await contract.submitTransaction('harvest', 'Producer', '20', 'Cali, Colombia', '1', Date.now());
                const result = await contract.submitTransaction('harvest', 'Producer', req.body.weight, req.body.location, req.body.producerID, Date.now())
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
                const result = await contract.submitTransaction('pack', 'Packager', req.body.boxId, req.body.location, req.body.packagerId, Date.now())
                console.log(`Transaction packaged has been evaluated, result is: ${result.toString()}`);
                //changeBoxState(ctx, boxId, newState)
                res.json(JSON.parse(result.toString()));  
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                res.json({error: 'Error user'});
            }   
        }    
    });    
});

router.post('/export', async function(req, res, next) {
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
                //exportInspect(ctx, role, boxId, exporterId, loc, inspectionAgentId, destinationCountry, passInspection, timestamp)
                console.log(`ctx, role, boxId, loc, packagerId, timestamp`)
                console.log(`'pack', 'Packaged', ${req.body.boxId}, ${req.body.exporterId}, ${req.body.loc} , ${req.body.inspectionAgentId}, 
                ${req.body.destinationCountry}, ${req.body.passInspection},`)
                const result = await contract.submitTransaction('exportInspect', 'Exporter', 
                    req.body.boxId, 
                    req.body.exporterId, 
                    req.body.loc, 
                    req.body.inspectionAgentId,
                    req.body.destinationCountry,
                    req.body.passInspection,
                    Date.now())
                console.log(`Transaction export has been evaluated, result is: ${result.toString()}`);
                //changeBoxState(ctx, boxId, newState)
                res.json(JSON.parse(result.toString()));  
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                res.json({error: 'Error user'});
            }   
        }    
    });    
});


router.post('/ship', async function(req, res, next) {
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
                // ship(ctx, role, boxId, shipperId, containerId, originCountry, destinationCountry, timestamp)
                console.log(`'ship', 'Shipper', ${req.body.boxId}, ${req.body.shipperId}, ${req.body.containerId} , ${req.body.originCountry}, 
                ${req.body.destinationCountry}`)
                const result = await contract.submitTransaction('ship', 'Shipper', 
                    req.body.boxId, 
                    req.body.shipperId, 
                    req.body.containerId, 
                    req.body.originCountry,
                    req.body.destinationCountry,
                    Date.now())
                console.log(`Transaction ship has been evaluated, result is: ${result.toString()}`);
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
