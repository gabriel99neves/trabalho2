FROM node:16.17.0-bullseye-slim

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]