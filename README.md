# BLDC1012 - dApp I - Group Assignment

## Hyperledger Fabric - Guaranteed Organic Foods

### Project Description
Supply Chain use case for Hyperledger Fabric for building a dApp: Guaranteed Organic Foods (GOF) traces the exportation of avocados from Colombia to Canada, from the farmer to the consumer.

### Requirements
- Track and trace avocados _from farm to table_
- Allow various business actors to have access for transparency and traceability
- Keep records for the Purchase Order (in our case Box ID), box weight, timestamps, historical statuses and current status

### State Machine Diagram
![GOF state diagram]("https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/GOF state diagram.png?raw=true")

### Transition Descriptions
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
![GOF flow chart]("https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/GOF flow chart model.png?raw=true")

### State Data
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
    containerId,
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
![GOF screenshot]("https://github.com/undermethod/GuaranteedOrganicFoodsHLF/blob/main/GOF screenshot.png?raw=true")
