FROM node:boron

WORKDIR /app

ADD . /app

# install deps
RUN npm install

# compile
RUN npm run build

EXPOSE 80

CMD ["node", "server"]
