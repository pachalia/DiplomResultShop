FROM node:20.13-alpine
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3010
