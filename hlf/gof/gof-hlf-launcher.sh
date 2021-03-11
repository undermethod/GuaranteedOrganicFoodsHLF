#!/bin/bash

# Exit on first error
set -e

gofd=$(pwd)
cd ~
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s -- 2.2.2
cd $gofd/../chaincode/gof/javascript
npm i
cd ../../../gof/javascript
npm i
cd ..
./startFabric.sh javascript
cd javascript
node enrollAdmin
node registerUsersGOF
node initLedger
node queryAllBoxes