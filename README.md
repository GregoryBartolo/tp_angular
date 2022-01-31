

# Projet réalisé par Bartolo Grégory & Maugard Samuel

# Information générales

- Lien du projet hébergé sur Heroku
    - [https://tp-angular-buffa.herokuapp.com/](https://tp-angular-buffa.herokuapp.com/)
- Lien de la vidéo YouTube
    - [https://youtu.be/u9LarJDFBNo](https://youtu.be/u9LarJDFBNo)
- Lien du repository Github de l’application web Angular
    - [https://github.com/GregoryBartolo/tp_angular](https://github.com/GregoryBartolo/tp_angular)
- Lien du repository Github de l’API pour l’application web Angular
    - [https://github.com/GregoryBartolo/tp_angular_api](https://github.com/GregoryBartolo/tp_angular_api)

# Points remarquables

- Une pagination séparée entre les devoirs rendus et non rendus
- Un système d’ajout de devoir en stepper
- Modification des devoirs quand on est connecté
- La possibilité de créer un compte
- Drag’n’drop conditionnelle
    - Le drag’n’drop n’est disponible que pour les utilisateurs connectés qui souhaitent déplacer des devoirs non rendu noté vers les devoirs rendu
- Chaque image de professeur est fixement associée à une matière et sa propre image

# Installation

## Lancer l’API en local

- Télécharger l’API depuis le repository Github
    - [https://github.com/GregoryBartolo/tp_angular](https://github.com/GregoryBartolo/tp_angular)
- Ouvrir un invité de commande dans le dossier principal
- Dans l’invité de commande, veuillez saisir les commandes suivantes :

```bash
npm i
node server.js
```

## Lancer le projet Angular en local

- Télécharger le projet depuis le repository Github suivant
    - [https://github.com/GregoryBartolo/tp_angular_api](https://github.com/GregoryBartolo/tp_angular_api)
- Voici les lignes à modifier si vous souhaitez que l’application utilise l’API qui sera lancée en local :
    - Dossier *shared* 📂
        - Fichier *assignments.service.ts* 📄
            - Ligne **45** à **décommenter**
            - Ligne **46** à **commenter**
        - Fichier *auth.service.ts* 📄
            - Ligne **20** à **décommenter**
            - Ligne **21** à **commenter**
- Ouvrir un invité de commande dans le dossier principal
- Dans un invité de commande, veuillez saisir les commandes suivantes :

```bash
npm i
ng serve
```