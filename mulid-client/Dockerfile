FROM node:18-bullseye

# install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app
COPY package.json package-lock.json* /app/
RUN npm install --production

COPY server /app/server

EXPOSE 3000
CMD ["node", "server/index.js"]
