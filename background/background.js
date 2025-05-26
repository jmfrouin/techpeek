// TechPeek Background Service Worker
class TechPeekBackground {
    constructor() {
        this.networkData = new Map();
        this.init();
    }

    init() {
        // Écouter les requêtes réseau
        this.setupNetworkListeners();
        
        // Écouter les messages des autres scripts
        this.setupMessageListeners();
        
        // Nettoyer les données anciennes périodiquement
        this.setupCleanup();
    }

    setupNetworkListeners() {
        // Écouter les headers de réponse
        chrome.webRequest.onHeadersReceived.addListener(
            (details) => {
                this.analyzeResponseHeaders(details);
            },
            { urls: ["<all_urls>"] },
            ["responseHeaders"]
        );

        // Écouter les requêtes pour analyser les technologies
        chrome.webRequest.onBeforeRequest.addListener(
            (details) => {
                this.analyzeRequest(details);
            },
            { urls: ["<all_urls>"] },
            ["requestBody"]
        );
    }

    setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getNetworkData') {
                const tabId = sender.tab?.id || request.tabId;
                const data = this.networkData.get(tabId) || {};
                sendResponse(data);
            }
        });
    }

    setupCleanup() {
        // Nettoyer les données toutes les 5 minutes
        setInterval(() => {
            this.cleanupOldData();
        }, 5 * 60 * 1000);
    }

    analyzeResponseHeaders(details) {
        const tabId = details.tabId;
        if (tabId === -1) return; // Ignorer les requêtes en arrière-plan

        if (!this.networkData.has(tabId)) {
            this.networkData.set(tabId, {
                headers: {},
                security: {},
                server: {},
                performance: {},
                timestamp: Date.now()
            });
        }

        const data = this.networkData.get(tabId);
        const headers = this.parseHeaders(details.responseHeaders);

        // Analyser les headers de sécurité
        this.analyzeSecurityHeaders(headers, data);
        
        // Analyser les informations du serveur
        this.analyzeServerInfo(headers, data);
        
        // Analyser les performances
        this.analyzePerformanceHeaders(headers, data);

        // Stocker les headers bruts pour la requête principale
        if (details.type === 'main_frame') {
            data.headers = headers;
            data.url = details.url;
            data.httpVersion = this.detectHttpVersion(details);
        }
    }

    analyzeRequest(details) {
        const tabId = details.tabId;
        if (tabId === -1) return;

        // Analyser les CDN et services tiers
        this.analyzeCDNFromUrl(details.url, tabId);
        
        // Analyser les technologies basées sur les URLs
        this.analyzeTechFromUrl(details.url, tabId);
    }

    parseHeaders(responseHeaders) {
        const headers = {};
        if (responseHeaders) {
            responseHeaders.forEach(header => {
                headers[header.name.toLowerCase()] = header.value;
            });
        }
        return headers;
    }

    analyzeSecurityHeaders(headers, data) {
        // HSTS
        data.security.hsts = {
            enabled: !!headers['strict-transport-security'],
            value: headers['strict-transport-security'] || null,
            status: headers['strict-transport-security'] ? 'secure' : 'warning'
        };

        // CSP
        data.security.csp = {
            enabled: !!(headers['content-security-policy'] || headers['content-security-policy-report-only']),
            value: headers['content-security-policy'] || headers['content-security-policy-report-only'] || null,
            status: (headers['content-security-policy'] || headers['content-security-policy-report-only']) ? 'secure' : 'warning'
        };

        // X-Frame-Options
        data.security.xFrameOptions = {
            enabled: !!headers['x-frame-options'],
            value: headers['x-frame-options'] || null,
            status: headers['x-frame-options'] ? 'secure' : 'warning'
        };

        // X-Content-Type-Options
        data.security.xContentTypeOptions = {
            enabled: !!headers['x-content-type-options'],
            value: headers['x-content-type-options'] || null,
            status: headers['x-content-type-options'] ? 'secure' : 'warning'
        };

        // X-XSS-Protection
        data.security.xXssProtection = {
            enabled: !!headers['x-xss-protection'],
            value: headers['x-xss-protection'] || null,
            status: headers['x-xss-protection'] ? 'secure' : 'warning'
        };

        // Referrer Policy
        data.security.referrerPolicy = {
            enabled: !!headers['referrer-policy'],
            value: headers['referrer-policy'] || null,
            status: headers['referrer-policy'] ? 'secure' : 'warning'
        };

        // Permissions Policy
        data.security.permissionsPolicy = {
            enabled: !!headers['permissions-policy'],
            value: headers['permissions-policy'] || null,
            status: headers['permissions-policy'] ? 'secure' : 'warning'
        };
    }

    analyzeServerInfo(headers, data) {
        // Serveur web
        if (headers['server']) {
            data.server.name = this.parseServerName(headers['server']);
            data.server.version = this.parseServerVersion(headers['server']);
            data.server.fullHeader = headers['server'];
        }

        // Powered by
        if (headers['x-powered-by']) {
            data.server.poweredBy = headers['x-powered-by'];
            data.server.technology = this.parsePoweredBy(headers['x-powered-by']);
        }

        // CDN Detection from headers
        this.detectCDNFromHeaders(headers, data);
    }

    analyzePerformanceHeaders(headers, data) {
        // Cache Control
        if (headers['cache-control']) {
            data.performance.cacheControl = headers['cache-control'];
        }

        // ETag
        if (headers['etag']) {
            data.performance.etag = headers['etag'];
        }

        // Last Modified
        if (headers['last-modified']) {
            data.performance.lastModified = headers['last-modified'];
        }

        // Compression
        if (headers['content-encoding']) {
            data.performance.compression = headers['content-encoding'];
        }

        // Content Length
        if (headers['content-length']) {
            data.performance.contentLength = parseInt(headers['content-length']);
        }
    }

    parseServerName(serverHeader) {
        const match = serverHeader.match(/^([^\/\s]+)/);
        return match ? match[1] : serverHeader;
    }

    parseServerVersion(serverHeader) {
        const match = serverHeader.match(/([^\/\s]+)\/([^\s]+)/);
        return match ? match[2] : null;
    }

    parsePoweredBy(poweredByHeader) {
        // Détecter les technologies communes
        const technologies = {
            'ASP.NET': /ASP\.NET/i,
            'PHP': /PHP/i,
            'Express': /Express/i,
            'Next.js': /Next\.js/i,
            'Nuxt': /Nuxt/i
        };

        for (const [tech, pattern] of Object.entries(technologies)) {
            if (pattern.test(poweredByHeader)) {
                return tech;
            }
        }

        return poweredByHeader;
    }

    detectCDNFromHeaders(headers, data) {
        const cdnHeaders = {
            'Cloudflare': ['cf-ray', 'cf-cache-status', 'server'],
            'AWS CloudFront': ['x-amz-cf-id', 'x-amz-cf-pop'],
            'Fastly': ['fastly-debug-digest', 'x-served-by'],
            'KeyCDN': ['x-edge-location'],
            'MaxCDN': ['x-maxcdn-pop'],
            'Akamai': ['x-akamai-transformed']
        };

        if (!data.cdn) data.cdn = [];

        Object.entries(cdnHeaders).forEach(([cdnName, headerNames]) => {
            const detected = headerNames.some(headerName => {
                if (headerName === 'server' && cdnName === 'Cloudflare') {
                    return headers['server']?.includes('cloudflare');
                }
                return headers[headerName];
            });

            if (detected && !data.cdn.find(cdn => cdn.name === cdnName)) {
                data.cdn.push({
                    name: cdnName,
                    detected: true,
                    source: 'headers'
                });
            }
        });
    }

    analyzeCDNFromUrl(url, tabId) {
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

        if (!this.networkData.has(tabId)) {
            this.networkData.set(tabId, { cdn: [], timestamp: Date.now() });
        }

        const data = this.networkData.get(tabId);
        if (!data.cdn) data.cdn = [];

        Object.entries(cdnPatterns).forEach(([name, pattern]) => {
            if (pattern.test(url) && !data.cdn.find(cdn => cdn.name === name)) {
                data.cdn.push({
                    name,
                    detected: true,
                    source: 'url',
                    url: url
                });
            }
        });
    }

    analyzeTechFromUrl(url, tabId) {
        // Analyser les technologies basées sur les URLs des ressources
        const techPatterns = {
            'React': /react/i,
            'Vue.js': /vue/i,
            'Angular': /angular/i,
            'jQuery': /jquery/i,
            'Bootstrap': /bootstrap/i,
            'Tailwind': /tailwind/i
        };

        if (!this.networkData.has(tabId)) {
            this.networkData.set(tabId, { technologies: [], timestamp: Date.now() });
        }

        const data = this.networkData.get(tabId);
        if (!data.technologies) data.technologies = [];

        Object.entries(techPatterns).forEach(([name, pattern]) => {
            if (pattern.test(url) && !data.technologies.find(tech => tech.name === name)) {
                data.technologies.push({
                    name,
                    detected: true,
                    source: 'url'
                });
            }
        });
    }

    detectHttpVersion(details) {
        // Essayer de détecter la version HTTP
        // Note: Cette information n'est pas toujours disponible dans webRequest
        if (details.responseHeaders) {
            const statusLine = details.statusLine;
            if (statusLine) {
                if (statusLine.includes('HTTP/2')) return 'HTTP/2';
                if (statusLine.includes('HTTP/3')) return 'HTTP/3';
                if (statusLine.includes('HTTP/1.1')) return 'HTTP/1.1';
                if (statusLine.includes('HTTP/1.0')) return 'HTTP/1.0';
            }
        }
        return 'HTTP/1.1'; // Par défaut
    }

    cleanupOldData() {
        const now = Date.now();
        const maxAge = 30 * 60 * 1000; // 30 minutes

        for (const [tabId, data] of this.networkData.entries()) {
            if (now - data.timestamp > maxAge) {
                this.networkData.delete(tabId);
            }
        }
    }
}

// Initialiser le service worker
new TechPeekBackground(); 