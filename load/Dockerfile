FROM google/nodejs
WORKDIR /home/micro-wiki
ADD *.js package.json ./
#COPY node_modules ./node_modules/
ENTRYPOINT ["node", "./load.js"]
