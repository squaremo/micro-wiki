FROM google/nodejs
WORKDIR /home/micro-wiki
ADD *.js package.json ./
COPY node_modules ./node_modules/
ENV HTTP_PORT 80
ENTRYPOINT ["node", "./server.js"]
