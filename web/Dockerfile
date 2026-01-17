FROM node:20-alpine
WORKDIR /Client
COPY package.json ./
RUN npm install
COPY . .
CMD npm run start
EXPOSE 3001
