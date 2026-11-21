# Works on Fly.io, Railway, Koyeb, a VPS… anything that runs a container.
FROM node:22-slim
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci --include=dev
COPY . .
RUN npm run build
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
HEALTHCHECK CMD node -e "fetch('http://localhost:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["npx", "tsx", "server/index.ts"]
