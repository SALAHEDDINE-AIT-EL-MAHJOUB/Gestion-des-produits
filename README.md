# Gestion des produits

Ce projet est une application de gestion des produits développée en .NET 8 et Entity Framework Core.  
Elle permet d’ajouter, modifier, supprimer et consulter des produits dans une base de données SQL Server.

## Fonctionnalités

- **Ajout de produits**  
  Saisissez les informations d’un nouveau produit et enregistrez-le dans la base de données.

- **Modification de produits**  
  Mettez à jour les informations d’un produit existant.

- **Suppression de produits**  
  Supprimez un produit de la liste.

- **Consultation des produits**  
  Affichez la liste complète des produits enregistrés.



## Captures d’écran

### 1. Page d’accueil
![Accueil](Web/wwwroot/images/banner1.png)

### 2. gestion de produits
![Ajout produit](Web/wwwroot/images/banner2.png)

### 3. Liste des produits
![Liste produits](Web/wwwroot/images/banner3.png)

## Structure du projet

- **Domain** : Entités métier
- **Repository** : Accès aux données (Entity Framework)
- **Presentation** : Interface utilisateur (Web ou Desktop)
- **Repository** : Gère l’accès aux données (CRUD)
- **Service**: Contient la logique métier
