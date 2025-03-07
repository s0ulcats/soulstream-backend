FROM node:20.17.0-alpine AS base

RUN apk add --no-cache gcompat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM base as build

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM base as production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/client ./prisma/client

CMD ["node", "dist/main"]