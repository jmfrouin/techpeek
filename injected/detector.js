// TechPeek Injected Detector - Analyse dans le contexte de la page
(function() {
    'use strict';

    class TechPeekDetector {
        constructor() {
            this.detectedTechnologies = [];
            this.init();
        }

        init() {
            // Analyser immédiatement
            this.detectFrameworks();
            this.detectLibraries();
            this.detectAnalytics();
            this.detectCMS();
            this.detectEcommerce();
            
            // Stocker les résultats dans une variable globale accessible
            window.__TECHPEEK_DETECTED__ = {
                technologies: this.detectedTechnologies,
                timestamp: Date.now()
            };

            // Envoyer un événement personnalisé
            window.dispatchEvent(new CustomEvent('techpeek:detected', {
                detail: window.__TECHPEEK_DETECTED__
            }));
        }

        detectFrameworks() {
            // React
            if (window.React) {
                this.addTechnology({
                    name: 'React',
                    version: window.React.version || 'Détecté',
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Vue.js
            if (window.Vue) {
                this.addTechnology({
                    name: 'Vue.js',
                    version: window.Vue.version || 'Détecté',
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Angular
            if (window.ng || window.angular) {
                const version = window.ng?.version?.full || window.angular?.version?.full || 'Détecté';
                this.addTechnology({
                    name: 'Angular',
                    version: version,
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Svelte
            if (window.__SVELTE__) {
                this.addTechnology({
                    name: 'Svelte',
                    version: 'Détecté',
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Ember.js
            if (window.Ember) {
                this.addTechnology({
                    name: 'Ember.js',
                    version: window.Ember.VERSION || 'Détecté',
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Backbone.js
            if (window.Backbone) {
                this.addTechnology({
                    name: 'Backbone.js',
                    version: window.Backbone.VERSION || 'Détecté',
                    category: 'JavaScript Framework',
                    confidence: 100,
                    source: 'global'
                });
            }
        }

        detectLibraries() {
            // jQuery
            if (window.jQuery || window.$) {
                const version = window.jQuery?.fn?.jquery || 'Détecté';
                this.addTechnology({
                    name: 'jQuery',
                    version: version,
                    category: 'JavaScript Library',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Lodash
            if (window._ && window._.VERSION) {
                this.addTechnology({
                    name: 'Lodash',
                    version: window._.VERSION,
                    category: 'JavaScript Library',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Underscore.js
            if (window._ && !window._.VERSION && window._.template) {
                this.addTechnology({
                    name: 'Underscore.js',
                    version: 'Détecté',
                    category: 'JavaScript Library',
                    confidence: 90,
                    source: 'global'
                });
            }

            // Moment.js
            if (window.moment) {
                this.addTechnology({
                    name: 'Moment.js',
                    version: window.moment.version || 'Détecté',
                    category: 'JavaScript Library',
                    confidence: 100,
                    source: 'global'
                });
            }

            // D3.js
            if (window.d3) {
                this.addTechnology({
                    name: 'D3.js',
                    version: window.d3.version || 'Détecté',
                    category: 'Data Visualization',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Three.js
            if (window.THREE) {
                this.addTechnology({
                    name: 'Three.js',
                    version: window.THREE.REVISION ? `r${window.THREE.REVISION}` : 'Détecté',
                    category: '3D Graphics',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Chart.js
            if (window.Chart) {
                this.addTechnology({
                    name: 'Chart.js',
                    version: window.Chart.version || 'Détecté',
                    category: 'Data Visualization',
                    confidence: 100,
                    source: 'global'
                });
            }
        }

        detectAnalytics() {
            // Google Analytics
            if (window.gtag || window.ga || window.google_tag_manager) {
                this.addTechnology({
                    name: 'Google Analytics',
                    version: 'Détecté',
                    category: 'Analytics',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Facebook Pixel
            if (window.fbq) {
                this.addTechnology({
                    name: 'Facebook Pixel',
                    version: 'Détecté',
                    category: 'Analytics',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Hotjar
            if (window.hj) {
                this.addTechnology({
                    name: 'Hotjar',
                    version: 'Détecté',
                    category: 'Heatmap',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Mixpanel
            if (window.mixpanel) {
                this.addTechnology({
                    name: 'Mixpanel',
                    version: 'Détecté',
                    category: 'Analytics',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Adobe Analytics
            if (window.s_gi || window.s_account) {
                this.addTechnology({
                    name: 'Adobe Analytics',
                    version: 'Détecté',
                    category: 'Analytics',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Segment
            if (window.analytics && window.analytics.track) {
                this.addTechnology({
                    name: 'Segment',
                    version: 'Détecté',
                    category: 'Analytics',
                    confidence: 100,
                    source: 'global'
                });
            }
        }

        detectCMS() {
            // WordPress
            if (window.wp || document.querySelector('meta[name="generator"][content*="WordPress"]')) {
                this.addTechnology({
                    name: 'WordPress',
                    version: 'Détecté',
                    category: 'CMS',
                    confidence: 90,
                    source: 'global'
                });
            }

            // Drupal
            if (window.Drupal) {
                this.addTechnology({
                    name: 'Drupal',
                    version: 'Détecté',
                    category: 'CMS',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Joomla
            if (window.Joomla) {
                this.addTechnology({
                    name: 'Joomla',
                    version: 'Détecté',
                    category: 'CMS',
                    confidence: 100,
                    source: 'global'
                });
            }
        }

        detectEcommerce() {
            // Shopify
            if (window.Shopify || window.ShopifyAnalytics) {
                this.addTechnology({
                    name: 'Shopify',
                    version: 'Détecté',
                    category: 'E-commerce',
                    confidence: 100,
                    source: 'global'
                });
            }

            // WooCommerce
            if (window.wc_add_to_cart_params || window.woocommerce_params) {
                this.addTechnology({
                    name: 'WooCommerce',
                    version: 'Détecté',
                    category: 'E-commerce',
                    confidence: 100,
                    source: 'global'
                });
            }

            // Magento
            if (window.Magento || window.FORM_KEY) {
                this.addTechnology({
                    name: 'Magento',
                    version: 'Détecté',
                    category: 'E-commerce',
                    confidence: 90,
                    source: 'global'
                });
            }

            // PrestaShop
            if (window.prestashop) {
                this.addTechnology({
                    name: 'PrestaShop',
                    version: 'Détecté',
                    category: 'E-commerce',
                    confidence: 100,
                    source: 'global'
                });
            }
        }

        addTechnology(tech) {
            // Éviter les doublons
            const exists = this.detectedTechnologies.find(t => 
                t.name === tech.name && t.category === tech.category
            );
            
            if (!exists) {
                this.detectedTechnologies.push(tech);
            }
        }

        // Méthodes utilitaires pour analyser plus en profondeur
        analyzeGlobalVariables() {
            const globalVars = [];
            const commonTechVars = [
                'React', 'Vue', 'angular', 'ng', 'jQuery', '$', 'Backbone', 'Ember',
                'moment', 'd3', 'THREE', 'Chart', 'gtag', 'ga', 'fbq', 'hj',
                'mixpanel', 'Shopify', 'wp', 'Drupal', 'Joomla'
            ];

            commonTechVars.forEach(varName => {
                if (window[varName] !== undefined) {
                    globalVars.push({
                        name: varName,
                        type: typeof window[varName],
                        hasVersion: !!(window[varName]?.version || window[varName]?.VERSION)
                    });
                }
            });

            return globalVars;
        }

        analyzeScriptTags() {
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            const technologies = [];

            const patterns = {
                'React': /react/i,
                'Vue.js': /vue/i,
                'Angular': /angular/i,
                'jQuery': /jquery/i,
                'Bootstrap': /bootstrap/i,
                'Tailwind': /tailwind/i,
                'Google Analytics': /google-analytics|googletagmanager/i,
                'Facebook': /facebook\.net|connect\.facebook/i
            };

            scripts.forEach(script => {
                const src = script.src;
                Object.entries(patterns).forEach(([tech, pattern]) => {
                    if (pattern.test(src)) {
                        technologies.push({
                            name: tech,
                            source: 'script',
                            url: src
                        });
                    }
                });
            });

            return technologies;
        }

        getDetectionReport() {
            return {
                technologies: this.detectedTechnologies,
                globalVariables: this.analyzeGlobalVariables(),
                scriptAnalysis: this.analyzeScriptTags(),
                timestamp: Date.now(),
                url: window.location.href
            };
        }
    }

    // Initialiser le détecteur
    const detector = new TechPeekDetector();

    // Exposer une méthode pour obtenir le rapport complet
    window.__TECHPEEK_GET_REPORT__ = () => detector.getDetectionReport();

})(); 