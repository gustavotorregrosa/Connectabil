FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package*.json ./

COPY . .

COPY --chown=node:node . .

USER node

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start:dev"]