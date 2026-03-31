# ─── Stage 1: deps (solo production dependencies) ───────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ─── Stage 2: build (tutte le dipendenze + compilazione) ─────────────────────
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 3: runner (immagine finale leggera) ────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Copia solo le prod deps dallo stage "deps"
COPY --from=deps /app/node_modules ./node_modules

# Copia il build compilato dallo stage "build"
COPY --from=build /app/dist ./dist

# (opzionale) copia package.json per metadata/scripts
COPY package.json .

EXPOSE 3000
CMD ["node", "dist/src/index.js"]