# 🎨 Icônes TechPeek

Ce dossier contient les icônes de l'extension TechPeek.

## 📋 Icônes Requises

L'extension nécessite les icônes suivantes :
- `icon-16.png` (16x16px) - Barre d'outils
- `icon-32.png` (32x32px) - Gestion des extensions
- `icon-48.png` (48x48px) - Page des extensions
- `icon-128.png` (128x128px) - Chrome Web Store

## 🛠️ Génération des Icônes

1. Ouvrez le fichier `create_icons.html` dans votre navigateur
2. Cliquez sur "Télécharger" sous chaque taille d'icône
3. Sauvegardez les fichiers dans ce dossier avec les noms corrects

## 🎨 Design

Les icônes utilisent :
- **Couleurs** : Gradient bleu-violet (#6366f1 → #8b5cf6)
- **Style** : Moderne avec coins arrondis
- **Symbole** : Loupe avec points de données (représentant l'analyse)
- **Format** : PNG avec transparence

## 📐 Spécifications

- **Format** : PNG
- **Transparence** : Oui
- **Couleurs** : 32-bit RGBA
- **Optimisation** : Recommandée pour la distribution

## 🔄 Icônes Temporaires

En attendant la génération des vraies icônes, vous pouvez utiliser des icônes de placeholder ou des émojis dans le manifest.json :

```json
"icons": {
    "16": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjM2NmYxO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+"
}
``` 