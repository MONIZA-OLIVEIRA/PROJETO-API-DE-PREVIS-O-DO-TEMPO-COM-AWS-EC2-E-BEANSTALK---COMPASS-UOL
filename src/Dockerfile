FROM node:latest

WORKDIR /Grupo4 - bg final

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]