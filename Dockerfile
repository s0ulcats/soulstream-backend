FROM node:20.17.0-alpine AS base

RUN apk add --no-cache gcompat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

FROM base as build

# Устанавливаем NestJS CLI
RUN npm install -g @nestjs/cli

COPY . .

RUN npx prisma generate  

RUN npm run build  

FROM base as production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist  
COPY --from=build /app/prisma/client ./prisma/client  

CMD ["node", "dist/main"]