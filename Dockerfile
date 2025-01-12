FROM node:16 as build
WORKDIR /etc/evm-deployer-boilerplate
ENV PATH /etc/evm-deployer-boilerplate/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm i -g npm@9.6.2
COPY . .
RUN cd /etc/evm-deployer-boilerplate
RUN npm i
RUN npm run build
# localnet
EXPOSE 8545
# more ports
EXPOSE 9545
CMD [ "npm", "run", "chain:devnet" ]