# ?? Badger - Plateforme de Gestion d'Infrastructure

Badger est une application React moderne pour la gestion centralisée de votre infrastructure cloud. Administrez facilement vos serveurs, machines virtuelles et utilisateurs avec une interface intuitive et sécurisée.

## ? Fonctionnalités

- **?? Gestion des Utilisateurs** - Créer, modifier et supprimer les utilisateurs du système
- **??? Gestion des Serveurs** - Administrer votre parc de serveurs physiques ou cloud
- **?? Gestion des Machines Virtuelles** - Contrôler et configurer vos VMs
- **?? Authentification Sécurisée** - Système de login avec tokens JWT
- **?? Dashboard Intuitif** - Interface moderne et réactive
- **?? Contrôle d'Accès** - Permissions granulaires basées sur les rôles utilisateur
- **?? Édition en Ligne** - Modifier vos ressources directement depuis l'application

## ?? Installation

### Prérequis

- Node.js (v14+)
- npm ou yarn

### Étapes d'installation

1. **Clonez le dépôt**
   \\\bash
   git clone https://github.com/kevingbt/badger-react.git
   cd badger-react
   \\\

2. **Installez les dépendances**
   \\\bash
   npm install
   \\\

3. **Démarrez le serveur de développement**
   \\\bash
   npm start
   \\\
   L'application s'ouvrira automatiquement sur [http://localhost:3000](http://localhost:3000)

## ?? Scripts Disponibles

### \
pm start\
Lance l'application en mode développement avec rechargement automatique.

### \
pm test\
Exécute les tests en mode watch interactif.

### \
pm run build\
Crée une version optimisée pour la production dans le dossier \build/\.

### \
pm run eject\
?? **Opération irréversible** - Éjecte la configuration Create React App si vous avez besoin de personnalisation avancée.

## ??? Architecture

\\\
src/
+-- components/       # Composants réutilisables (formulaires)
+-- routes/          # Pages de l'application
+-- store/           # Gestion d'état avec Redux Toolkit
+-- hooks/           # Hooks personnalisés
+-- App.tsx          # Composant principal
\\\

### Modules Clés

- **Redux Store** - Gestion centralisée de l'état utilisateur
- **React Router** - Navigation entre les pages
- **Authentification** - Tokens stockés localement
- **API Integration** - Communication avec le backend via \fetchApi\ hook

## ?? Authentification

L'application utilise un système de token JWT :
1. Connectez-vous via la page \/login\
2. Le token est stocké dans \localStorage\
3. Les requêtes API incluent automatiquement le token
4. Déconnexion disponible via le lien "Log Out"

## ?? Dépendances Principales

- **React 19** - Framework frontend
- **Redux Toolkit** - Gestion d'état
- **React Router 7** - Routage
- **TypeScript** - Typage statique
- **Testing Library** - Tests unitaires et d'intégration

## ??? Développement

### Structure des Routes

| Route | Description |
|-------|-------------|
| \/login\ | Page de connexion |
| \/user\ | Liste des utilisateurs |
| \/user/:id\ | Édition d'un utilisateur |
| \/server\ | Liste des serveurs |
| \/server/:id\ | Édition d'un serveur |
| \/vm\ | Liste des VMs |
| \/vm/:id\ | Édition d'une VM |

### Permissions

L'app vérifie les permissions via les hooks :
- \useCanEditAdd\ - Droit de création/édition
- \useCanDelete\ - Droit de suppression

## ?? Déploiement

Pour déployer en production :

\\\bash
npm run build
\\\

Le dossier \build/\ contient une version minifiée et optimisée prête pour le déploiement.

## ?? Licence

Ce projet est privé. Pour plus d'informations, consultez le propriètaire du dépôt.

---

**Besoin d'aide ?** Consultez la [documentation React](https://react.dev) ou la [documentation Create React App](https://create-react-app.dev).
