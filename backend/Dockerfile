# Utiliser une version plus récente de Node.js (16 ou supérieure)
FROM node:16

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (s'ils existent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Exposer le port sur lequel ton backend tourne (par exemple 3000)
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
