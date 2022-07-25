# Installation du backend

`npm install`

## Remplir les variables d'environnement

- créer le fichier `.env` dans `./config`

PORT="Le port utilisé pour se connecter au backend"
CLIENT_URL="L'url utilisé pour se connecter avec le frontend"

DB_USER="Votre nom d'utilisateur MongoDB"
DB_PW="Votre mot de passe MongoDB"

SECRET_KEY="La clé de création du token : Mettez ce que vous voulez"

## Lancement du backend

`npm run start`