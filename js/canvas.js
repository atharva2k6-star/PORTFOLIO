/**
 * =============================================================================
 * CYBERNETIC ARCHITECT - INTERACTIVE CANVAS & MATRIX RAIN ENGINE
 * =============================================================================
 */

class CyberCanvasManager {
    constructor() {
        this.bgCanvas = document.getElementById('cyber-canvas');
        this.bgCtx = this.bgCanvas ? this.bgCanvas.getContext('2d') : null;

        this.matrixCanvas = document.getElementById('matrix-canvas');
        this.matrixCtx = this.matrixCanvas ? this.matrixCanvas.getContext('2d') : null;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.mouse = { x: -1000, y: -1000, radius: 150 };

        this.particles = [];
        this.numParticles = window.innerWidth < 768 ? 25 : 55;

        this.matrixActive = false;
        this.matrixDrops = [];
        this.matrixChars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'.split('');
        this.fontSize = 14;

        this.init();
    }

    init() {
        if (!this.bgCanvas) return;

        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        // Initialize particles
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new CyberParticle(this.width, this.height));
        }

        // Initialize Matrix Rain
        if (this.matrixCanvas) {
            const columns = Math.floor(this.width / this.fontSize);
            this.matrixDrops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

            // Click on screen to dismiss matrix rain
            this.matrixCanvas.addEventListener('click', () => {
                if (this.matrixActive) {
                    this.toggleMatrix(false);
                }
            });
        }

        // Global ESC key listener to stop matrix rain
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.matrixActive) {
                this.toggleMatrix(false);
            }
        });

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        if (this.bgCanvas) {
            this.bgCanvas.width = this.width;
            this.bgCanvas.height = this.height;
        }

        if (this.matrixCanvas) {
            this.matrixCanvas.width = this.width;
            this.matrixCanvas.height = this.height;
            const columns = Math.floor(this.width / this.fontSize);
            this.matrixDrops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
        }
    }

    getThemeColor() {
        return getComputedStyle(document.documentElement).getPropertyValue('--primary-glow').trim() || '#00f0ff';
    }

    toggleMatrix(forceState) {
        if (typeof forceState === 'boolean') {
            this.matrixActive = forceState;
        } else {
            this.matrixActive = !this.matrixActive;
        }

        if (this.matrixCanvas) {
            if (this.matrixActive) {
                this.matrixCanvas.classList.add('active');
            } else {
                this.matrixCanvas.classList.remove('active');
            }
        }
        return this.matrixActive;
    }

    animate() {
        const themeColor = this.getThemeColor();

        // 1. Draw Background Grid & Particles
        if (this.bgCtx) {
            this.bgCtx.clearRect(0, 0, this.width, this.height);

            // Subtle cyber grid
            this.bgCtx.strokeStyle = 'rgba(28, 41, 65, 0.28)';
            this.bgCtx.lineWidth = 1;
            const gridSize = 55;

            for (let x = 0; x < this.width; x += gridSize) {
                this.bgCtx.beginPath();
                this.bgCtx.moveTo(x, 0);
                this.bgCtx.lineTo(x, this.height);
                this.bgCtx.stroke();
            }

            for (let y = 0; y < this.height; y += gridSize) {
                this.bgCtx.beginPath();
                this.bgCtx.moveTo(0, y);
                this.bgCtx.lineTo(this.width, y);
                this.bgCtx.stroke();
            }

            // Update and draw particles
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                p.update(this.width, this.height, this.mouse);
                p.draw(this.bgCtx, themeColor);
            }

            // Draw particle connecting laser lines
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 125) {
                        this.bgCtx.strokeStyle = themeColor;
                        this.bgCtx.globalAlpha = 0.18 * (1 - dist / 125);
                        this.bgCtx.beginPath();
                        this.bgCtx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.bgCtx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.bgCtx.stroke();
                        this.bgCtx.globalAlpha = 1;
                    }
                }
            }

            // Mouse proximity radar halo
            if (this.mouse.x > 0 && this.mouse.y > 0) {
                this.bgCtx.strokeStyle = themeColor;
                this.bgCtx.globalAlpha = 0.08;
                this.bgCtx.beginPath();
                this.bgCtx.arc(this.mouse.x, this.mouse.y, 60, 0, Math.PI * 2);
                this.bgCtx.stroke();
                this.bgCtx.globalAlpha = 1;
            }
        }

        // 2. Draw Matrix Rain if Active
        if (this.matrixActive && this.matrixCtx) {
            this.matrixCtx.fillStyle = 'rgba(4, 8, 18, 0.15)';
            this.matrixCtx.fillRect(0, 0, this.width, this.height);

            this.matrixCtx.fillStyle = themeColor;
            this.matrixCtx.font = `${this.fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < this.matrixDrops.length; i++) {
                const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
                const x = i * this.fontSize;
                const y = this.matrixDrops[i] * this.fontSize;

                this.matrixCtx.fillText(char, x, y);

                if (y > this.height && Math.random() > 0.975) {
                    this.matrixDrops[i] = 0;
                }
                this.matrixDrops[i]++;
            }
        }

        requestAnimationFrame(this.animate);
    }
}

class CyberParticle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.radius = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    update(width, height, mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const fx = (dx / dist) * force * 1.5;
            const fy = (dy / dist) * force * 1.5;
            this.x -= fx;
            this.y -= fy;
        }
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Global Canvas Manager
window.cyberCanvas = new CyberCanvasManager();
