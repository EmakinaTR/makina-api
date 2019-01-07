FROM node:10-alpine

# Build arguments
ARG API_PORT

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

EXPOSE $API_PORT
CMD [ "npm", "start" ]

# Run `docker build -t makina/api .` to build the image.
# Run `docker run -p 3000:3000 -d makina/api` to run the container.