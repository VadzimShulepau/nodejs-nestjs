FROM node:16-alpine
WORKDIR /app/src
COPY package*.json ./
RUN npm install --force
COPY . .
COPY .env.example .env
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]
