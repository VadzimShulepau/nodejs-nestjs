FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --force
COPY . .
COPY .env.example .env
# ENV PORT 4000
# VOLUME [ "/app/src/data" ]
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]
