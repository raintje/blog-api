FROM node:alpine 

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

CMD ["pnpm", "start:dev"]
