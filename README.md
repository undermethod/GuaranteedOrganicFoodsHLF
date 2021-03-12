# BCDV1012 - dApp I - Group Assignment

## Hyperledger Fabric - Guaranteed Organic Foods

### Project Description
Supply Chain use case for Hyperledger Fabric for building a dApp: Guaranteed Organic Foods (GOF) traces the exportation of avocados from Colombia to Canada, from the farmer to the consumer.

### Requirements (Check)
- Track and trace avocados _from farm to table_
- Allow various business actors to have access for transparency and traceability
- Keep records for the Purchase Order (in our case Box ID), box weight, timestamps, historical statuses and current status

### State Machine Diagram
![GOF state diagram](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20state%20diagram.png?raw=true)

### Transition Descriptions (Check)
- uint boxId = harvest(producerId, weight, location, newPackagerId)
- queryBox(boxId)
- package(boxId, location)
- bool exportInspectionPassed = exportInspect(boxId, location, inspectionAgentId, destinationCountry?)
- sellDomestically(boxId)
- compost(boxId)
- ship(boxId, shipperId, containerId, originCountry, destinationCountry)
- bool importInspectionPassed = importInspect(boxId, location, inspectionAgentId, originCountry)
- distribute(boxId, distributorId, location, destinationRetailerId)
- stock(boxId, shelfId)
- sell(boxId, isFinalUnit)

### Flow Chart Diagram
![GOF flow chart](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/documents/GOF%20flow%20chart%20model.png?raw=true)

### Architecture (Include)
- Diagram of the layers and integration of the components
- Architectural decisions: jwt

### Chaincode Diagram
[GOF Chaincode](https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/de6093b1f429bd2f9f794c9a36fe766ca6a76996/documents/Chaincde%20diagram.jpg)

### State Data (Validate with the code)
```javascript
{
  boxId: uint,
  created: datetime,
  weight: uint,
  currentRole: enum(Roles).Role,
  producer: {
    producerId: uint,
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
    location: "",
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
