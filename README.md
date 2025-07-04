# Gestion des Produits

Application ASP.NET Core pour la gestion des produits avec Entity Framework Core et SQL Server.

## 🚀 Fonctionnalités

- ✅ Gestion des produits (CRUD)
- ✅ Gestion des listes de produits
- ✅ Interface utilisateur avec Razor Pages
- ✅ Base de données SQL Server avec Entity Framework Core
- ✅ Configuration HTTPS
- ✅ Migrations automatiques

## 🛠️ Technologies utilisées

- **ASP.NET Core 8.0**
- **Entity Framework Core**
- **SQL Server**
- **MVC(React views)**
  

## 📋 Prérequis

- .NET 8.0 SDK
- SQL Server (Local DB ou Express)
- Visual Studio 2022 ou VS Code

## 🔧 Installation et configuration

1. **Cloner le repository :**
   ```bash
   git clone https://github.com/[votre-username]/gestion-des-produits.git
   cd gestion-des-produits
   ```

2. **Restaurer les packages NuGet :**
   ```bash
   dotnet restore
   ```

3. **Configurer la chaîne de connexion :**
   - Modifier `appsettings.json` avec votre chaîne de connexion SQL Server

4. **Appliquer les migrations :**
   ```bash
   dotnet ef database update
   ```

5. **Lancer l'application :**
   ```bash
   dotnet run --launch-profile https
   ```

## 🌐 URLs d'accès

- **HTTPS** : `https://localhost:7101`
- **HTTP** : `http://localhost:5196`

## 📁 Structure du projet

```
produit/
├── Controllers/          # Contrôleurs API
├── Data/                # Contexte de base de données
├── Migrations/          # Migrations Entity Framework
├── Model/               # Modèles de données
├── wwwroot/             # Fichiers statiques
└── Program.cs           # Point d'entrée de l'application
```

## 🗄️ Modèles de données

### Produit
- Id (int)
- Nom (string)
- Description (string)
- Prix (decimal)
- ListProduitId (int, nullable)

### ListProduit
- Id (int)
- Nom (string)
- Description (string)
- Produits (ICollection<Produit>)

