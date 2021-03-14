# BCDV1012 - dApp I - Group Assignment
## Hyperledger Fabric - Guaranteed Organic Foods

### Installation Instructions
1. Navigate to "/hlf/gof/"
1. Execute "./gof-hlf-launcher.sh" to run the Hyperledger Fabric network
1. Navigate to "/server/"
1. Execute "rm -rf node_modules package-lock.json ; npm i ; node app" to run the Express server
1. Navigate to "/gui/"
1. Execute "rm -rf node_modules package-lock.json ; npm i ; npm start" to run the React front-end

### Project Description
Supply Chain use case for Hyperledger Fabric for building a dApp: Guaranteed Organic Foods (GOF) traces the exportation of avocados from Colombia to Canada, from the farmer to the consumer.

### Benefits
This solution supports the supply chain of avocados reducing the following risks:
- Difficult to differentiate good players from bad
- Many Organic Producers find their product mixed in with normal avocados
- Farms often use non environmentally friendly techniques
- Drug Cartels sometimes use avocados as a form of money laundering 
- Being able to differentiate the good from the bad can be a selling point
- Can eventually catch ineddiciencies and improve on shipping speed  

### Requirements
- Track and trace avocados _from farm to table_
- Allow various business actors to have access for transparency and traceability
- Immutable ledger tracing goods
- Keep records for the Purchase Order (in our case Box ID), box weight, timestamps, historical statuses and current status

### State Machine Diagram
High-level states and transitions (detailed breakdown found below under _State Data_ and _Transition Descriptions_ respectively):\
![GOF state diagram](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20state%20diagram.png?raw=true)

### Role Descriptions
- Producer: farmer
- Packager: wrapping for preserving
- Exporter: inspect for exportation
- Shipper: transport from origin country to destination country
- Importer: inspect for importation
- Distributor: transport from destination country border to retailer
- Retailer: stock shelves with the box for sale to consumers
- Consumer: purchaser of the individual avocados within the box

### Transition Descriptions
The transitions of the state machine are represented by these functions of the smart contract:
- initLedger: initialising "initialState" to be "READYPICKUP", and initial "id" to be "1"
- harvest: performed by Role "PRODUCER", moves from "READYPICKUP" to "HARVEST"
- pack: performed by Role "PACKAGER", moves from "HARVEST" to "PACKAGED"
- exportInspect: performed by Role "EXPORTER", moves from "PACKAGED" to "EXPORTED"
- ship: performed by Role "SHIPPER", moves from "EXPORTED" to "SHIPPED"
- importInspect: performed by Role "IMPORTER", moves from "SHIPPED" to "IMPORTED"
- distribute: performed by "DISTRIBUTOR", moves from "IMPORTED" to "DISTRIBUTED"
- stock: performed by "RETAILER", moves from "DISTRIBUTED" to "STOCKED"
- sell: performed by "RETAILER", moves from "STOCKED" to "SOLD"
- composte: performed by "SHIPPER" or "IMPORTER" or "DISTRIBUTOR" or "RETAILER", moves to "COMPOSTED"
- sellDomestically: performed by "EXPORTER", moves from "PACKAGED" to "SOLDDOMESTICALLY"
- queryBoxState: returns a string of the 'state' of a box (see _states_ in _State Data_ below)
- queryBox: returns JSON string of a box
- queryAllBoxes: returns JSON string of all boxes

### Flow Chart Diagram
High-level system flow during operation:\
![GOF flow chart](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20flow%20chart%20model.png?raw=true)

### Architecture
The architecture of GOF application contains 3 layers as the following picture shows. The first layer includes the components related to Hyperledger Fabric to support the blockchain functionalities and chaincode. The second layer comprehends the server components that support the communication between the web application and the ledger considering the JWT and the API. Finally, the third layer contains the components of the web application to allow the different users the use of the GOF system:\
![GOF architecture](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20architecture.jpg?raw=true)

### Chaincode Diagram
The users are the Roles from above that interact with the chaincode after packaging, installing, approving and committing:\
![GOF Chaincode](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/Chaincde%20diagram.jpg?raw=true)

### State Data
```javascript
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
  SOLDDOMESTICALLY: "Sold Domestically"
}
const roles = {
  PRODUCER: "Producer",
  PACKAGER: "Packager",
  EXPORTER: "Exporter",
  SHIPPER: "Shipper",
  IMPORTER: "Importer",
  DISTRIBUTOR: "Distributor",
  RETAILER: "Retailer"
}
const box = [{
  boxId: "",
  state: "",
  harvest: [{
    weight: "",
    loc: "",
    timestamp: "",
    producerId: ""
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
  import: [{
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
```

### Screenshots
Login:\
![GOF login screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/login.png?raw=true)

When attempting to use an invalid username:\
![GOF nonexistentuser screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/nonexistentuser.png?raw=true)

When logging in with a valid username, but no JWT token was passed and the response has a 401 _Unauthorized_ status:\
![GOF invalid-password screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/invalid-password.png?raw=true)

Upon successful login with a valid username and password, the user is presented with the GOF home screen with navigation (only able to access tabs for which the currently logged-in user has been granted access):\
![GOF home screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/home.png?raw=true)

Harvest:\
![GOF harvest screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/harvest.png?raw=true)

For each "Submit" (_Harvest_ above and each below), a confirmation appears for Hyperledger Fabric's transaction:\
![GOF success screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/success.png?raw=true)

Package:\
![GOF package screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/package.png?raw=true)

Export:\
![GOF export screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/export.png?raw=true)

Ship:\
![GOF ship screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/ship.png?raw=true)

Import:\
![GOF import screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/import.png?raw=true)

Distribute:\
![GOF distribute screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/screenshots/distribute.png?raw=true)
