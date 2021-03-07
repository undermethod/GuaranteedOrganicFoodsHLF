/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 *   
 */

'use strict';

const { Contract } = require('fabric-contract-api');

const states = {
    READYPICKUP: "Ready Pickup",
    HARVEST: "Harvest",
    PACKAGED: "Packaged",
    EXPORTED: "Exported",
    SHIPPED: "Shipped",
    IMPORTED: "Imported",
    DISTRIBUTED: "Distributed",
    STOCKED: "Stocked",
    SOLD: "Sold",
    COMPOSTED: "Composted",
    SOLDDOMESTICALLY: "Sold Domestically",

}

const roles = {
    PRODUCER: "Producer",
    PACKAGER: "Packager",
    EXPORTER: "Exporter",
    SHIPPER: "Shipper",
    IMPORTER: "Importer",
    DISTRIBUTOR: "Distributor",
    RETAILER: "Retailer",
}

var initialState;
var id;
var gofNumber;

class GOF extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        initialState = states.READYPICKUP;
        id = 1;
        gofNumber = "";
        console.info('============= END : Initialize Ledger ===========');
    }

    async createBox(ctx, weight, timestamp){
	console.info('======= START : Create a box ========');
	const box = {
	      boxId: id.toString(),
              weight,
	      timestamp,
              state: states.READYPICKUP,	
	};
	console.info('========= increase id ============');
	id++;
	console.info('========= befor to register =========');
        await ctx.stub.putState(box.boxId, Buffer.from(JSON.stringify(box)));
	console.info('====== END : Create a box =========');
	return box.boxId;	
    }

    async harvest(ctx, role, weight, loc, producerId,timestamp) {
        console.info('============= START : Create Harvest Record ===========');
	
        if(role == roles.PRODUCER && initialState == states.READYPICKUP){
            const boxId = await this.createBox(ctx, weight, timestamp);
	    const harvest = {
                boxId,
                loc,
                timestamp,
		producerId,
		state: states.HARVEST,
            };
            gofNumber = "HAV-"+ boxId;
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(harvest)));
            console.info('============= END : Create Harvest Record  ===========');
	    //await this.queryAllBoxes(ctx);
	    //await this.changeBoxState(ctx, boxId, states.HARVEST);
              
            return boxId;
        }
        else{
            return -1;
        }
        
    }

    async pack(ctx, role, boxId, loc, packagerId, timestamp) {
        console.info('============= START : Create Package Transaction===========');
        var boxQuery = await this.queryBoxState(ctx,boxId);
        console.info('===== box query: '+String(boxQuery));        	
        if(role == roles.PACKAGER && boxQuery  == states.HARVEST){
            gofNumber = "PAC-"+ boxId;

            const pack = {
		boxId,
                loc,
                timestamp,
                packagerId,               
                state: states.PACKAGED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(pack)));
            console.info('============= END : Create Package Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Packaged =======');
	    //await this.changeBoxState(ctx, boxId, states.PACKAGED);
            //console.info('=========== END : Change state of the box to Packaged ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }

    } 

   async exportInspect(ctx, role, boxId, exporterId,  loc, inspectionAgentId, destinationCountry, passInspection, timestamp){
   	console.info('======= START : Create Exportation Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.EXPORTER && boxQuery  == states.PACKAGED && passInspection){
            gofNumber = "EXP-"+ boxId;

            const exp = {
		boxId,
                loc,
                timestamp,
                exporterId,
		inspectionAgentId,
		destinationCountry,
		passInspection,               
                state: states.EXPORTED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(exp)));
            console.info('============= END : Create Exportation  Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Exported =======');
	    //await this.changeBoxState(ctx, boxId, states.EXPORTED);
            //console.info('=========== END : Change state of the box to Exported  ======');
 
            return gofNumber;
        }
        else{
            return false;
        }						
   } 

   async ship(ctx, role, boxId, shipperId, containerId, originCountry, destinationCountry, timestamp){
   	console.info('======= START : Create Ship Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.SHIPPER && boxQuery  == states.EXPORTED){
            gofNumber = "SHI-"+ boxId;

            const ship = {
		boxId,
                timestamp,
                shipperId,
		containerId,
		originCountry,
		destinationCountry,	      
                state: states.SHIPPED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(ship)));
            console.info('============= END : Create Ship  Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Shipped  =======');
	    //await this.changeBoxState(ctx, boxId, states.SHIPPED);
            //console.info('=========== END : Change state of the box to Shipped ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }
						
   } 

    async importInspect(ctx, role, boxId, importerId,  loc, inspectionAgentId, originCountry, passInspection, timestamp){
   	console.info('======= START : Create Importation Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.IMPORTER && boxQuery  == states.SHIPPED && passInspection){
            gofNumber = "IMP-"+ boxId;

            const imp = {
		boxId,
                loc,
                timestamp,
                importerId,
		inspectionAgentId,
		originCountry,
		passInspection,               
                state: states.IMPORTED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(imp)));
            console.info('============= END : Create Importation  Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Imported =======');
	    //await this.changeBoxState(ctx, boxId, states.IMPORTED);
            //console.info('=========== END : Change state of the box to Imported  ======');
 
            return gofNumber;
        }
        else{
            return false;
        }						
   } 

    async distribute(ctx, role, boxId, distributorId,  loc, destinationRetailerId, timestamp){
   	console.info('======= START : Create Distribution Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.DISTRIBUTOR && boxQuery  == states.IMPORTED){
            gofNumber = "DIS-"+ boxId;

            const dis = {
		boxId,
                loc,
                timestamp,
                distributorId,
		destinationRetailerId,          
                state: states.DISTRIBUTED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(dis)));
            console.info('============= END : Create Distribution  Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Distributed =======');
	    //await this.changeBoxState(ctx, boxId, states.DISTRIBUTED);
            //console.info('=========== END : Change state of the box to Distributed  ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }						
   }

    async stock(ctx, role, boxId, retailerId, loc, shelfId, timestamp){
   	console.info('======= START : Create Stock Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.RETAILER && boxQuery  == states.DISTRIBUTED){
            gofNumber = "STO-"+ boxId;

            const sto = {
		boxId,
		retailerId,
                loc,
                timestamp,
                shelfId,		      
                state: states.STOCKED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(sto)));
            console.info('============= END : Create Stock  Transaction  ===========');
            
	    //console.info('============ START :  Change state of the box to Stock =======');
	    //await this.changeBoxState(ctx, boxId, states.STOCKED);
            //console.info('=========== END : Change state of the box to Stock  ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }						
   }

    async sell(ctx, role, retailerId, boxId, timestamp){
   	console.info('======= START : Create Sell  Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.RETAILER && boxQuery  == states.STOCKED){
            gofNumber = "SEL-"+ boxId;

            const sel = {
		timestamp,
                retailerId,		    
                state: states.SOLD,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(sel)));
            console.info('============= END : Create Sell  Transaction  ===========');    

	    //console.info('============ START :  Change state of the box to sold =======');
	    //await this.changeBoxState(ctx, boxId, states.SOLD);
            //console.info('=========== END : Change state of the box to Composte  ======');
  
            return gofNumber;
        }
        else{
            return -1;
        }						
   }

  async composte(ctx, role, userId, boxId, timestamp){
   	console.info('======= START : Create Composte  Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.SHIPPER || role==roles.IMPORTER || role== roles.DISTRIBUTOR || role== roles.RETAILER ){// && boxQuery  == states.HARVEST){
            gofNumber = "COM-"+ boxId;

            const com = {
		timestamp,
                userId,
		boxId,		    
                state: states.COMPOSTED,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(com)));
            console.info('============= END : Create Composte  Transaction  ===========');    
	    
	    //console.info('============ START :  Change state of the box to Composte =======');
	    //await this.changeBoxState(ctx, boxId, states.COMPOSTED);
            //console.info('=========== END : Change state of the box to Composte  ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }						
   }

  async sellDomestically(ctx, role, exporterId, boxId, timestamp){
   	console.info('======= START : Create Sell Domestically  Transaction');
	var boxQuery = await this.queryBoxState(ctx,boxId);
                	
        if(role == roles.EXPORTER && boxQuery  == states.PACKAGED){
            gofNumber = "SED-"+ boxId;

            const sed = {
		timestamp,
                exporterId,
		boxId,		    
                state: states.SOLDDOMESTICALLY,
	    };
            	    
            await ctx.stub.putState(gofNumber, Buffer.from(JSON.stringify(sed)));
            console.info('============= END : Create Sell Domestically  Transaction  ===========');    
	    
	    //console.info('============ START :  Change state of the box to Sell domestically =======');
	    //await this.changeBoxState(ctx, boxId, states.SOLDDOMESTICALLY);
            //console.info('=========== END : Change state of the box to Sell Domestically  ======');
 
            return gofNumber;
        }
        else{
            return -1;
        }						
   }

	async queryBoxState(ctx, boxId) {
        const box = await ctx.stub.getState(boxId)
        if(!box || box.lenght == 0){
            throw new Error (`${boxId} does not exist`);
        }
        console.info('======= box object: '+ String(JSON.parse(box).state) + ' =========');
        return String(JSON.parse(box).state); // get the digital financial bond from chaincode state
   }
	
   async queryBox(ctx, boxId) {
        const dfbAsBytes = await ctx.stub.getState(boxId); // get the digital financial bond from chaincode state
        if (!dfbAsBytes || dfbAsBytes.length === 0) {
            throw new Error(`${boxId} does not exist`);
        }
        console.log(dfbAsBytes.toString());
        return dfbAsBytes.toString();
    }

    async queryAllBoxes(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeBoxState(ctx, boxId, newState) {
        console.info('============= START : changeBoxState ===========');
        console.info('==== boxIdChangeState:'+ boxId);	
	console.info('===== data type variable: '+ typeof boxId);
        const box = await ctx.stub.getState(boxId); // get the box from chaincode state
	console.info('===== box: '+ box.toString());
        if (!box || box.length === 0) {
            throw new Error(`Box ${boxId} does not exist`);
        }
        const queryBox = JSON.parse(box.toString());
        queryBox.state = newState;

        await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(queryBox)));
        console.info('============= END : changeBoxState ===========');
    }

}

module.exports = GOF;


