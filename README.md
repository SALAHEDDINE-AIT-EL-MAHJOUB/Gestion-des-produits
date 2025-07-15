# Gestion des Produits

Ce projet est une application web pour la gestion de produits et de listes de produits. Il permet d'ajouter, modifier, supprimer et filtrer des produits, ainsi que de gérer des listes associées.

## Langages utilisés

- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=flat) **JavaScript (React)** : Interface utilisateur dynamique  
- ![C#](https://img.shields.io/badge/C%23-239120?logo=c-sharp&logoColor=white&style=flat) **C# (ASP.NET Core)** : Backend et API  
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat) **HTML/CSS** : Structure et style des pages  
- ![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=white&style=flat) **JSON** : Configuration et échanges

## Structure du projet

```
Web/
│
├── Domain/           # Modèles de données (C#)
├── Repository/       # Accès aux données (C#)
├── Service/          # Logique métier (C#)
├── Web/              # Projet principal ASP.NET Core
│   ├── wwwroot/      # Fichiers statiques (images, CSS, JS)
│   └── views/        # Frontend React
│       ├── src/      # Sources React (App.js, composants, etc.)
│       └── public/   # Fichiers publics React
└── Web.sln           # Fichier solution Visual Studio
```

## Fonctionnalités

- Ajout, modification et suppression de produits
- Upload d'image pour chaque produit
- Gestion des listes de produits
- Filtrage et recherche avancée
- Interface moderne avec React et ASP.NET Core

## Aperçu

### Page d'accueil

![Accueil](./Web/wwwroot/images/banner1.png)

### Liste des produits

![Produits](./Web/wwwroot/images/banner2.png)

### Gestion des listes

![Listes](./Web/wwwroot/images/banner3.png)

## Installation

1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installer les dépendances React :
   ```bash
   cd Web/views
   npm install
   ```
3. Lancer le backend ASP.NET Core :
   ```bash
   cd ../..
   dotnet run --project Web/Web.csproj
   ```
4. Lancer le frontend React :
   ```bash
   cd Web/views
   npm start
   ```

## Auteur

Sallaheddine

---

> Pour toute question, consulte la documentation ou ouvre
