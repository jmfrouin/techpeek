// TechPeek Popup Script
class TechPeekPopup {
    constructor() {
        this.currentTab = null;
        this.analysisData = null;
        this.init();
    }

    async init() {
        // Obtenir l'onglet actuel
        this.currentTab = await this.getCurrentTab();
        
        // Afficher l'URL
        this.displayCurrentUrl();
        
        // Charger l'analyse
        await this.loadAnalysis();
        
        // Configurer les événements
        this.setupEventListeners();
    }

    async getCurrentTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    displayCurrentUrl() {
        const urlElement = document.getElementById('current-url');
        if (this.currentTab) {
            const url = new URL(this.currentTab.url);
            urlElement.textContent = url.hostname;
        }
    }

    async loadAnalysis() {
        try {
            // Envoyer un message au content script pour obtenir l'analyse
            const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                action: 'getAnalysis'
            });
            
            if (response) {
                this.analysisData = response;
                this.displayResults();
            } else {
                this.showError('Impossible d\'analyser cette page');
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'analyse:', error);
            this.showError('Erreur lors de l\'analyse de la page');
        }
    }

    displayResults() {
        // Masquer le loading et afficher les résultats
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';

        // Afficher chaque section
        this.displayFrameworks();
        this.displaySecurity();
        this.displayCDN();
        this.displayAnalytics();
        this.displayPerformance();
        this.displayMisc();
    }

    displayFrameworks() {
        const container = document.getElementById('js-frameworks');
        
        if (this.analysisData.frameworks.length === 0) {
            container.innerHTML = '<div class="no-data">Aucun framework détecté</div>';
            return;
        }

        container.innerHTML = '';
        this.analysisData.frameworks.forEach(framework => {
            const item = this.createTechItem(framework);
            container.appendChild(item);
        });
    }

    displaySecurity() {
        const container = document.getElementById('security-info');
        const security = this.analysisData.security;
        
        container.innerHTML = '';

        // HTTPS
        const httpsItem = this.createSecurityItem(
            'HTTPS',
            security.https.enabled ? 'Activé' : 'Désactivé',
            security.https.status
        );
        container.appendChild(httpsItem);

        // HSTS
        const hstsItem = this.createSecurityItem(
            'HSTS',
            security.hsts.enabled ? 'Activé' : 'Non détecté',
            security.hsts.status
        );
        container.appendChild(hstsItem);

        // Mixed Content
        const mixedContentItem = this.createSecurityItem(
            'Mixed Content',
            security.mixedContent.detected ? 
                `${security.mixedContent.count} ressource(s) non sécurisée(s)` : 
                'Aucun contenu mixte',
            security.mixedContent.status
        );
        container.appendChild(mixedContentItem);

        // CSP
        const cspItem = this.createSecurityItem(
            'Content Security Policy',
            security.csp.enabled ? 'Configuré' : 'Non configuré',
            security.csp.status
        );
        container.appendChild(cspItem);
    }

    displayCDN() {
        const container = document.getElementById('cdn-info');
        
        if (this.analysisData.cdn.length === 0) {
            container.innerHTML = '<div class="no-data">Aucun CDN détecté</div>';
            return;
        }

        container.innerHTML = '';
        this.analysisData.cdn.forEach(cdn => {
            const item = this.createCDNItem(cdn);
            container.appendChild(item);
        });
    }

    displayAnalytics() {
        const container = document.getElementById('data-platforms');
        
        if (this.analysisData.analytics.length === 0) {
            container.innerHTML = '<div class="no-data">Aucune plateforme détectée</div>';
            return;
        }

        container.innerHTML = '';
        this.analysisData.analytics.forEach(platform => {
            const item = this.createAnalyticsItem(platform);
            container.appendChild(item);
        });
    }

    displayPerformance() {
        const container = document.getElementById('performance-info');
        const perf = this.analysisData.performance;
        
        container.innerHTML = '';

        if (perf.loadTime) {
            const loadTimeItem = this.createPerformanceItem(
                'Temps de chargement',
                `${Math.round(perf.loadTime)}ms`
            );
            container.appendChild(loadTimeItem);
        }

        if (perf.domReady) {
            const domReadyItem = this.createPerformanceItem(
                'DOM Ready',
                `${Math.round(perf.domReady)}ms`
            );
            container.appendChild(domReadyItem);
        }

        if (perf.resourceCount) {
            const resourceItem = this.createPerformanceItem(
                'Ressources chargées',
                perf.resourceCount.toString()
            );
            container.appendChild(resourceItem);
        }

        if (perf.scripts !== undefined) {
            const scriptsItem = this.createPerformanceItem(
                'Scripts JS',
                perf.scripts.toString()
            );
            container.appendChild(scriptsItem);
        }

        if (perf.lazyLoading !== undefined) {
            const lazyItem = this.createPerformanceItem(
                'Lazy Loading',
                perf.lazyLoading ? 'Détecté' : 'Non détecté'
            );
            container.appendChild(lazyItem);
        }
    }

    displayMisc() {
        const container = document.getElementById('misc-info');
        const misc = this.analysisData.misc;
        
        container.innerHTML = '';

        // HTTP Version
        const httpItem = this.createMiscItem('Version HTTP', misc.httpVersion);
        container.appendChild(httpItem);

        // Viewport
        const viewportItem = this.createMiscItem(
            'Viewport Meta',
            misc.viewport ? 'Présent' : 'Absent'
        );
        container.appendChild(viewportItem);

        // Service Worker
        const swItem = this.createMiscItem(
            'Service Worker',
            misc.serviceWorker ? 'Supporté' : 'Non supporté'
        );
        container.appendChild(swItem);

        // PWA
        const pwaItem = this.createMiscItem(
            'PWA',
            misc.pwa ? 'Détecté' : 'Non détecté'
        );
        container.appendChild(pwaItem);

        // Language
        const langItem = this.createMiscItem('Langue', misc.language);
        container.appendChild(langItem);

        // Charset
        const charsetItem = this.createMiscItem('Encodage', misc.charset);
        container.appendChild(charsetItem);

        // Generator
        if (misc.generator) {
            const generatorItem = this.createMiscItem('Générateur', misc.generator);
            container.appendChild(generatorItem);
        }
    }

    createTechItem(tech) {
        const item = document.createElement('div');
        item.className = 'tech-item';
        
        item.innerHTML = `
            <img src="${tech.icon}" alt="${tech.name}" class="tech-icon" onerror="this.style.display='none'">
            <div class="tech-info">
                <div class="tech-name">${tech.name}</div>
                <div class="tech-version">${tech.version}</div>
                <div class="tech-description">${tech.description}</div>
            </div>
        `;
        
        return item;
    }

    createSecurityItem(label, value, status) {
        const item = document.createElement('div');
        item.className = `security-item ${status}`;
        
        item.innerHTML = `
            <span class="security-label">${label}</span>
            <span class="security-status ${status}">${value}</span>
        `;
        
        return item;
    }

    createCDNItem(cdn) {
        const item = document.createElement('div');
        item.className = 'tech-item';
        
        item.innerHTML = `
            <div class="tech-info">
                <div class="tech-name">${cdn.name}</div>
                <div class="tech-description">CDN détecté</div>
            </div>
        `;
        
        return item;
    }

    createAnalyticsItem(platform) {
        const item = document.createElement('div');
        item.className = 'tech-item';
        
        item.innerHTML = `
            <div class="tech-info">
                <div class="tech-name">${platform.name}</div>
                <div class="tech-description">${platform.type}</div>
            </div>
        `;
        
        return item;
    }

    createPerformanceItem(label, value) {
        const item = document.createElement('div');
        item.className = 'performance-item';
        
        item.innerHTML = `
            <span class="performance-label">${label}</span>
            <span class="performance-value">${value}</span>
        `;
        
        return item;
    }

    createMiscItem(label, value) {
        const item = document.createElement('div');
        item.className = 'misc-item';
        
        item.innerHTML = `
            <span class="misc-label">${label}</span>
            <span class="misc-value">${value}</span>
        `;
        
        return item;
    }

    setupEventListeners() {
        // Bouton de rafraîchissement
        document.getElementById('refresh-btn').addEventListener('click', async () => {
            document.getElementById('loading').style.display = 'flex';
            document.getElementById('results').style.display = 'none';
            
            try {
                const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                    action: 'refreshAnalysis'
                });
                
                if (response) {
                    this.analysisData = response;
                    this.displayResults();
                }
            } catch (error) {
                console.error('Erreur lors du rafraîchissement:', error);
                this.showError('Erreur lors du rafraîchissement');
            }
        });

        // Export JSON
        document.getElementById('export-json').addEventListener('click', () => {
            this.exportData('json');
        });

        // Export CSV
        document.getElementById('export-csv').addEventListener('click', () => {
            this.exportData('csv');
        });
    }

    exportData(format) {
        if (!this.analysisData) return;

        let content, filename, mimeType;

        if (format === 'json') {
            content = JSON.stringify(this.analysisData, null, 2);
            filename = `techpeek-${this.analysisData.domain}-${Date.now()}.json`;
            mimeType = 'application/json';
        } else if (format === 'csv') {
            content = this.convertToCSV();
            filename = `techpeek-${this.analysisData.domain}-${Date.now()}.csv`;
            mimeType = 'text/csv';
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    convertToCSV() {
        const rows = [];
        rows.push(['Catégorie', 'Nom', 'Valeur', 'Description']);

        // Frameworks
        this.analysisData.frameworks.forEach(fw => {
            rows.push(['Framework', fw.name, fw.version, fw.description]);
        });

        // CDN
        this.analysisData.cdn.forEach(cdn => {
            rows.push(['CDN', cdn.name, 'Détecté', '']);
        });

        // Analytics
        this.analysisData.analytics.forEach(analytics => {
            rows.push(['Analytics', analytics.name, analytics.type, '']);
        });

        return rows.map(row => 
            row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    }

    showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #ef4444;">
                <p>${message}</p>
            </div>
        `;
        document.getElementById('results').style.display = 'block';
    }
}

// Initialiser la popup quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new TechPeekPopup();
}); 