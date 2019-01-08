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

EXPOSE ${API_PORT} ${API_PORT}

CMD [ "npm", "start" ]
