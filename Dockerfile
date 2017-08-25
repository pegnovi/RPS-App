FROM node:boron

WORKDIR /app

ADD . /app

# install deps
RUN npm install

# compile
RUN npm run build

EXPOSE 80

CMD ["node", "server"]


########################################
# To run with docker:
# install docker
# clone repo
# cd to project root
# execute:
# docker build -t rps-test-1 .
# docker run -p 9000:9000 rps-test-1
# navigate to localhost:9000 in your browser
########################################
