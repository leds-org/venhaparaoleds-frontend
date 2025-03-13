#!/usr/bin/env bash



TO=docker-container/app

FILES=(main.js package.json package-lock.json controllers utils routes.js)

[[ !(-d $TO) ]] && mkdir $TO

for f in ${FILES[@]}; do
    cp -r $f $TO
done

cd docker-container

sudo docker build --no-cache=true --tag=backend .

cd ..
