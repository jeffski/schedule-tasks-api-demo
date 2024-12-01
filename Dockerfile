FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env ./
RUN npm install \
    npx prisma generate

COPY . .
RUN npm run build \
    chown -R node:node node_modules

EXPOSE 3000

CMD ["npm", "run", "start:dev"]