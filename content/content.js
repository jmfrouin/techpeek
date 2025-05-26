// TechPeek Content Script - Analyse des technologies web
class TechPeekAnalyzer {
    constructor() {
        this.results = {
            url: window.location.href,
            domain: window.location.hostname,
            timestamp: new Date().toISOString(),
            frameworks: [],
            security: {},
            cdn: [],
            analytics: [],
            performance: {},
            misc: {}
        };
        
        this.init();
    }

    init() {
        // Injecter le script de détection dans la page
        this.injectDetectorScript();
        
        // Analyser immédiatement
        this.analyzeFrameworks();
        this.analyzeSecurity();
        this.analyzeCDN();
        this.analyzeAnalytics();
        this.analyzePerformance();
        this.analyzeMisc();
        
        // Récupérer les données réseau du background script
        this.getNetworkData();
        
        // Écouter les messages de la popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getAnalysis') {
                sendResponse(this.results);
            } else if (request.action === 'refreshAnalysis') {
                this.refreshAnalysis();
                sendResponse(this.results);
            }
        });
    }

    injectDetectorScript() {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected/detector.js');
        script.onload = () => {
            script.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    }

    analyzeFrameworks() {
        const frameworks = [];

        // React
        if (window.React || document.querySelector('[data-reactroot]') || 
            document.querySelector('script[src*="react"]')) {
            frameworks.push({
                name: 'React',
                version: window.React?.version || 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                description: 'Bibliothèque JavaScript pour interfaces utilisateur'
            });
        }

        // Vue.js
        if (window.Vue || document.querySelector('[data-v-]') ||
            document.querySelector('script[src*="vue"]')) {
            frameworks.push({
                name: 'Vue.js',
                version: window.Vue?.version || 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
                description: 'Framework JavaScript progressif'
            });
        }

        // Angular
        if (window.ng || document.querySelector('[ng-app]') || 
            document.querySelector('script[src*="angular"]')) {
            frameworks.push({
                name: 'Angular',
                version: window.ng?.version?.full || 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
                description: 'Framework web TypeScript'
            });
        }

        // jQuery
        if (window.jQuery || window.$) {
            frameworks.push({
                name: 'jQuery',
                version: window.jQuery?.fn?.jquery || 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
                description: 'Bibliothèque JavaScript rapide et légère'
            });
        }

        // Bootstrap
        if (document.querySelector('link[href*="bootstrap"]') || 
            document.querySelector('.container, .row, .col-')) {
            frameworks.push({
                name: 'Bootstrap',
                version: 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
                description: 'Framework CSS responsive'
            });
        }

        // Tailwind CSS
        if (document.querySelector('script[src*="tailwind"]') ||
            document.querySelector('[class*="tw-"]') ||
            document.querySelector('[class*="bg-"]')) {
            frameworks.push({
                name: 'Tailwind CSS',
                version: 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
                description: 'Framework CSS utility-first'
            });
        }

        // Next.js
        if (window.__NEXT_DATA__ || document.querySelector('script[src*="next"]')) {
            frameworks.push({
                name: 'Next.js',
                version: 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
                description: 'Framework React pour production'
            });
        }

        // Nuxt.js
        if (window.__NUXT__ || document.querySelector('script[src*="nuxt"]')) {
            frameworks.push({
                name: 'Nuxt.js',
                version: 'Détecté',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
                description: 'Framework Vue.js universel'
            });
        }

        this.results.frameworks = frameworks;
    }

    analyzeSecurity() {
        const security = {};

        // HTTPS
        security.https = {
            enabled: window.location.protocol === 'https:',
            status: window.location.protocol === 'https:' ? 'secure' : 'danger'
        };

        // HSTS (sera complété par l'analyse des headers)
        security.hsts = {
            enabled: false,
            status: 'unknown'
        };

        // Mixed Content
        const mixedContent = this.detectMixedContent();
        security.mixedContent = {
            detected: mixedContent.length > 0,
            count: mixedContent.length,
            status: mixedContent.length > 0 ? 'warning' : 'secure'
        };

        // CSP
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        security.csp = {
            enabled: !!cspMeta,
            status: cspMeta ? 'secure' : 'warning'
        };

        // Cookies sécurisés
        const cookies = document.cookie.split(';');
        security.secureCookies = {
            total: cookies.length,
            status: 'unknown'
        };

        this.results.security = security;
    }

    detectMixedContent() {
        const mixedContent = [];
        const httpResources = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
        
        httpResources.forEach(resource => {
            mixedContent.push({
                type: resource.tagName.toLowerCase(),
                url: resource.src || resource.href
            });
        });

        return mixedContent;
    }

    analyzeCDN() {
        const cdnProviders = [];
        const scripts = document.querySelectorAll('script[src], link[href]');

        const cdnPatterns = {
            'Cloudflare': /cloudflare|cdnjs\.cloudflare\.com/i,
            'AWS CloudFront': /cloudfront\.net/i,
            'Google CDN': /googleapis\.com|gstatic\.com/i,
            'jsDelivr': /jsdelivr\.net/i,
            'unpkg': /unpkg\.com/i,
            'Fastly': /fastly\.com/i,
            'KeyCDN': /keycdn\.com/i,
            'MaxCDN': /maxcdn\.com/i,
            'Akamai': /akamai/i
        };

        scripts.forEach(element => {
            const url = element.src || element.href;
            if (url) {
                Object.entries(cdnPatterns).forEach(([name, pattern]) => {
                    if (pattern.test(url) && !cdnProviders.find(cdn => cdn.name === name)) {
                        cdnProviders.push({
                            name,
                            detected: true,
                            url: url
                        });
                    }
                });
            }
        });

        this.results.cdn = cdnProviders;
    }

    analyzeAnalytics() {
        const analytics = [];

        // Google Analytics
        if (window.gtag || window.ga || document.querySelector('script[src*="google-analytics"]') ||
            document.querySelector('script[src*="googletagmanager"]')) {
            analytics.push({
                name: 'Google Analytics',
                type: 'Analytics',
                detected: true
            });
        }

        // Facebook Pixel
        if (window.fbq || document.querySelector('script[src*="facebook.net"]')) {
            analytics.push({
                name: 'Facebook Pixel',
                type: 'Tracking',
                detected: true
            });
        }

        // Hotjar
        if (window.hj || document.querySelector('script[src*="hotjar"]')) {
            analytics.push({
                name: 'Hotjar',
                type: 'Heatmap',
                detected: true
            });
        }

        // Mixpanel
        if (window.mixpanel || document.querySelector('script[src*="mixpanel"]')) {
            analytics.push({
                name: 'Mixpanel',
                type: 'Analytics',
                detected: true
            });
        }

        this.results.analytics = analytics;
    }

    analyzePerformance() {
        const performance = {};

        // Navigation Timing
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            performance.loadTime = timing.loadEventEnd - timing.navigationStart;
            performance.domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            performance.firstByte = timing.responseStart - timing.navigationStart;
        }

        // Resource Timing
        if (window.performance && window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            performance.resourceCount = resources.length;
            
            const scripts = resources.filter(r => r.name.includes('.js'));
            const styles = resources.filter(r => r.name.includes('.css'));
            const images = resources.filter(r => /\.(jpg|jpeg|png|gif|webp|svg)/.test(r.name));
            
            performance.scripts = scripts.length;
            performance.styles = styles.length;
            performance.images = images.length;
        }

        // Lazy Loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        performance.lazyLoading = lazyImages.length > 0;

        this.results.performance = performance;
    }

    analyzeMisc() {
        const misc = {};

        // HTTP Version (sera complété par l'analyse réseau)
        misc.httpVersion = 'HTTP/1.1'; // Par défaut

        // Viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        misc.viewport = !!viewport;

        // Service Worker
        misc.serviceWorker = 'serviceWorker' in navigator;

        // PWA
        const manifest = document.querySelector('link[rel="manifest"]');
        misc.pwa = !!manifest;

        // AMP
        misc.amp = document.documentElement.hasAttribute('amp') || 
                   document.documentElement.hasAttribute('⚡');

        // Language
        misc.language = document.documentElement.lang || 'Non spécifié';

        // Charset
        const charset = document.querySelector('meta[charset]');
        misc.charset = charset ? charset.getAttribute('charset') : 'Non spécifié';

        // Generator
        const generator = document.querySelector('meta[name="generator"]');
        misc.generator = generator ? generator.getAttribute('content') : null;

        this.results.misc = misc;
    }

    refreshAnalysis() {
        // Réinitialiser les résultats
        this.results = {
            url: window.location.href,
            domain: window.location.hostname,
            timestamp: new Date().toISOString(),
            frameworks: [],
            security: {},
            cdn: [],
            analytics: [],
            performance: {},
            misc: {}
        };

        // Relancer toutes les analyses
        this.analyzeFrameworks();
        this.analyzeSecurity();
        this.analyzeCDN();
        this.analyzeAnalytics();
        this.analyzePerformance();
        this.analyzeMisc();
    }
}

// Initialiser l'analyseur quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TechPeekAnalyzer();
    });
} else {
    new TechPeekAnalyzer();
} 