FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Cài đặt NODE_OPTIONS để kích hoạt debugging
# ENV NODE_OPTIONS="--inspect=0.0.0.0:9229"

# Start the application
CMD ["npm", "run", "start:prod"]
