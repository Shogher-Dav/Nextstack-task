
FROM node:20

# Specify Working directory inside container
WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["npm", "start"]
