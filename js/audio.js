/**
 * =============================================================================
 * CYBERNETIC ARCHITECT - WEB AUDIO SFX SYNTHESIZER
 * =============================================================================
 * Synthesizes authentic futuristic audio without needing external MP3/WAV files.
 */

class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('cyber_sfx_enabled') === 'true';
    }

    initContext() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle(forceState) {
        this.initContext();
        if (typeof forceState === 'boolean') {
            this.enabled = forceState;
        } else {
            this.enabled = !this.enabled;
        }

        localStorage.setItem('cyber_sfx_enabled', this.enabled);
        this.updateUI();

        if (this.enabled) {
            this.play('beep');
        }
        return this.enabled;
    }

    updateUI() {
        const btn = document.getElementById('sound-btn');
        const icon = document.getElementById('sound-icon');
        const label = document.getElementById('sound-label');
        const visualizer = document.getElementById('audio-visualizer');

        if (!btn) return;

        if (this.enabled) {
            btn.classList.add('border-cyan-400', 'text-cyan-400');
            btn.classList.remove('border-slate-700', 'text-slate-400');
            if (icon) icon.className = "fa-solid fa-volume-high text-cyan-400";
            if (label) label.textContent = "SFX: ON";
            if (visualizer) visualizer.classList.add('playing');
        } else {
            btn.classList.remove('border-cyan-400', 'text-cyan-400');
            btn.classList.add('border-slate-700', 'text-slate-400');
            if (icon) icon.className = "fa-solid fa-volume-xmark text-red-400";
            if (label) label.textContent = "SFX: OFF";
            if (visualizer) visualizer.classList.remove('playing');
        }
    }

    play(soundType) {
        if (!this.enabled) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        try {
            switch (soundType) {
                case 'click': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(800, now);
                    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
                    gain.gain.setValueAtTime(0.04, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.04);
                    break;
                }

                case 'beep': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(1100, now);
                    osc.frequency.setValueAtTime(1400, now + 0.03);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.08);
                    break;
                }

                case 'terminal': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(650, now);
                    osc.frequency.exponentialRampToValueAtTime(950, now + 0.06);
                    gain.gain.setValueAtTime(0.03, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.06);
                    break;
                }

                case 'scan': {
                    // Futuristic sweeping multi-tone diagnostic chirp
                    [520, 780, 1040, 1560].forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        const timeOffset = now + idx * 0.06;
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, timeOffset);
                        gain.gain.setValueAtTime(0.03, timeOffset);
                        gain.gain.exponentialRampToValueAtTime(0.0001, timeOffset + 0.08);
                        osc.connect(gain);
                        gain.connect(this.ctx.destination);
                        osc.start(timeOffset);
                        osc.stop(timeOffset + 0.08);
                    });
                    break;
                }

                case 'error': {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(180, now);
                    osc.frequency.setValueAtTime(140, now + 0.08);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.16);
                    break;
                }

                case 'theme': {
                    // Ascending digital chord
                    [440, 554, 659].forEach((freq, i) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.04);
                        gain.gain.setValueAtTime(0.04, now + i * 0.04);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                        osc.connect(gain);
                        gain.connect(this.ctx.destination);
                        osc.start(now + i * 0.04);
                        osc.stop(now + 0.25);
                    });
                    break;
                }
            }
        } catch (e) {
            // Audio policy / suspended context fallback
        }
    }
}

// Global instance
window.cyberAudio = new CyberAudioEngine();
