#!/usr/bin/env bash

cd utils
node create-json-files.js
cd ..

cd backend-db
chmod u+x build.sh
./build.sh

cd ../backend-http
npm install
chmod u+x build.sh
npm run build

cd ../frontend-web
npm install
chmod u+x build.sh
npm run build

cd ..