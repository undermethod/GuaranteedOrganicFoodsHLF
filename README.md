# BCDV1012 - dApp I - Group Assignment

## Hyperledger Fabric - Guaranteed Organic Foods

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
![GOF state diagram](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20state%20diagram.png?raw=true)

### Transition Descriptions
The transitions of the state machine are represented by the functions of the smart contract listed below.
- uint boxId = harvest(role, producerId, weight, location)
- package(role, boxId, location, packagerId)
- bool exportInspectionPassed = exportInspect(role, boxId, location, exporterId, inspectionAgentId, destinationCountry, passInspection)
- ship(role, boxId, shipperId, containerId, originCountry, destinationCountry)
- bool importInspectionPassed = importInspect(role, boxId, importerId, location, inspectionAgentId, originCountry, passInspection)
- distribute(role, boxId, distributorId, location, destinationRetailerId)
- stock(role, boxId, retialerId, location, shelfId)
- sell(role, boxId, retailerId)
- sellDomestically(role, boxId, exporterId)
- compost(role, boxId)

### Flow Chart Diagram
![GOF flow chart](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20flow%20chart%20model.png?raw=true)

### Architecture
The architecture of GOF application contains 3 layers as the following picture shows. The first layer includes the components related to Hyperledger fabric to support the blockchain functionalities and chaincode. The second layer comprehends the server components that support the communication between the web application and the ledger considering the JwT and the API. Finally, the third layer contains the components of the web application to allow the different users the use of the blockchain system.
![GOF state diagram](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20architecture.jpg?raw=true)

### Chaincode Diagram
![GOF Chaincode](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/de6093b1f429bd2f9f794c9a36fe766ca6a76996/documents/Chaincde%20diagram.jpg?raw=true)

### State Data
```javascript
{
  
  boxId: uint,
  state: string,
  created: datetime,
  producer: {
    producerId: uint,
    weight: uint,
	timestamp: datetime,
    location: ""
  },
  packager: {
    packagerId: uint,
    timestamp: datetime,
    location: ""
  },
  exporter: {
    exporterId: uint,
    timestamp: datetime,
    location: "",
    inspectionAgentId: uint,
    inspectionPassed: bool,
    destinationCountry: ""
  },
  shipper: {
    shipperId: uint,
    timestamp: datetime,
    containerId: uint,
    originCountry: "",
    destinationCountry: ""
  },
  importer: {
    importerId: uint,
    timestamp: datetime,
    location: "",
    inspectionAgentId: uint,
    inspectionPassed: bool,
    originCountry: ""
  },
  distributor: {
    distributorId: uint,
    timestamp: datetime,
    location: "",
    destinationRetailerId: uint
  },
  retailer: {
    retailerId: uint,
    timestamp: datetime,
    location: "",
    shelfId: uint
  },
  finalUnitSold: bool
}
```

### Role Descriptions
- Producer: farmer
- Packager: wrapping for preserving
- Exporter: inspect for exportation
- Shipper: transport from origin country to destination country
- Importer: inspect for importation
- Distributor: transport from destination country border to retailer
- Retailer: stock shelves with the box for sale to consumers
- Consumer: purchaser of the individual avocados within the box

### Screenshot
![GOF screenshot](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20screenshot.png?raw=true)
