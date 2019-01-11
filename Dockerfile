FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/makina-api/

# Bundle app source
COPY . .

# Install dependencies
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Build typescript files
RUN npm run-script build

# Dockerize setting to db https://github.com/jwilder/dockerize/
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://$DATABASE_HOST:$DATABASE_PORT -timeout 5m npm start
