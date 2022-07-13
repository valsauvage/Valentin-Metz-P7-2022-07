# RÉSEAU SOCIAL INTERNE GROUPOMANIA

## Backend

```bash
npm install
npm start
```

## Frontend

```bash
npm install
npm run serve
```

***Pour tester les fonctionnalités de l'app merci de suivre les étapes suivantes:***

- Créez un fichier nommé *.env* dans le dossier backend

> back
>> app.js\
>> **.env**\
>> server.js

Y insérer directement ces 3 variables d'environnements:
PORT=5000
DB_HOST=localhost
DB_USER=votre_user_name_root
DB_PASSWORD=votre_mot_de_passe_root
DB_NAME=groupomania
SECRET_KEY=Une_clé_secrète_aléatoire

- Puis créez la base de donnée avec le fichier *createDatabse.sql*

```bash
SOURCE yourPath/createDatabase.sql;
```
