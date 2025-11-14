# # Stage 1: Build frontend
# FROM node:18-alpine AS build

# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy all source files and build
# COPY . .
# RUN npm run build

# # Stage 2: Serve with nginx
# FROM nginx:alpine

# # Remove default Nginx config
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/

# # Copy built app
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]