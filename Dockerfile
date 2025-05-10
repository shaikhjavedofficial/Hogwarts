FROM node:20
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y python3 make g++
RUN corepack enable && yarn install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]