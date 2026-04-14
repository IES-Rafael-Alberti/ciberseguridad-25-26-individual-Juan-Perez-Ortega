/* ============================================
   GENGAR OS - SECURITY LAB
   Main Application Script
   ============================================ */

// ============================================
// 14. ARCHIVE DATABASE (JSON DB)
// ============================================
const ARCHIVE_DB = [
    // === BASTIONADO DE REDES Y SISTEMAS ===
    {
        id: 1,
        title: "Proyecto 04",
        subject: "Bastionado de Redes y Sistemas",
        shortSubject: "Bastionado",
        tags: ["hardening", "seguridad", "sistemas"],
        difficulty: "Easy",
        type: "pdf",
        content: "Bastionado de Redes y Sistemas/Proyecto04/Proyecto04.pdf",
        image: "Bastionado de Redes y Sistemas/Proyecto04/Proyecto04.png",
        description: "Fundamentos de bastionado de sistemas"
    },
    {
        id: 2,
        title: "Proyecto 05 - Nginx & Wireshark",
        subject: "Bastionado de Redes y Sistemas",
        shortSubject: "Bastionado",
        tags: ["nginx", "wireshark", "tráfico"],
        difficulty: "Medium",
        type: "images",
        content: "",
        image: "Bastionado de Redes y Sistemas/Proyecto05/img/200nginx.png",
        description: "Configuración segura de Nginx y análisis con Wireshark"
    },
    {
        id: 3,
        title: "Proyecto 06 - Monitoreo de Red",
        subject: "Bastionado de Redes y Sistemas",
        shortSubject: "Bastionado",
        tags: ["zabbix", "prometheus", "grafana", "monitoreo"],
        difficulty: "Medium",
        type: "pdf",
        content: "Bastionado de Redes y Sistemas/Proyecto6/MonitoreoDeRed.pdf",
        image: "Bastionado de Redes y Sistemas/Proyecto6/img/Dashboard.png",
        description: "Implementación de sistemas de monitoreo de red"
    },
    {
        id: 4,
        title: "Proyecto 07 - Bacula & Baculum",
        subject: "Bastionado de Redes y Sistemas",
        shortSubject: "Bastionado",
        tags: ["bacula", "baculum", "backup", "recuperación"],
        difficulty: "Hard",
        type: "pdf",
        content: "Bastionado de Redes y Sistemas/Proyecto07/BaculaBaculum.pdf",
        image: "Bastionado de Redes y Sistemas/Proyecto07/img/F1-1.png",
        description: "Sistema de copias de seguridad con Bacula y Baculum"
    },
    {
        id: 5,
        title: "Proyecto 08 - Seguridad Inalámbrica",
        subject: "Bastionado de Redes y Sistemas",
        shortSubject: "Bastionado",
        tags: ["wifi", "WPA", "router", "firewall", "wireless"],
        difficulty: "Medium",
        type: "md",
        content: "Bastionado de Redes y Sistemas/Proyecto08/Seguridad en conexiones invisibles.md",
        image: "Bastionado de Redes y Sistemas/Proyecto08/img/Paso00-DashboardPrincipal.png",
        description: "Seguridad en conexiones inalámbricas"
    },

    // === INCIDENTES EN CIBERSEGURIDAD ===
    {
        id: 6,
        title: "SIEM - Elasticsearch",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["SIEM", "elasticsearch", "kibana", "logs"],
        difficulty: "Hard",
        type: "pdf",
        content: "Incidentes en CIberseguridad/JPO2b02.pdf",
        image: "Incidentes en CIberseguridad/imagenesSIEM/Elasticsearch.png",
        description: "Implementación de SIEM con Elasticsearch"
    },
    {
        id: 7,
        title: "Reflexión y Resumen - Incidentes",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["reflexión", "resumen", "análisis"],
        difficulty: "Easy",
        type: "md",
        content: "Incidentes en CIberseguridad/2526-u2-2-5-reflexionyresumen-Juan-Perez-Ortega/RESPUESTAS.md",
        image: "Incidentes en CIberseguridad/imagenesSIEM/Kibana.png",
        description: "Reflexión sobre gestión de incidentes"
    },
    {
        id: 8,
        title: "Recopilación y Análisis de Evidencias",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["evidencias", "análisis", "recopilación", "forense"],
        difficulty: "Medium",
        type: "md",
        content: "Incidentes en CIberseguridad/2526-u3-3-1-recopilaalmacenaanalisis-grupo-4_2526/README.md",
        image: "Incidentes en CIberseguridad/imagenesSIEM/KibanaAlertaAtaque.png",
        description: "Técnicas de recopilación y análisis de evidencias digitales"
    },
    {
        id: 9,
        title: "MITRE ATT&CK - Caso Práctico",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["MITRE", "ATT&CK", "TTPs", "matriz", "amenazas"],
        difficulty: "Hard",
        type: "md",
        content: "Incidentes en CIberseguridad/2526-u3-3-2-mitrematriz-grupo-4_2526/casopractico.md",
        image: "Incidentes en CIberseguridad/imagenesSIEM/Elasticsearch.png",
        description: "Aplicación práctica del framework MITRE ATT&CK"
    },
    {
        id: 10,
        title: "Investigación Forense - Tienda Online",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["forense", "investigación", "e-commerce"],
        difficulty: "Medium",
        type: "md",
        content: "Incidentes en CIberseguridad/2526-u3-3-3-3-investigaciontienda-Juan-Perez-Ortega/README.md",
        image: "Incidentes en CIberseguridad/imagenesSIEM/Kibana.png",
        description: "Investigación forense de incidente en tienda online"
    },
    {
        id: 11,
        title: "Análisis de Logs & Mimikatz",
        subject: "Incidentes en Ciberseguridad",
        shortSubject: "Incidentes",
        tags: ["logs", "mimikatz", "forense", "Windows", "credenciales"],
        difficulty: "Hard",
        type: "md",
        content: "Incidentes en CIberseguridad/2526-u3-3-3-4-logsmimi-Juan-Perez-Ortega/informe.md",
        image: "Incidentes en CIberseguridad/imagenesSIEM/KibanaAlertaAtaque.png",
        description: "Análisis forense de logs y detección de Mimikatz"
    },

    // === NORMATIVA EN CIBERSEGURIDAD ===
    {
        id: 12,
        title: "UD0 - Fundamentos Jurídicos",
        subject: "Normativa en Ciberseguridad",
        shortSubject: "Normativa",
        tags: ["jurídico", "LOPD", "RGPD", "legislación"],
        difficulty: "Easy",
        type: "pdf",
        content: "Normativa en Ciberseguridad/UD0/Actividades_Juridicas_Resueltas.pdf",
        image: "Imagenes/gengar.webp",
        description: "Fundamentos jurídicos de la seguridad informática"
    },
    {
        id: 13,
        title: "UD1 - PEC1 Seguridad",
        subject: "Normativa en Ciberseguridad",
        shortSubject: "Normativa",
        tags: ["PEC", "evaluación", "normativa"],
        difficulty: "Medium",
        type: "pdf",
        content: "Normativa en Ciberseguridad/UD1/PEC1.UD1.pdf",
        image: "Imagenes/gengar.webp",
        description: "Prueba de evaluación continua sobre normativa"
    },
    {
        id: 14,
        title: "UD3 - RAG Normativa",
        subject: "Normativa en Ciberseguridad",
        shortSubject: "Normativa",
        tags: ["RAG", "IA", "normativa", "regulación"],
        difficulty: "Hard",
        type: "pdf",
        content: "Normativa en Ciberseguridad/UD3/RAGNormativa/RAG_Normativa.pdf",
        image: "Imagenes/gengar.webp",
        description: "Sistema RAG aplicado a normativa de ciberseguridad"
    },
    {
        id: 15,
        title: "UD3 - RAG Propiedad Intelectual",
        subject: "Normativa en Ciberseguridad",
        shortSubject: "Normativa",
        tags: ["RAG", "LPI", "propiedad intelectual"],
        difficulty: "Medium",
        type: "pdf",
        content: "Normativa en Ciberseguridad/UD3/RAG_LPI/RAG_LPI.pdf",
        image: "Imagenes/gengar.webp",
        description: "Sistema RAG para Ley de Propiedad Intelectual"
    },

    // === PUESTA EN PRODUCCIÓN SEGURA ===
    {
        id: 16,
        title: "HextrikeMCP - Pentesting",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["hextrike", "MCP", "pentesting", "herramientas"],
        difficulty: "Hard",
        type: "md",
        content: "Puesta en Produccion Segura/HextrikeMCP/HextrikeMCP.md",
        image: "Puesta en Produccion Segura/HextrikeMCP/img/HextrikeTrabajando.png",
        description: "Framework HextrikeMCP para pentesting automatizado"
    },
    {
        id: 17,
        title: "Infraestructura Web - Docker",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["docker", "web", "infraestructura", "DevOps"],
        difficulty: "Medium",
        type: "md",
        content: "Puesta en Produccion Segura/Infraestructura_Desarrollo_Web/DockerWeb/Ejercicio.md",
        image: "Puesta en Produccion Segura/Infraestructura_Desarrollo_Web/DockerWeb/img/jpo1.jpg",
        description: "Infraestructura de desarrollo web con Docker"
    },
    {
        id: 18,
        title: "Login Seguro - .NET",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["login", "autenticación", ".NET", "C#"],
        difficulty: "Easy",
        type: "md",
        content: "Puesta en Produccion Segura/Login/README.MD",
        image: "Puesta en Produccion Segura/Login/img/AccesoConcedido.png",
        description: "Implementación de login seguro en .NET"
    },
    {
        id: 19,
        title: "OWASP Juice Shop",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["OWASP", "juice shop", "docker", "CTF"],
        difficulty: "Medium",
        type: "md",
        content: "Puesta en Produccion Segura/Poner_en_marcha_Juice_Shop/juiceShop.md",
        image: "Puesta en Produccion Segura/Poner_en_marcha_Juice_Shop/img/PaginaIncioOWASP.png",
        description: "Despliegue y explotación de OWASP Juice Shop"
    },
    {
        id: 20,
        title: "Web API - Docker Server",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["API", "REST", "docker", "servidor"],
        difficulty: "Medium",
        type: "md",
        content: "Puesta en Produccion Segura/Web_API/DockerServer/Ejercicio.md",
        image: "Puesta en Produccion Segura/Web_API/DockerServer/img/ContenedorDocker.jpg",
        description: "Desarrollo de Web API con Docker Server"
    },
    {
        id: 21,
        title: "OWASP Top 10 - Vulnerabilidades",
        subject: "Puesta en Producción Segura",
        shortSubject: "Producción",
        tags: ["OWASP", "XSS", "SQLi", "CSRF", "LFI", "RFI", "RCE", "XXE"],
        difficulty: "Hard",
        type: "md",
        content: "Puesta en Produccion Segura/pps-actividades-owasp-25-26/README.md",
        image: "Puesta en Produccion Segura/Poner_en_marcha_Juice_Shop/img/Xss.png",
        description: "Estudio práctico de OWASP Top 10"
    }
];

