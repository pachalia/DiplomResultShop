FROM node:20.13-alpine
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate
RUN npm run build
EXPOSE 3010
