FROM node:20.17.0-alpine AS base

RUN apk add --no-cache gcompat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

FROM base as build

COPY . .  

RUN npx prisma generate  

RUN npx nest build

FROM base as production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist  
COPY --from=build /app/prisma/client ./prisma/client  

CMD ["node", "dist/main"]