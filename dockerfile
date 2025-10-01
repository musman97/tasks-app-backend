FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml .

RUN corepack enable && corepack use pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]

