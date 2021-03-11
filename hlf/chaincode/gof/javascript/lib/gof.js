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

class Gof extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        initialState = states.READYPICKUP;
        id = 1;
        console.info('============= END : Initialize Ledger ===========');
    }

    async harvest(ctx, role, weight, loc, producerId, timestamp) {
        console.info('============= START : Create Harvest Record ===========');

        if (role == roles.PRODUCER && initialState == states.READYPICKUP) {

            const box = [{
                boxId: id.toString(),
                state: states.HARVEST,
                harvest: [{
                    weight,
                    loc,
                    timestamp,
                    producerId
                }],
                pack: [{
                    loc: "",
                    packagerId: "",
                    timestamp: ""
                }],
                exp: [{
                    loc: "",
                    exporterId: "",
                    inspectionAgentId: "",
                    destinationCountry: "",
                    passInspection: false,
                    timestamp: ""
                }],
                ship: [{
                    shipperId: "",
                    containerId: "",
                    originCountry: "",
                    destinationCountry: "",
                    timestamp: ""
                }],
                import_: [{
                    loc: "",
                    importerId: "",
                    inspectionAgentId: "",
                    originCountry: "",
                    passInspection: "",
                    timestamp: ""
                }],
                distribute: [{
                    loc: "",
                    distributorId: "",
                    destinationRetailerId: "",
                    timestamp: ""
                }],
                stock: [{
                    loc: "",
                    retailerId: "",
                    shelfId: "",
                    timestamp: ""
                }],
                sell: [{
                    retailerId: "",
                    timestamp: ""
                }],
                composte: [{
                    role: "",
                    timestamp: ""
                }],
                sellDomestically: [{
                    exporterId: "",
                    timestamp: ""
                }]

            }];
            id++;

            const val = await new Promise(async (resolve, reject) => {
                ctx.stub.putState(box[0].boxId, Buffer.from(JSON.stringify(box)))
                resolve('success');
                console.info('============= END : Create Harvest Record  ===========');
            });

            return box[0].boxId;
        }

        else {
            return -1;
        }

    }

    async queryBoxState(ctx, boxId) {
        const box = await ctx.stub.getState(boxId)
        if (!box || box.lenght == 0) {
            throw new Error(Box - `${boxId} does not exist`);
        }
        return box; // get the digital financial bond from chaincode state
    }

    async pack(ctx, role, boxId, loc, packagerId, timestamp) {
        console.info('============= START : Create Package Transaction===========');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.PACKAGER && box[0].state == states.HARVEST) {

            box[0].pack[0].loc = loc;
            box[0].pack[0].packagerId = packagerId;
            box[0].pack[0].timestamp = timestamp;
            box[0].state = states.PACKAGED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Package Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
    }

    async exportInspect(ctx, role, boxId, exporterId, loc, inspectionAgentId, destinationCountry, passInspection, timestamp) {
        console.info('======= START : Create Exportation Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.EXPORTER && box[0].state == states.PACKAGED && passInspection) {

            box[0].exp[0].loc = loc;
            box[0].exp[0].exporterId = exporterId;
            box[0].exp[0].inspectionAgentId = inspectionAgentId;
            box[0].exp[0].destinationCountry = destinationCountry;
            box[0].exp[0].passInspection = passInspection;
            box[0].exp[0].timestamp = timestamp;
            box[0].state = states.EXPORTED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Exportation  Transaction  ===========');

            return true;
        }
        else {
            return false;
        }
    }

    async ship(ctx, role, boxId, shipperId, containerId, originCountry, destinationCountry, timestamp) {
        console.info('======= START : Create Ship Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.SHIPPER && box[0].state == states.EXPORTED) {

            box[0].ship[0].shipperId = shipperId;
            box[0].ship[0].containerId = containerId;
            box[0].ship[0].originCountry = originCountry;
            box[0].ship[0].destinationCountry = destinationCountry;
            box[0].ship[0].timestamp = timestamp;
            box[0].state = states.SHIPPED,

                await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Ship  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }

    }

    async importInspect(ctx, role, boxId, importerId, loc, inspectionAgentId, originCountry, passInspection, timestamp) {
        console.info('======= START : Create Importation Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.IMPORTER && box[0].state == states.SHIPPED && passInspection) {

            box[0].import_[0].loc = loc;
            box[0].import_[0].importerId = importerId;
            box[0].import_[0].inspectionAgentId = inspectionAgentId;
            box[0].import_[0].originCountry = originCountry;
            box[0].import_[0].passInspection = passInspection;
            box[0].import_[0].timestamp = timestamp;
            box[0].state = states.IMPORTED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));

            console.info('============= END : Create Importation  Transaction  ===========');

            return true;
        }
        else {
            return false;
        }
    }

    async distribute(ctx, role, boxId, distributorId, loc, destinationRetailerId, timestamp) {
        console.info('======= START : Create Distribution Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.DISTRIBUTOR && box[0].state == states.IMPORTED) {

            box[0].distribute[0].loc = loc;
            box[0].distribute[0].distributorId = distributorId;
            box[0].distribute[0].destinationRetailerId = destinationRetailerId;
            box[0].distribute[0].timestamp = timestamp;
            box[0].state = states.DISTRIBUTED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Distribution  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
    }

    async stock(ctx, role, boxId, retailerId, loc, shelfId, timestamp) {
        console.info('======= START : Create Stock Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.RETAILER && box[0].state == states.DISTRIBUTED) {

            box[0].stock[0].loc = loc;
            box[0].stock[0].retailerId = retailerId;
            box[0].stock[0].shelfId = shelfId;
            box[0].stock[0].timestamp = timestamp;
            box[0].state = states.STOCKED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Stock  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
    }

    async sell(ctx, role, retailerId, boxId, timestamp) {
        console.info('======= START : Create Sell  Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.RETAILER && box[0].state == states.STOCKED) {

            box[0].sell[0].retailerId = retailerId;
            box[0].sell[0].timestamp = timestamp;
            box[0].state = states.SOLD;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Sell  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
    }

    async composte(ctx, role, boxId, timestamp) {
        console.info('======= START : Create Composte  Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.SHIPPER || role == roles.IMPORTER || role == roles.DISTRIBUTOR || role == roles.RETAILER) {// && boxQuery  == states.HARVEST){

            box[0].composte[0].role = role;
            box[0].composte[0].timestamp = timestamp;
            box[0].state = states.COMPOSTED;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Composte  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
    }

    async sellDomestically(ctx, role, exporterId, boxId, timestamp) {
        console.info('======= START : Create Sell Domestically  Transaction');
        var boxQuery = await this.queryBoxState(ctx, boxId);
        const box = JSON.parse(boxQuery.toString());

        if (role == roles.EXPORTER && box[0].state == states.PACKAGED) {

            box[0].sellDomestically[0].exporterId = exporterId;
            box[0].sellDomestically[0].timestamp = timestamp;
            box[0].state = states.SOLDDOMESTICALLY;

            await ctx.stub.putState(boxId, Buffer.from(JSON.stringify(box)));
            console.info('============= END : Create Sell Domestically  Transaction  ===========');

            return boxId;
        }
        else {
            return -1;
        }
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
        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
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

}

module.exports = Gof;


