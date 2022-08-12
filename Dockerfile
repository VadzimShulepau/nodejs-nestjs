FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install -f && npm cache clean -f
COPY . .
COPY .env.example .env
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]
