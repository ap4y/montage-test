FROM docker.io/library/node:alpine as builder

COPY frontend /app
WORKDIR /app
RUN npm install --production \
  npm run build

FROM docker.io/library/node:alpine as builder

COPY backend /app
COPY --from=builder /app/build/ /app/public/

WORKDIR /app
RUN npm install --production 

ENV NODE_ENV=production

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
