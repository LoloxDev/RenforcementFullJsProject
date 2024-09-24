# Étape 1 : Construire l'application Vue.js
FROM node:16 AS build

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source
COPY . .

# Lancer la commande de build pour Vue.js
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers générés par npm run build dans le dossier Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80
