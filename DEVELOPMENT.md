# 🚀 Guide de Développement TechPeek

Ce guide vous aidera à comprendre l'architecture de TechPeek et à contribuer efficacement au projet.

## 🏗️ Architecture

TechPeek utilise une architecture modulaire typique des extensions de navigateur :

### 📁 Structure des Fichiers

```
TechPeek/
├── manifest.json              # Configuration principale
├── popup/                     # Interface utilisateur
│   ├── popup.html            # Structure HTML
│   ├── popup.css             # Styles CSS
│   └── popup.js              # Logique de l'interface
├── content/                   # Scripts de contenu
│   └── content.js            # Analyse de la page
├── background/                # Service worker
│   └── background.js         # Analyse réseau et headers
├── injected/                  # Scripts injectés
│   └── detector.js           # Détection dans le contexte page
├── icons/                     # Icônes de l'extension
└── docs/                      # Documentation
```

## 🔄 Flux de Données

1. **Injection** : `content.js` injecte `detector.js` dans la page
2. **Détection** : `detector.js` analyse les variables globales
3. **Analyse** : `content.js` analyse le DOM et les ressources
4. **Réseau** : `background.js` capture les headers HTTP
5. **Affichage** : `popup.js` récupère et affiche les données

## 🧩 Composants Principaux

### Content Script (`content/content.js`)
- **Rôle** : Analyse du DOM et coordination
- **Accès** : DOM de la page, APIs Chrome limitées
- **Responsabilités** :
  - Injection du script de détection
  - Analyse des frameworks via le DOM
  - Détection des CDN via les URLs
  - Communication avec la popup

### Injected Script (`injected/detector.js`)
- **Rôle** : Détection dans le contexte de la page
- **Accès** : Variables globales JavaScript
- **Responsabilités** :
  - Détection des frameworks via `window`
  - Analyse des librairies chargées
  - Détection des outils d'analytics

### Background Script (`background/background.js`)
- **Rôle** : Analyse réseau et headers HTTP
- **Accès** : WebRequest API, stockage
- **Responsabilités** :
  - Capture des headers de sécurité
  - Détection des serveurs web
  - Analyse des CDN via headers

### Popup (`popup/popup.js`)
- **Rôle** : Interface utilisateur
- **Accès** : APIs Chrome, communication avec content script
- **Responsabilités** :
  - Affichage des résultats
  - Export des données
  - Gestion des interactions utilisateur

## 🔧 APIs Utilisées

### Chrome Extension APIs
- `chrome.tabs` : Gestion des onglets
- `chrome.runtime` : Communication entre scripts
- `chrome.webRequest` : Interception des requêtes
- `chrome.storage` : Stockage local

### Web APIs
- `Performance API` : Métriques de performance
- `DOM API` : Analyse de la structure
- `Fetch API` : Requêtes réseau (si nécessaire)

## 🎯 Ajout de Nouvelles Détections

### 1. Framework JavaScript

```javascript
// Dans content/content.js ou injected/detector.js
if (window.NewFramework) {
    frameworks.push({
        name: 'New Framework',
        version: window.NewFramework.version || 'Détecté',
        icon: 'https://cdn.example.com/icon.svg',
        description: 'Description du framework'
    });
}
```

### 2. Outil d'Analytics

```javascript
// Dans injected/detector.js
if (window.newAnalyticsTool) {
    analytics.push({
        name: 'New Analytics Tool',
        type: 'Analytics',
        detected: true
    });
}
```

### 3. CDN via Headers

```javascript
// Dans background/background.js
const cdnHeaders = {
    'New CDN': ['x-new-cdn-header', 'x-new-cdn-pop']
};
```

## 🎨 Personnalisation de l'Interface

### Ajout d'une Nouvelle Section