const SUBJECTS = [
    { name: "Bastionado de Redes y Sistemas", short: "Bastionado" },
    { name: "Hacking Ético", short: "Hacking" },
    { name: "Incidentes en Ciberseguridad", short: "Incidentes" },
    { name: "Normativa en Ciberseguridad", short: "Normativa" },
    { name: "Puesta en Producción Segura", short: "Producción" }
];

const GENGAR_COMMANDS = [
    "$ sudo rm -rf / ... Just kidding!",
    "$ nmap -sS gengar.pokemon.local",
    "$ hydra -l ash -P rockyou.txt pokemon.gym",
    "$ echo 'Gengar used Shadow Ball!'",
    "$ cat /etc/shadow ... Boo!",
    "$ wireshark -i eth0 -f 'port 666'",
    "$ john --wordlist=rockyou.txt hashes",
    "$ sqlmap -u 'pokemon.com/?id=94'",
    "$ msfconsole -x 'use exploit/gengar'",
    "$ aircrack-ng -w dict.txt capture.cap",
    "$ hashcat -m 0 -a 0 hash.txt rockyou",
    "$ gobuster dir -u http://gengar.lab",
    "$ nikto -h https://target.gengar.lab",
    "$ python3 exploit.py --shadow-punch"
];

const BIOS_LINES = [
    { text: "GengarBIOS(C) 2025 - Phantom Security Inc.", delay: 0 },
    { text: "BIOS v4.20.94 | CPU: Gengar-X7 Shadow Edition @ 4.20GHz", delay: 80 },
    { text: "", delay: 100 },
    { text: "Memory Test: 666666K OK", delay: 200, cls: "bios-ok" },
    { text: "/dev/sda1 [LUKS ENCRYPTED] ....... OK", delay: 150, cls: "bios-ok" },
    { text: "/dev/sdb1 [CLASSIFIED] ........... OK", delay: 150, cls: "bios-ok" },
    { text: "USB Device: 1 Rubber Ducky ........ DETECTED", delay: 120, cls: "bios-warn" },
    { text: "", delay: 80 },
    { text: "Loading kernel 6.6.6-gengar ...... OK", delay: 200, cls: "bios-ok" },
    { text: "Mounting encrypted volumes ....... OK", delay: 180, cls: "bios-ok" },
    { text: "Starting shadow services ......... OK", delay: 160, cls: "bios-ok" },
    { text: "Applying iptables rules .......... OK", delay: 140, cls: "bios-ok" },
    { text: "", delay: 60 },
    { text: "Boot complete. Entering GRUB...", delay: 300, cls: "bios-warn" }
];

