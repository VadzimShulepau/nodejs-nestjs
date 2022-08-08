FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --force
COPY . .
COPY .env.example .env
# ENV PORT 4000
# VOLUME [ "/app/src/data" ]
EXPOSE 4000
CMD [ "npm", "run", "start:dev" ]
