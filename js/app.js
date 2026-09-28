/**
 * =============================================================================
 * CYBERNETIC ARCHITECT - MAIN UI CONTROLLER & RENDER ENGINE
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const config = window.PORTFOLIO_CONFIG || {};

    // 1. Initialize Header & Identity
    renderIdentity(config);

    // 2. Initialize Real-Time Clock
    initCyberClock();

    // 3. Initialize Typewriter Headline
    initTypewriter(config.personal ? config.personal.typingTitles : []);

    // 4. Render Skills Matrix
    renderSkills(config.skills || []);

    // 5. Render Project Vault
    renderProjects(config.projects || [], config.projectCategories || []);

    // 6. Render Career Timeline
    renderTimeline(config.timeline || []);

    // 7. Render Contact & Socials
    renderContact(config.contact || {});

    // 8. Setup Theme Switcher
    setupThemes(config.themes || []);

    // 9. Setup SFX UI
    if (window.cyberAudio) {
        window.cyberAudio.updateUI();
    }

    // 10. Setup Diagnostics Modal
    setupDiagnosticsModal();

    // 11. Setup Encrypted Form Transmission
    setupContactForm();

    // 12. Setup Mobile Navigation
    setupMobileMenu();
});

/* -------------------------------------------------------------------------
   1. IDENTITY & HERO METRICS RENDERING
------------------------------------------------------------------------- */
function renderIdentity(config) {
    const p = config.personal || {};

    // Header Branding
    const brandName = document.getElementById('brand-name');
    const brandVersion = document.getElementById('brand-version');
    const headerLogoImg = document.getElementById('header-logo-img');

    if (brandName) brandName.innerHTML = `${p.osName || 'PORTFOLIO'}`;
    if (brandVersion) brandVersion.textContent = p.systemVersion || 'v4.09.26_CORE';
    if (headerLogoImg && p.logoImage) {
        headerLogoImg.src = p.logoImage;
    }

    // Hero Identification
    const heroId = document.getElementById('hero-identification');
    const heroBio = document.getElementById('hero-bio');
    const profileIdTag = document.getElementById('profile-id-tag');
    const profileAuthTag = document.getElementById('profile-auth-tag');
    const profileLocationTag = document.getElementById('profile-location-tag');
    const avatarImg = document.getElementById('avatar-img');

    if (heroId) heroId.textContent = `// IDENTIFICATION: ${p.name || 'ALEX VANCE'}`;
    if (heroBio) heroBio.textContent = p.bio || '';
    if (profileIdTag) profileIdTag.innerHTML = `<i class="fa-solid fa-microchip"></i> ${p.callsign || 'AGENT PROFILE ID: 884-VX'}`;
    if (profileAuthTag) profileAuthTag.textContent = p.authorizationStatus ? p.authorizationStatus.split('//')[0].trim() : 'AUTHORIZED';
    if (profileLocationTag) profileLocationTag.textContent = `LOC: ${p.location || 'SATARA / REMOTE'}`;

    if (avatarImg && p.avatarImage) {
        avatarImg.src = p.avatarImage;
        avatarImg.style.objectPosition = "center 15%";
    }

    // Quick Metrics Bars
    const metricsContainer = document.getElementById('hero-metrics');
    if (metricsContainer && p.metrics) {
        metricsContainer.innerHTML = p.metrics.map(m => `
            <div class="bg-slate-900/60 p-3 rounded border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <span class="text-[11px] font-fira text-slate-400 block">${m.label}</span>
                <span class="text-lg sm:text-xl font-orbitron font-bold text-cyan-400">${m.value}</span>
            </div>
        `).join('');
    }

    // Agent Specs Detail Box
    const specsContainer = document.getElementById('agent-specs');
    if (specsContainer && p.specs) {
        specsContainer.innerHTML = p.specs.map(s => `
            <div class="flex justify-between items-center text-slate-300">
                <span class="text-slate-400">${s.label}</span>
                <span class="${s.highlight ? 'text-amber-400 font-bold' : 'text-slate-200'}">${s.value}</span>
            </div>
        `).join('');
    }
}

