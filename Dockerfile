FROM node:10-alpine

# Create app directory
WORKDIR /usr/makina-api/

# Install dependencies
COPY package.json package.json
RUN npm install --only=production

# Copy app sources
COPY dist dist
COPY config config

CMD node dist/index.js
