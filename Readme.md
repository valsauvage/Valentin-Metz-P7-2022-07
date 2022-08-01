# RÉSEAU SOCIAL POUR GROUPOMANIA

## Installation du backend

```bash
npm install
npm run start
```

## Installation du frontend

```bash
npm install
npm run serve
```

## Créer les variables d'environnement

- créer le fichier `.env` dans le dossier `backend/config`

PORT="Le port utilisé pour se connecter au backend"
CLIENT_URL="L'url utilisé pour se connecter avec le frontend"
SERVER_URL="L'url utilisé pour l'API"

DB_USER="Votre nom d'utilisateur MongoDB"
DB_PW="Votre mot de passe MongoDB"

SECRET_KEY="La clé de création du token : Mettez ce que vous voulez"

## Les variables d'environnement du frontend

dans le dossier `frontend`, modifier la variable si besoin :

REACT_APP_API_URL="L'url de l'API"

# Connexion administrateur

ADMIN_USER=admin
ADMIN_PASSWORD=adminroot
