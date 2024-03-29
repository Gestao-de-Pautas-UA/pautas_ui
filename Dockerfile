# base image
FROM node:16.12.0

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .

RUN echo "API_URL='http://pautasbackend.com/pautasBack'" > .env

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN npm ci --only=production

# Copy local code to the container image.

RUN npm run build --force

# Run the web service on container startup.
CMD [ "npm", "start" ]
