FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY backend/ ./

RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "server.js"]