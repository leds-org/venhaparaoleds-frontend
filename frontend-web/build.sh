#!/usr/bin/env bash

npx vite build --outDir docker-container/dist

cd docker-container

sudo docker build --no-cache=true --tag=frontend .

cd ..