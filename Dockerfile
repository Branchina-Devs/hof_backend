# ─── Stage 1: deps (solo production dependencies) ───────────────────────────

FROM node:25-alpine3.23 AS deps

WORKDIR /app

  

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

  

# ─── Stage 2: build (tutte le dipendenze + compilazione) ─────────────────────

FROM node:25-alpine3.23 AS build

WORKDIR /app

  

COPY package.json package-lock.json ./

RUN npm ci

  

COPY . .

RUN npm run build

  

# ─── Stage 3: runner (immagine finale leggera) ────────────────────────────────

FROM node:25-alpine3.23 AS runner

WORKDIR /app

  

# Copia solo le prod deps dallo stage "deps"

COPY --from=deps /app/node_modules ./node_modules

  

# Copia il build compilato dallo stage "build"

COPY --from=build /app/dist ./dist

COPY migrations /app/dist/migrations

  

# (opzionale) copia package.json per metadata/scripts

COPY package.json .

  
  

CMD ["node", "dist/index.js"]