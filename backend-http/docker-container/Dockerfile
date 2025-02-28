FROM node:23.9
WORKDIR /home/node/
COPY app app
RUN chown -R node app
USER node
WORKDIR /home/node/app
RUN npm install
CMD npm run server