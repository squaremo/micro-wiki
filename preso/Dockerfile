FROM dockerfiles/nodejs
WORKDIR /home/micro-wiki
ADD ./preso.js ./package.json /home/micro-wiki/
ENV HTTP_PORT 80
ENTRYPOINT ["node", "./preso.js"]

RUN npm install
