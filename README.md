# Renforcement Full JS Project

Ce projet est une plateforme simple où les utilisateurs peuvent :
- S'inscrire
- Se connecter
- Accéder à un **back office** (s'ils sont autorisés)

Depuis le back office, les utilisateurs peuvent :
- Visualiser la liste des ussers
- Supprimer des users
- Changer leur rôle

## Fonctionnalités

### Back

- **Modèle MVC** : Le projet suit l'architecture **MVC**.
- **Gestion des routes** : Utilisation d'un **router** pour gérer les routes backend.
- **Système d'inscription et de connexion** : Gestion de l'authentification avec des tokens **JWT** pour assurer des connexions sécurisées.
- **Back office** : Le back office récupere les données sur la table user de la db mongodb. Les données sont gérées grâce à un CRUD dans le userController. 2 endpoints POST, 1 endpoints GET, 1 put et 1 delete.
- **Authentification** : Un midleware vérifie que l'utilisateur est authentifié avant d'accéder aux routes protégées.
- **Vérification des rôles** : Un autre midleware vérifie que l'utilisateur à les bons rôles pour accéder aux routes.
- **Sécurité des mots de passe** : Les mots de passes sont hachés avant d'être envoyer en base.

### Front

- **Page d'acceuil** : Une page d'acceuil sans fonctionnalités spécifiques pour l'instant.
- **Page de connexion et d'inscription** : Des pages pour l'inscription et la connexion
- **Page de back office** : Accessible uniquement aux utilisateurs `super` ou `admin`. Elle permet la gestion des utilisateurs.
- **Gestion des routes** : Utilisation d'un router pour gérer la navigation front.
- **Store Vuex** : Centralisation des données dans un store Vuex..
- **Appels API** : fetch HTTP vers l'API pour gérer les actions comme la connexion, l'inscription, et la gestion des utilisateurs dans le back office

### Déploiement

- **Dockerisation** : 
  - Un Dockerfile est présent pour le frontend et le backend, et un docker-compose.yml à la racine pour construire les conteneurs front back et mango
  - Les différentes couches sont contenerisés dans des conteneurs distincts pour une meilleure isolation des services