/* -------------------------------------------------------------------------
   2. REAL-TIME CYBER CLOCK
------------------------------------------------------------------------- */
function initCyberClock() {
    const clockEl = document.getElementById('cyber-clock');
    if (!clockEl) return;

    function update() {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        clockEl.innerHTML = `${timeStr}<span class="text-xs text-cyan-400 opacity-80">.${ms}</span>`;
    }
    update();
    setInterval(update, 60);
}

/* -------------------------------------------------------------------------
   3. TYPEWRITER EFFECT
------------------------------------------------------------------------- */
function initTypewriter(titles) {
    const el = document.getElementById('typing-text');
    if (!el || !titles || titles.length === 0) return;

    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIdx];

        if (isDeleting) {
            el.textContent = currentTitle.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = currentTitle.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 35 : 75;

        if (!isDeleting && charIdx === currentTitle.length) {
            speed = 2200; // Pause at full title
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* -------------------------------------------------------------------------
   4. SKILLS MATRIX RENDERING
------------------------------------------------------------------------- */
function renderSkills(skillsData) {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    container.innerHTML = skillsData.map(category => {
        let accentGradient = 'from-cyan-500 to-blue-500';
        let iconColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/40';
        let barColor = 'text-cyan-400';

        if (category.accentColor === 'purple') {
            accentGradient = 'from-purple-500 to-indigo-500';
            iconColor = 'text-purple-400 bg-purple-500/10 border-purple-500/40';
            barColor = 'text-purple-400';
        } else if (category.accentColor === 'emerald') {
            accentGradient = 'from-emerald-500 to-teal-500';
            iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40';
            barColor = 'text-emerald-400';
        }

        const itemsHtml = category.items.map(item => `
            <div class="space-y-1.5">
                <div class="flex justify-between text-slate-300">
                    <span>${item.name}</span>
                    <span class="${barColor} font-bold">${item.level}%</span>
                </div>
                <div class="w-full bg-slate-900/90 h-2 rounded overflow-hidden p-0.5 border border-slate-800">
                    <div class="bg-gradient-to-r ${accentGradient} h-full rounded transition-all duration-1000" style="width: ${item.level}%"></div>
                </div>
            </div>
        `).join('');

        return `
            <div class="cyber-card p-6 space-y-5 glow-box-hover">
                <div class="hud-corner-tl"></div>
                <div class="hud-corner-tr"></div>
                <div class="hud-corner-bl"></div>
                <div class="hud-corner-br"></div>

                <div class="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                    <div class="p-2.5 border rounded ${iconColor}">
                        <i class="${category.icon} text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-orbitron font-bold text-lg text-white">${category.category}</h3>
                        <span class="font-fira text-[11px] text-slate-400">${category.subtitle}</span>
                    </div>
                </div>

                <div class="space-y-4 font-fira text-xs">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join('');
}

/* -------------------------------------------------------------------------
   5. PROJECT VAULT RENDERING & CATEGORY FILTERING
------------------------------------------------------------------------- */
function renderProjects(projectsData, categories) {
    const filterContainer = document.getElementById('project-filters');
    const projectGrid = document.getElementById('projects-grid');

    if (filterContainer && categories) {
        filterContainer.innerHTML = categories.map((cat, idx) => `
            <button onclick="filterProjects('${cat.id}')" 
                    id="filter-btn-${cat.id}"
                    class="filter-btn ${idx === 0 ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-900 text-slate-300 hover:text-cyan-400 border-slate-800 hover:border-cyan-500/50'} px-4 py-2 rounded border transition-all">
                ${cat.label}
            </button>
        `).join('');
    }

    if (projectGrid && projectsData) {
        projectGrid.innerHTML = projectsData.map(p => {
            let badgeClass = 'text-cyan-400 border-cyan-400/50';
            let hoverBorder = 'group-hover:border-cyan-500/60';
            let titleHover = 'group-hover:text-cyan-300';
            let linkClass = 'text-cyan-400';

            if (p.highlightColor === 'pink') {
                badgeClass = 'text-pink-400 border-pink-500/50';
                hoverBorder = 'group-hover:border-pink-500/60';
                titleHover = 'group-hover:text-pink-300';
                linkClass = 'text-pink-400';
            } else if (p.highlightColor === 'emerald') {
                badgeClass = 'text-emerald-400 border-emerald-500/50';
                hoverBorder = 'group-hover:border-emerald-500/60';
                titleHover = 'group-hover:text-emerald-300';
                linkClass = 'text-emerald-400';
            }

            const tagsHtml = p.tags.map(t => `
                <span class="bg-slate-900/90 text-cyan-300 border border-slate-800 px-2 py-0.5 rounded">${t}</span>
            `).join('');

            return `
                <div class="project-item cyber-card p-5 group flex flex-col justify-between" data-category="${p.category}">
                    <div class="hud-corner-tl"></div>
                    <div class="hud-corner-tr"></div>
                    <div class="hud-corner-bl"></div>
                    <div class="hud-corner-br"></div>

                    <div class="space-y-4">
                        <div class="relative overflow-hidden rounded border border-slate-800 ${hoverBorder} transition-colors h-48 bg-slate-950">
                            <img src="${p.image}" 
                                 alt="${p.title}" 
                                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                 onerror="this.src='https://placehold.co/600x400/0b1326/00f0ff?text=SECURE+VAULT'">
                            <div class="absolute top-2 right-2 bg-slate-950/80 border ${badgeClass} text-[10px] font-fira px-2 py-0.5 rounded">
                                ${p.id}
                            </div>
                        </div>

                        <div class="space-y-2">
                            <span class="text-[11px] font-fira ${linkClass} font-bold uppercase tracking-wider block">${p.badge}</span>
                            <h3 class="text-xl font-orbitron font-bold text-white ${titleHover} transition-colors">
                                ${p.title}
                            </h3>
                            <p class="font-rajdhani text-sm text-slate-400 line-clamp-3">
                                ${p.description}
                            </p>
                        </div>
                    </div>

                    <div class="pt-6 space-y-4">
                        <div class="flex flex-wrap gap-1.5 font-fira text-[10px]">
                            ${tagsHtml}
                        </div>

                        <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 font-fira text-xs">
                            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" 
                               onclick="if(window.cyberAudio) window.cyberAudio.play('click')" 
                               class="${linkClass} hover:text-white flex items-center gap-1.5 transition-colors">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE DEPLOYMENT
                            </a>
                            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" 
                               onclick="if(window.cyberAudio) window.cyberAudio.play('click')" 
                               class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
                                <i class="fa-brands fa-github"></i> REPO CODE
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.filterProjects = function(category) {
    if (window.cyberAudio) window.cyberAudio.play('click');

    const items = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('#project-filters button');

    buttons.forEach(btn => {
        btn.className = "filter-btn bg-slate-900 text-slate-300 hover:text-cyan-400 px-4 py-2 rounded border border-slate-800 hover:border-cyan-500/50 transition-all";
    });

    const activeBtn = document.getElementById(`filter-btn-${category}`);
    if (activeBtn) {
        activeBtn.className = "filter-btn bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded border border-cyan-400 transition-all";
    }

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

/* -------------------------------------------------------------------------
   6. TIMELINE / SYSTEM LOGS RENDERING
------------------------------------------------------------------------- */
function renderTimeline(timelineData) {
    const container = document.getElementById('timeline-container');
    if (!container || !timelineData) return;

    container.innerHTML = timelineData.map((item, idx) => `
        <div class="relative pl-8 sm:pl-10 pb-8 border-l-2 border-slate-800 last:border-l-transparent group">
            <!-- Glowing Node Bullet -->
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            </div>

            <!-- Content Card -->
            <div class="cyber-card p-5 space-y-2 glow-box-hover">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <span class="font-fira text-xs text-cyan-400 font-bold tracking-widest">${item.period}</span>
                    <span class="font-fira text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">${item.status}</span>
                </div>
                <h4 class="font-orbitron font-bold text-white text-base">${item.role}</h4>
                <div class="font-fira text-xs text-slate-400">${item.organization}</div>
                <p class="font-rajdhani text-sm text-slate-300 pt-1 leading-relaxed">${item.details}</p>
            </div>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------
   7. CONTACT & SOCIALS RENDERING
------------------------------------------------------------------------- */
function renderContact(contactData) {
    const socialsContainer = document.getElementById('social-links');
    const footerYear = document.getElementById('current-year');

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    if (socialsContainer && contactData.socials) {
        socialsContainer.innerHTML = contactData.socials.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
               class="text-slate-400 hover:text-cyan-400 text-xl transition-colors duration-200" 
               title="${s.name}" 
               onclick="if(window.cyberAudio) window.cyberAudio.play('click')">
                <i class="${s.icon}"></i>
            </a>
        `).join('');
    }
}

/* -------------------------------------------------------------------------
   8. THEME & COLOR PALETTES
------------------------------------------------------------------------- */
function setupThemes(themes) {
    const container = document.getElementById('theme-picker');
    if (!container || !themes) return;

    container.innerHTML = themes.map(t => `
        <button onclick="setCyberTheme('${t.id}')" 
                class="w-4 h-4 rounded-full hover:scale-125 transition-transform" 
                style="background-color: ${t.primary}" 
                title="${t.name}">
        </button>
    `).join('');
}

window.setCyberTheme = function(themeId) {
    const config = window.PORTFOLIO_CONFIG || {};
    const themes = config.themes || [];
    const theme = themes.find(t => t.id === themeId);

    if (!theme) return;
    if (window.cyberAudio) window.cyberAudio.play('theme');

    const root = document.documentElement;
    root.style.setProperty('--primary-glow', theme.primary);
    root.style.setProperty('--primary-glow-rgb', theme.rgb);
};

/* -------------------------------------------------------------------------
   9. INTERACTIVE DIAGNOSTICS MODAL
------------------------------------------------------------------------- */
function setupDiagnosticsModal() {
    const modal = document.getElementById('diagnostics-modal');
    const closeBtn = document.getElementById('diagnostics-close-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (window.cyberAudio) window.cyberAudio.play('click');
            if (modal) modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

window.openDiagnosticsModal = function() {
    if (window.cyberAudio) window.cyberAudio.play('scan');

    const modal = document.getElementById('diagnostics-modal');
    if (!modal) return;

    modal.classList.add('active');

    // Simulate scanning progression
    const diagLog = document.getElementById('diagnostics-log');
    if (diagLog) {
        diagLog.innerHTML = `<span class="text-cyan-400">[INITIATING HIGH-RESOLUTION HARDWARE SCAN...]</span><br>`;
        
        const steps = [
            { text: ">> Neural Processing Core #1-#8: SYNCHRONIZED", color: "text-emerald-400", delay: 250 },
            { text: ">> L1/L2 Cache Integrity: ZERO BIT FAULTS", color: "text-emerald-400", delay: 500 },
            { text: ">> Cryptographic Hardware Enclave: ACTIVE (TLS 1.3)", color: "text-cyan-300", delay: 800 },
            { text: ">> Gateway Ping to Sector-07 DNS: 12.4ms (EXCELLENT)", color: "text-emerald-400", delay: 1100 },
            { text: ">> Quantum Key Distribution: LOCKED & SECURE", color: "text-amber-400", delay: 1400 },
            { text: "[DIAGNOSTIC STATUS: 100% OPERATIONAL]", color: "text-white font-bold bg-cyan-950/80 p-1 mt-2 inline-block", delay: 1700 }
        ];

        steps.forEach(s => {
            setTimeout(() => {
                diagLog.innerHTML += `<div class="${s.color}">${s.text}</div>`;
                diagLog.scrollTop = diagLog.scrollHeight;
                if (window.cyberAudio) window.cyberAudio.play('click');
            }, s.delay);
        });
    }
};

/* -------------------------------------------------------------------------
   10. ENCRYPTED TRANSMISSION FORM
------------------------------------------------------------------------- */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.cyberAudio) window.cyberAudio.play('scan');

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ENCRYPTING RSA-4096 PACKET...`;

        setTimeout(() => {
            submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> DISPATCH TRANSMITTED`;
            if (successMsg) successMsg.classList.remove('hidden');
            if (window.cyberAudio) window.cyberAudio.play('beep');
            form.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }, 3000);
        }, 1200);
    });
}

/* -------------------------------------------------------------------------
   11. MOBILE DRAWER NAVIGATION
------------------------------------------------------------------------- */
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        if (window.cyberAudio) window.cyberAudio.play('click');
        menu.classList.toggle('hidden');
    });
}

window.closeMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('hidden');
};
