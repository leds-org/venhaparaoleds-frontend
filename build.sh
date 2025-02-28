#!/usr/bin/env bash

cd backend-db
./build.sh
cd ../backend-http
npm run build
cd ../frontend-web
npm run build
cd ..