// ============================================
// APPLICATION STATE
// ============================================
let state = {
    view: 'grub',       // grub | dashboard | project
    filter: null,        // null = all, or subject name
    project: null,       // current project object
    grubIndex: 0,
    omniIndex: -1
};

// ============================================
// DOM REFERENCES
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DOM = {
    grub: $('#grub-overlay'),
    biosScreen: $('#bios-screen'),
    biosText: $('#bios-text'),
    grubScreen: $('#grub-screen'),
    grubOptions: $('#grub-options'),
    app: $('#app'),
    topbar: $('#topbar'),
    btnRecovery: $('#btn-recovery'),
    breadcrumbs: $('#breadcrumbs'),
    omnibar: $('#omnibar'),
    omniResults: $('#omnibar-results'),
    subjectNav: $('#subject-nav'),
    dashboard: $('#dashboard'),
    cardsGrid: $('#cards-grid'),
    noResults: $('#no-results'),
    projectView: $('#project-view'),
    tocSidebar: $('#toc-sidebar'),
    tocList: $('#toc-list'),
    folio: $('#folio'),
    folioTitle: $('#folio-title'),
    folioBadges: $('#folio-badges'),
    folioClose: $('#folio-close'),
    folioBody: $('#folio-body'),
    sysFooter: $('#sys-footer'),
    archiveCount: $('#archive-count'),
    footerClock: $('#footer-clock'),
    gengarWidget: $('#gengar-widget'),
    gengarBubble: $('#gengar-bubble')
};