1. **HTML** (`popup/popup.html`) :
```html
<section class="tech-section">
    <h2 class="section-title">
        <span class="icon">🆕</span>
        Nouvelle Section
    </h2>
    <div class="tech-grid" id="new-section">
        <div class="no-data">Aucune donnée</div>
    </div>
</section>
```

2. **CSS** (`popup/popup.css`) :
```css
.new-section-item {
    /* Styles spécifiques */
}
```

3. **JavaScript** (`popup/popup.js`) :
```javascript
displayNewSection() {
    const container = document.getElementById('new-section');
    // Logique d'affichage
}
```

## 🧪 Tests et Débogage

### Tests Manuels
1. Charger l'extension en mode développeur
2. Tester sur différents sites web
3. Vérifier la console pour les erreurs
4. Tester l'export de données

### Débogage
- **Popup** : Clic droit → Inspecter
- **Content Script** : Console de la page
- **Background** : `chrome://extensions/` → Inspecter les vues

### Sites de Test Recommandés
- **React** : facebook.com, netflix.com
- **Vue.js** : gitlab.com, adobe.com
- **Angular** : google.com, microsoft.com
- **jQuery** : jquery.com, wordpress.com

## 📊 Métriques de Performance

### Optimisations Importantes
- Éviter les analyses coûteuses au chargement
- Utiliser `requestIdleCallback` pour les tâches non critiques
- Mettre en cache les résultats quand possible
- Limiter les requêtes réseau

### Monitoring
```javascript
// Mesurer le temps d'exécution
const start = performance.now();
// ... code à mesurer
const end = performance.now();
console.log(`Analyse terminée en ${end - start}ms`);
```

## 🔒 Sécurité

### Bonnes Pratiques
- Valider toutes les entrées utilisateur
- Éviter `eval()` et `innerHTML` avec du contenu non sécurisé
- Utiliser Content Security Policy
- Minimiser les permissions dans le manifest

### Gestion des Erreurs
```javascript
try {
    // Code potentiellement dangereux
} catch (error) {
    console.error('Erreur TechPeek:', error);
    // Fallback gracieux
}
```

## 📦 Build et Distribution

### Préparation pour Chrome Web Store
1. Supprimer `create_icons.html` (fichier de développement)
2. Minifier le CSS/JS si nécessaire
3. Optimiser les icônes
4. Tester sur Chrome et Edge

### Préparation pour Firefox Add-ons
1. Vérifier la compatibilité du manifest
2. Tester sur Firefox
3. Préparer les captures d'écran

## 🤝 Contribution

### Workflow Git
1. Fork le repository
2. Créer une branche feature : `git checkout -b feature/nouvelle-detection`
3. Committer les changements : `git commit -m "Ajout détection Framework X"`
4. Pousser la branche : `git push origin feature/nouvelle-detection`
5. Créer une Pull Request

### Standards de Code
- **JavaScript** : ES6+, camelCase
- **CSS** : BEM methodology, kebab-case
- **HTML** : Sémantique, accessibilité
- **Commentaires** : En français, explicites

### Checklist PR
- [ ] Tests manuels effectués
- [ ] Code documenté
- [ ] Pas d'erreurs console
- [ ] Compatible Chrome et Firefox
- [ ] Performance acceptable

## 🐛 Résolution de Problèmes

### Problèmes Courants

**Extension ne se charge pas**
- Vérifier la syntaxe du manifest.json
- Contrôler les permissions
- Regarder les erreurs dans chrome://extensions/

**Détection ne fonctionne pas**
- Vérifier l'injection du script
- Contrôler les CSP de la page
- Tester les sélecteurs DOM

**Interface cassée**
- Vérifier les chemins des ressources
- Contrôler la syntaxe CSS
- Tester sur différentes résolutions

## 📚 Ressources Utiles

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Web APIs Reference](https://developer.mozilla.org/en-US/docs/Web/API)
- [Wappalyzer Patterns](https://github.com/wappalyzer/wappalyzer) (inspiration)

---

**Happy Coding!** 🚀 