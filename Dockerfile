FROM node:20.18.1 as build
WORKDIR /etc/evm-deployer-boilerplate
ENV PATH /etc/evm-deployer-boilerplate/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm i -g npm@10.8.2
# RUN npm i -g yarn@1.22.22
COPY . .
RUN cd /etc/evm-deployer-boilerplate
RUN yarn
RUN yarn build
# localnet
EXPOSE 8545
# more ports
EXPOSE 9545
CMD [ "npm", "run", "chain:devnet" ]