// ============================================
// 16. AUDIO ENGINE (Web Audio API)
// ============================================
let audioCtx = null;

function initAudio() {
    if (audioCtx) return;
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new Ctx();
    } catch (e) { /* Audio not supported */ }
}

function playBeep(freq = 440, duration = 0.05, vol = 0.04) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

function playStatic(duration = 0.08, vol = 0.03) {
    if (!audioCtx) return;
    try {
        const bufferSize = Math.floor(audioCtx.sampleRate * duration);
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * vol;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
    } catch (e) {}
}

function playBootSound() {
    if (!audioCtx) return;
    [440, 554, 659, 880].forEach((freq, i) => {
        setTimeout(() => playBeep(freq, 0.08, 0.03), i * 80);
    });
}

// ============================================
// 1. GRUB BOOTLOADER
// ============================================
async function initBios() {
    DOM.biosText.innerHTML = '';
    let totalDelay = 0;

    for (const line of BIOS_LINES) {
        totalDelay += line.delay;
        setTimeout(() => {
            if (line.text === '') {
                DOM.biosText.innerHTML += '\n';
            } else {
                const span = line.cls
                    ? `<span class="${line.cls}">${escapeHtml(line.text)}</span>`
                    : escapeHtml(line.text);
                DOM.biosText.innerHTML += span + '\n';
            }
            DOM.biosScreen.scrollTop = DOM.biosScreen.scrollHeight;
        }, totalDelay);
    }

    // After BIOS completes, show GRUB menu
    setTimeout(() => {
        DOM.biosScreen.classList.add('hidden');
        DOM.grubScreen.classList.remove('hidden');
        renderGrubMenu();
    }, totalDelay + 600);
}

function renderGrubMenu() {
    const allOption = { name: ">> Ver Todos los Archivos", short: "all" };
    const options = [...SUBJECTS, allOption];

    DOM.grubOptions.innerHTML = options.map((s, i) =>
        `<li data-index="${i}" class="${i === 0 ? 'active' : ''}"
             onclick="grubSelect(${i})" ontouchstart="grubSelect(${i})">${s.name}</li>`
    ).join('');

    state.grubIndex = 0;
}

function grubNavigate(dir) {
    const items = DOM.grubOptions.querySelectorAll('li');
    if (!items.length) return;

    items[state.grubIndex].classList.remove('active');
    state.grubIndex = (state.grubIndex + dir + items.length) % items.length;
    items[state.grubIndex].classList.add('active');
    playBeep(300 + state.grubIndex * 40, 0.04);
}

function grubSelect(index) {
    if (typeof index === 'number') {
        const items = DOM.grubOptions.querySelectorAll('li');
        items[state.grubIndex]?.classList.remove('active');
        state.grubIndex = index;
        items[state.grubIndex]?.classList.add('active');
    }

    const total = SUBJECTS.length;
    if (state.grubIndex >= total) {
        bootSystem(null); // Show all
    } else {
        bootSystem(SUBJECTS[state.grubIndex].name);
    }
}

