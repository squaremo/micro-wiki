FROM node
WORKDIR /home/micro-wiki
ENV HTTP_PORT 80
ENV PROM_PORT 9090
ENTRYPOINT ["node", "./server.js"]
COPY node_modules ./node_modules/
COPY *.js package.json ./
