# Multi-stage
# 1) UI part
# 2) Server part

# Name the node stage "uiBuilder"
FROM node:14.17.4-alpine AS uiBuilder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./client .
# install node modules and build assets
RUN yarn install && yarn build

# Name the node stage "serverBuilder"
FROM node:14.17.4-alpine AS serverBuilder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# Remove client directory
RUN rm -rf ./client
# Copy static assets from uiBuilder stage
COPY --from=uiBuilder /app/build ./client/build
# Install dependencies
RUN yarn install
# Expose port 3012
EXPOSE 3012
# Run server
CMD [ "yarn", "start:server:prod" ]