function bootSystem(subjectFilter) {
    initAudio();
    playBootSound();

    DOM.grub.classList.add('fade-out');
    setTimeout(() => {
        DOM.grub.classList.add('hidden');
        DOM.grub.classList.remove('fade-out');
        DOM.app.classList.remove('hidden');
        DOM.gengarWidget.classList.remove('hidden');

        state.view = 'dashboard';
        state.filter = subjectFilter;

        renderSubjectNav();
        renderDashboard();
        updateBreadcrumbs();
        updateFooter();
        DOM.app.classList.add('fade-in');
        setTimeout(() => DOM.app.classList.remove('fade-in'), 500);
    }, 350);
}

// ============================================
// 18. RECOVERY MODE (Back to GRUB)
// ============================================
function recoveryMode() {
    state.view = 'grub';
    state.filter = null;
    state.project = null;

    DOM.app.classList.add('hidden');
    DOM.gengarWidget.classList.add('hidden');
    DOM.grub.classList.remove('hidden');
    DOM.biosScreen.classList.add('hidden');
    DOM.grubScreen.classList.remove('hidden');

    renderGrubMenu();
}

// ============================================
// SUBJECT NAVIGATION
// ============================================
function renderSubjectNav() {
    const allBtn = `<button class="subject-btn ${!state.filter ? 'active' : ''}"
                            onclick="filterSubject(null)">Todos</button>`;
    const btns = SUBJECTS.map(s =>
        `<button class="subject-btn ${state.filter === s.name ? 'active' : ''}"
                 onclick="filterSubject('${s.name}')">${s.short}</button>`
    ).join('');

    DOM.subjectNav.innerHTML = allBtn + btns;
}

function filterSubject(subject) {
    state.filter = subject;
    state.view = 'dashboard';
    state.project = null;

    renderSubjectNav();
    renderDashboard();
    updateBreadcrumbs();

    // Show dashboard, hide project view
    DOM.dashboard.classList.remove('hidden');
    DOM.projectView.classList.add('hidden');
}

// ============================================
// 5. DASHBOARD / CARD GRID
// ============================================
function renderDashboard() {
    const filtered = state.filter
        ? ARCHIVE_DB.filter(p => p.subject === state.filter)
        : ARCHIVE_DB;

    if (filtered.length === 0) {
        DOM.cardsGrid.innerHTML = '';
        DOM.noResults.classList.remove('hidden');
        return;
    }

    DOM.noResults.classList.add('hidden');
    DOM.cardsGrid.innerHTML = filtered.map(p => createCardHTML(p)).join('');

    // 19. Lazy loading for images
    setupLazyLoading();
}

function createCardHTML(project) {
    const imgHtml = project.image
        ? `<img class="card-img" data-src="${encodeFilePath(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy">`
        : `<div class="card-img-placeholder">&#9760;</div>`;

    const badgeClass = `badge-${project.difficulty.toLowerCase()}`;
    const tagsHtml = project.tags.slice(0, 4).map(t =>
        `<span class="card-tag">${escapeHtml(t)}</span>`
    ).join('');

    return `
        <article class="card fade-in" onclick="openProject(${project.id})" data-subject="${project.subject}">
            <div class="card-img-wrap">${imgHtml}</div>
            <div class="card-body">
                <div class="card-subject">${escapeHtml(project.shortSubject)}</div>
                <h3 class="card-title">${escapeHtml(project.title)}</h3>
                <p class="card-desc">${escapeHtml(project.description)}</p>
                <div class="card-footer">
                    <div class="card-tags">${tagsHtml}</div>
                    <span class="badge ${badgeClass}">${project.difficulty}</span>
                </div>
            </div>
        </article>
    `;
}

