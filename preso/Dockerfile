FROM google/nodejs
WORKDIR /home/micro-wiki
ADD ./*.js /home/micro-wiki/
COPY node_modules ./node_modules/
ENV HTTP_PORT 80
ENV PROM_PORT 9090
ENTRYPOINT ["node", "./preso.js"]
