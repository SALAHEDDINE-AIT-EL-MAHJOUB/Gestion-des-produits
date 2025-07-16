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

## Prérequis

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- SQL Server (local )
- Visual Studio Code ou Visual Studio

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/SALAHEDDINE-AIT-EL-MAHJOUB/Gestion-des-produits.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd Gestion-des-produits
   ```
3. Restaurez les packages NuGet :
   ```bash
   dotnet restore
   ```
4. Mettez à jour la chaîne de connexion dans `appsettings.json` si nécessaire.

5. Appliquez les migrations Entity Framework :
   ```bash
   dotnet ef database update
   ```

6. Lancez l’application :
   ```bash
   dotnet run --project .\Presentation\Presentation.csproj
   ```

## Captures d’écran

### 1. Page d’accueil
![Accueil](wwwroot/images/banner1.png)

### 2. gestion de produits
![Ajout produit](wwwroot/images/banner2.png)

### 3. Liste des produits
![Liste produits](![Exécution 1](wwwroot/images/banner3.png))

## Structure du projet

- **Domain** : Entités métier
- **Repository** : Accès aux données (Entity Framework)
- **Presentation** : Interface utilisateur (Web ou Desktop)
- **Repository** : Gère l’accès aux données (CRUD)
- **Service**: Contient la logique métier