// ============================================
// 19. LAZY LOADING (IntersectionObserver)
// ============================================
function setupLazyLoading() {
    const images = document.querySelectorAll('.card-img[data-src]');
    if (!('IntersectionObserver' in window)) {
        images.forEach(img => { img.src = img.dataset.src; });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.onerror = () => {
                    img.parentElement.innerHTML = '<div class="card-img-placeholder">&#9760;</div>';
                };
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    images.forEach(img => observer.observe(img));
}

// ============================================
// 2. OMNIBAR SEARCH
// ============================================
function handleSearch(query) {
    query = query.trim().toLowerCase();
    if (query.length < 2) {
        DOM.omniResults.classList.add('hidden');
        state.omniIndex = -1;
        return;
    }

    const results = ARCHIVE_DB.filter(p => {
        const searchable = [
            p.title,
            p.subject,
            p.shortSubject,
            p.description,
            ...p.tags
        ].join(' ').toLowerCase();
        return query.split(/\s+/).every(term => searchable.includes(term));
    });

    if (results.length === 0) {
        DOM.omniResults.innerHTML = '<div class="omni-result"><span class="omni-result-title">No results found</span></div>';
        DOM.omniResults.classList.remove('hidden');
        state.omniIndex = -1;
        return;
    }

    DOM.omniResults.innerHTML = results.map((p, i) => {
        const titleHtml = highlightMatch(p.title, query);
        const path = `/root/${p.shortSubject}/${p.title.replace(/\s+/g, '_')}`;
        return `
            <div class="omni-result" data-id="${p.id}" onclick="openProject(${p.id}); closeOmnibar();">
                <div class="omni-result-title">${titleHtml}
                    <span class="omni-result-subject">${escapeHtml(p.shortSubject)}</span>
                </div>
                <div class="omni-result-path">Path: ${escapeHtml(path)}</div>
            </div>
        `;
    }).join('');

    DOM.omniResults.classList.remove('hidden');
    state.omniIndex = -1;
}

function highlightMatch(text, query) {
    const escaped = escapeHtml(text);
    const terms = query.split(/\s+/).filter(Boolean);
    let result = escaped;
    terms.forEach(term => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        result = result.replace(regex, '<mark>$1</mark>');
    });
    return result;
}

function navigateOmniResults(dir) {
    const items = DOM.omniResults.querySelectorAll('.omni-result[data-id]');
    if (!items.length) return;

    if (state.omniIndex >= 0) items[state.omniIndex]?.classList.remove('active');
    state.omniIndex = Math.max(-1, Math.min(state.omniIndex + dir, items.length - 1));
    if (state.omniIndex >= 0) items[state.omniIndex]?.classList.add('active');
}

function selectOmniResult() {
    const items = DOM.omniResults.querySelectorAll('.omni-result[data-id]');
    if (state.omniIndex >= 0 && items[state.omniIndex]) {
        const id = parseInt(items[state.omniIndex].dataset.id);
        openProject(id);
        closeOmnibar();
    }
}

function closeOmnibar() {
    DOM.omnibar.value = '';
    DOM.omniResults.classList.add('hidden');
    state.omniIndex = -1;
    DOM.omnibar.blur();
}

