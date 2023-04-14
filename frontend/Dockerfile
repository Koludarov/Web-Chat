FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install socket.io-client

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
