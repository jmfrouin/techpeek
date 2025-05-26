# 🔍 TechPeek - Analyseur de Technologies Web

TechPeek est une extension de navigateur complète qui analyse et détecte les technologies utilisées par les sites web. Elle fournit des informations détaillées sur les frameworks JavaScript, la sécurité, les CDN, les plateformes d'analytics et bien plus encore.

## ✨ Fonctionnalités

### 🚀 **Frameworks JavaScript**
- Détection automatique des frameworks : React, Vue.js, Angular, Svelte, Ember.js, Backbone.js
- Versions précises quand disponibles
- Icônes des technologies
- Descriptions détaillées

### 🔒 **Analyse de Sécurité**
- **HTTPS** : Vérification du protocole sécurisé
- **HSTS** : Détection du Strict Transport Security
- **CSP** : Content Security Policy
- **Mixed Content** : Détection de contenu mixte
- **Headers de sécurité** : X-Frame-Options, X-Content-Type-Options, etc.

### 🌐 **CDN & Infrastructure**
- Détection des CDN : Cloudflare, AWS CloudFront, Google CDN, jsDelivr, etc.
- Analyse des headers de réponse
- Informations sur le serveur web

### 📊 **Analytics & Data**
- Google Analytics, Facebook Pixel, Hotjar, Mixpanel
- Adobe Analytics, Segment
- Détection des outils de tracking

### ⚡ **Performance**
- Temps de chargement de la page
- Nombre de ressources
- Détection du lazy loading
- Analyse des headers de cache

### 🔧 **Informations Techniques**
- Version HTTP (1.1, 2, 3)
- Support PWA et Service Workers
- Métadonnées de la page
- Encodage et langue

## 🛠️ Installation

### Pour Chrome
1. Téléchargez ou clonez ce repository
2. Ouvrez Chrome et allez dans `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier TechPeek

### Pour Firefox
1. Téléchargez ou clonez ce repository
2. Ouvrez Firefox et allez dans `about:debugging`
3. Cliquez sur "Ce Firefox"
4. Cliquez sur "Charger un module complémentaire temporaire"
5. Sélectionnez le fichier `manifest.json`

## 🎯 Utilisation

1. **Naviguez** vers n'importe quel site web
2. **Cliquez** sur l'icône TechPeek dans la barre d'outils
3. **Attendez** quelques secondes pendant l'analyse
4. **Explorez** les résultats organisés par catégories
5. **Exportez** les données en JSON ou CSV si nécessaire

## 📋 Fonctionnalités Avancées

### Export de Données
- **JSON** : Format structuré pour l'analyse programmatique
- **CSV** : Format tabulaire pour les feuilles de calcul

### Actualisation
- Bouton de rafraîchissement pour relancer l'analyse
- Détection en temps réel des changements

### Interface Moderne
- Design sombre élégant
- Interface responsive
- Animations fluides
- Icônes des technologies

## 🔍 Technologies Détectées

### Frameworks & Librairies
- **Frontend** : React, Vue.js, Angular, Svelte, Ember.js, Backbone.js
- **CSS** : Bootstrap, Tailwind CSS, Foundation
- **Utilitaires** : jQuery, Lodash, Underscore.js, Moment.js
- **Visualisation** : D3.js, Chart.js, Three.js

### CMS & E-commerce
- **CMS** : WordPress, Drupal, Joomla
- **E-commerce** : Shopify, WooCommerce, Magento, PrestaShop

### Analytics & Marketing
- **Analytics** : Google Analytics, Adobe Analytics, Mixpanel
- **Marketing** : Facebook Pixel, Hotjar, Segment
- **A/B Testing** : Optimizely, VWO

### Infrastructure
- **CDN** : Cloudflare, AWS CloudFront, Fastly, Akamai
- **Serveurs** : Apache, Nginx, IIS
- **Cloud** : AWS, Google Cloud, Azure

## 🛡️ Sécurité & Confidentialité

- **Aucune donnée** n'est envoyée vers des serveurs externes
- **Analyse locale** uniquement
- **Respect de la vie privée** : aucun tracking
- **Code open source** : transparence totale

## 🚀 Développement

### Structure du Projet
```
TechPeek/
├── manifest.json          # Configuration de l'extension
├── popup/                 # Interface utilisateur
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/               # Script d'analyse de contenu
│   └── content.js
├── background/            # Service worker
│   └── background.js
├── injected/              # Script injecté dans la page
│   └── detector.js
├── icons/                 # Icônes de l'extension
└── README.md
```

### Technologies Utilisées
- **JavaScript ES6+** : Logique principale
- **CSS3** : Interface moderne avec gradients et animations
- **Chrome Extension API** : Intégration navigateur
- **WebRequest API** : Analyse des requêtes réseau

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité
3. **Committez** vos changements
4. **Poussez** vers la branche
5. **Ouvrez** une Pull Request

### Idées de Contributions
- Ajout de nouvelles technologies à détecter
- Amélioration de l'interface utilisateur
- Optimisation des performances
- Traductions dans d'autres langues
- Tests automatisés

## 📝 Changelog

### Version 1.0.0
- 🎉 Version initiale
- ✅ Détection des frameworks JavaScript
- ✅ Analyse de sécurité complète
- ✅ Détection CDN et infrastructure
- ✅ Analytics et plateformes de données
- ✅ Métriques de performance
- ✅ Export JSON/CSV
- ✅ Interface moderne et responsive

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **DevIcons** pour les icônes des technologies
- **Chrome Extensions Team** pour la documentation
- **Mozilla** pour les APIs Firefox
- **Communauté Open Source** pour l'inspiration

## 📞 Support

Pour toute question ou problème :
- 🐛 **Issues** : Ouvrez une issue sur GitHub
- 💬 **Discussions** : Utilisez les discussions GitHub
- 📧 **Email** : Contactez l'équipe de développement

---

**TechPeek** - Découvrez la technologie derrière chaque site web ! 🚀 