// ============================================
// 9. PROJECT VIEWER (PDF / Markdown)
// ============================================
function openProject(id) {
    const project = ARCHIVE_DB.find(p => p.id === id);
    if (!project) return;

    initAudio();
    playStatic();

    state.view = 'project';
    state.project = project;

    // Update header
    DOM.folioTitle.textContent = project.title;
    DOM.folioTitle.setAttribute('data-text', project.title);

    // Badges
    const badgeClass = `badge-${project.difficulty.toLowerCase()}`;
    DOM.folioBadges.innerHTML = `
        <span class="badge ${badgeClass}">${project.difficulty}</span>
        <span class="card-tag" style="font-size:11px;">${escapeHtml(project.shortSubject)}</span>
        ${project.tags.slice(0, 3).map(t => `<span class="card-tag" style="font-size:11px;">${escapeHtml(t)}</span>`).join('')}
    `;

    // Load content
    DOM.folioBody.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Loading...</div>';

    if (project.type === 'pdf' && project.content) {
        loadPDF(project.content);
    } else if (project.type === 'md' && project.content) {
        loadMarkdown(project.content);
    } else if (project.type === 'images') {
        loadImagesProject(project);
    } else {
        DOM.folioBody.innerHTML = `
            <div style="text-align:center;padding:40px;">
                <p style="color:var(--purple);font-size:18px;">Archivo sin contenido digital</p>
                <p style="color:var(--text-dim);margin-top:10px;">Este proyecto no tiene un documento asociado.</p>
            </div>
        `;
        DOM.tocList.innerHTML = '';
    }

    // Show project view, hide dashboard
    DOM.dashboard.classList.add('hidden');
    DOM.projectView.classList.remove('hidden');
    DOM.projectView.classList.add('fade-in');
    setTimeout(() => DOM.projectView.classList.remove('fade-in'), 500);

    updateBreadcrumbs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadPDF(path) {
    const encodedPath = encodeFilePath(path);
    DOM.folioBody.innerHTML = `
        <iframe class="pdf-viewer" src="${encodedPath}"
                title="PDF Viewer" loading="lazy"></iframe>
        <div style="text-align:center;margin-top:12px;">
            <a href="${encodedPath}" target="_blank" style="color:var(--purple);font-size:12px;">
                Abrir PDF en nueva pestaña
            </a>
        </div>
    `;
    DOM.tocSidebar.classList.add('hidden');
}

async function loadMarkdown(path) {
    try {
        const encodedPath = encodeFilePath(path);
        const response = await fetch(encodedPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        let mdText = await response.text();
        const baseDir = path.substring(0, path.lastIndexOf('/'));

        // Configure marked
        if (typeof marked !== 'undefined') {
            marked.use({ gfm: true, breaks: true });
            let html = marked.parse(mdText);

            // Fix relative image paths
            html = html.replace(/src="(?!http|\/\/|data:)(.*?)"/g, (match, src) => {
                const decoded = decodeURIComponent(src);
                return `src="${encodeFilePath(baseDir + '/' + decoded)}"`;
            });

            // Fix relative href paths (non-anchor, non-http)
            html = html.replace(/href="(?!http|\/\/|#|mailto:)(.*?)"/g, (match, href) => {
                const decoded = decodeURIComponent(href);
                return `href="${encodeFilePath(baseDir + '/' + decoded)}" target="_blank"`;
            });

            DOM.folioBody.innerHTML = `<div class="md-content">${html}</div>`;
        } else {
            // Fallback if marked is not loaded
            DOM.folioBody.innerHTML = `<pre style="white-space:pre-wrap;color:var(--text);font-size:13px;">${escapeHtml(mdText)}</pre>`;
        }

        // Wrap code blocks in terminal style
        wrapCodeBlocks();

        // Generate TOC
        generateTOC();

        DOM.tocSidebar.classList.remove('hidden');

    } catch (err) {
        DOM.folioBody.innerHTML = `
            <div style="text-align:center;padding:40px;">
                <p style="color:var(--red);font-size:16px;">Error loading file</p>
                <p style="color:var(--text-dim);margin-top:8px;">${escapeHtml(err.message)}</p>
                <p style="color:var(--text-dim);margin-top:4px;font-size:12px;">Path: ${escapeHtml(path)}</p>
            </div>
        `;
        DOM.tocList.innerHTML = '';
    }
}

function loadImagesProject(project) {
    DOM.folioBody.innerHTML = `
        <div style="text-align:center;padding:20px;">
            <p style="color:var(--text-dim);margin-bottom:16px;">Este proyecto contiene archivos multimedia.</p>
            ${project.image ? `<img src="${encodeFilePath(project.image)}" style="max-width:100%;border-radius:4px;border:1px solid var(--card-border);" alt="${escapeHtml(project.title)}">` : ''}
        </div>
    `;
    DOM.tocSidebar.classList.add('hidden');
}

// ============================================
// 4. TERMINAL CODE BLOCK WRAPPING
// ============================================
function wrapCodeBlocks() {
    const codeBlocks = DOM.folioBody.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
        if (pre.closest('.terminal')) return; // Already wrapped

        const code = pre.querySelector('code');
        const codeText = code ? code.textContent : pre.textContent;

        const terminal = document.createElement('div');
        terminal.className = 'terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                </div>
                <span class="terminal-title">root@gengar: ~</span>
                <button class="copy-btn" onclick="copyTerminalCode(this)" title="Copiar">&#x2398;</button>
            </div>
            <div class="terminal-body">
                <div class="terminal-prompt">[<span class="t-red">root</span>@<span class="t-purple">gengar</span>:~]# </div>
            </div>
        `;

        terminal.querySelector('.terminal-body').appendChild(pre.cloneNode(true));
        pre.parentNode.replaceChild(terminal, pre);
    });
}

function copyTerminalCode(btn) {
    const terminal = btn.closest('.terminal');
    const code = terminal.querySelector('pre code') || terminal.querySelector('pre');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'OK';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '&#x2398;';
        }, 1500);
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = code.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.classList.add('copied');
        btn.textContent = 'OK';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '&#x2398;';
        }, 1500);
    });
}

// ============================================
// 12. TABLE OF CONTENTS (TOC)
// ============================================
function generateTOC() {
    const headings = DOM.folioBody.querySelectorAll('.md-content h2, .md-content h3');
    if (headings.length === 0) {
        DOM.tocSidebar.classList.add('hidden');
        return;
    }

    DOM.tocList.innerHTML = '';
    headings.forEach((h, i) => {
        const id = `toc-${i}-${h.textContent.replace(/\s+/g, '-').toLowerCase().substring(0, 30)}`;
        h.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = h.textContent;
        a.className = h.tagName === 'H3' ? 'toc-h3' : '';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            h.scrollIntoView({ behavior: 'smooth', block: 'start' });
            $$('#toc-list a').forEach(el => el.classList.remove('active'));
            a.classList.add('active');
        });
        li.appendChild(a);
        DOM.tocList.appendChild(li);
    });
}

// ============================================
// 7. BREADCRUMBS
// ============================================
function updateBreadcrumbs() {
    let html = `<span class="bc-segment bc-link" onclick="goHome()">~</span>`;

    if (state.view === 'dashboard' || state.view === 'project') {
        html += `<span class="bc-sep">/</span>`;
        html += `<span class="bc-segment bc-link" onclick="filterSubject(null)">Asignaturas</span>`;
    }

    if (state.filter) {
        const short = SUBJECTS.find(s => s.name === state.filter)?.short || state.filter;
        html += `<span class="bc-sep">/</span>`;
        html += `<span class="bc-segment bc-link" onclick="filterSubject('${state.filter}')">${escapeHtml(short)}</span>`;
    }

    if (state.view === 'project' && state.project) {
        html += `<span class="bc-sep">/</span>`;
        html += `<span class="bc-segment bc-current">${escapeHtml(state.project.title)}</span>`;
    }

    DOM.breadcrumbs.innerHTML = html;
}

function goHome() {
    state.filter = null;
    state.project = null;
    state.view = 'dashboard';

    DOM.dashboard.classList.remove('hidden');
    DOM.projectView.classList.add('hidden');
    DOM.tocSidebar.classList.remove('hidden');

    renderSubjectNav();
    renderDashboard();
    updateBreadcrumbs();
}

// ============================================
// 10. FOOTER
// ============================================
function updateFooter() {
    DOM.archiveCount.textContent = ARCHIVE_DB.length;
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    DOM.footerClock.textContent = `${h}:${m}:${s}`;
}

// ============================================
// 6. GENGAR WIDGET
// ============================================
let bubbleTimeout = null;

function showGengarBubble() {
    const cmd = GENGAR_COMMANDS[Math.floor(Math.random() * GENGAR_COMMANDS.length)];
    DOM.gengarBubble.textContent = cmd;
    DOM.gengarBubble.classList.remove('hidden');

    playBeep(660, 0.06, 0.03);

    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
        DOM.gengarBubble.classList.add('hidden');
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEvents() {
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        // Initialize audio on first interaction
        initAudio();

        // GRUB navigation
        if (state.view === 'grub' && !DOM.grubScreen.classList.contains('hidden')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                grubNavigate(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                grubNavigate(1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                grubSelect();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                bootSystem(null);
            }
            return;
        }

        // Skip to GRUB from BIOS
        if (state.view === 'grub' && !DOM.biosScreen.classList.contains('hidden')) {
            DOM.biosScreen.classList.add('hidden');
            DOM.grubScreen.classList.remove('hidden');
            renderGrubMenu();
            return;
        }

        // ESC - Recovery or close
        if (e.key === 'Escape') {
            if (!DOM.omniResults.classList.contains('hidden')) {
                closeOmnibar();
            } else if (state.view === 'project') {
                goBack();
            } else {
                recoveryMode();
            }
            return;
        }

        // Omnibar keyboard navigation
        if (document.activeElement === DOM.omnibar) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateOmniResults(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateOmniResults(-1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (state.omniIndex >= 0) {
                    selectOmniResult();
                }
            }
        }

        // Ctrl+K or / to focus omnibar
        if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== DOM.omnibar)) {
            e.preventDefault();
            DOM.omnibar.focus();
        }
    });

    // Omnibar input
    DOM.omnibar.addEventListener('input', () => {
        handleSearch(DOM.omnibar.value);
    });

    // Close omnibar when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#omnibar-container')) {
            DOM.omniResults.classList.add('hidden');
            state.omniIndex = -1;
        }
    });

    // Recovery button
    DOM.btnRecovery.addEventListener('click', recoveryMode);

    // Close project
    DOM.folioClose.addEventListener('click', goBack);

    // Gengar widget
    DOM.gengarWidget.addEventListener('click', showGengarBubble);
}

function goBack() {
    if (state.view === 'project') {
        state.view = 'dashboard';
        state.project = null;

        DOM.projectView.classList.add('hidden');
        DOM.dashboard.classList.remove('hidden');
        DOM.tocSidebar.classList.remove('hidden');

        updateBreadcrumbs();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function encodeFilePath(path) {
    return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    setupEvents();
    initBios();
}

document.addEventListener('DOMContentLoaded', init);
