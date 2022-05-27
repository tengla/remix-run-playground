FROM node:alpine3.15
# node v18.2.0
WORKDIR /home/node/app
COPY . .
RUN npm i
RUN npm run build
RUN chown -R node store
CMD [ "npm", "run", "start"]
