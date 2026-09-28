/**
 * =============================================================================
 * CYBERNETIC ARCHITECT - INTERACTIVE CLI TERMINAL ENGINE
 * =============================================================================
 */

class CyberTerminal {
    constructor() {
        this.inputEl = document.getElementById('terminal-input');
        this.bodyEl = document.getElementById('terminal-body');
        this.promptUserEl = document.getElementById('terminal-prompt-user');
        
        this.history = [];
        this.historyIndex = -1;
        this.availableCommands = [
            'help', 'skills', 'projects', 'contact', 'timeline', 
            'specs', 'whoami', 'matrix', 'stop', 'theme', 'audio', 'scan', 'clear', 'sudo'
        ];

        this.init();
    }

    init() {
        if (!this.inputEl || !this.bodyEl) return;

        const config = window.PORTFOLIO_CONFIG || {};
        const termConfig = config.terminal || {};

        if (this.promptUserEl && termConfig.promptUser) {
            this.promptUserEl.textContent = `${termConfig.promptUser}:${termConfig.promptPath || '~$'}`;
        }

        // Display welcome message
        if (termConfig.welcomeMessage && Array.isArray(termConfig.welcomeMessage)) {
            termConfig.welcomeMessage.forEach((msg, idx) => {
                const colorClass = idx === 0 ? 'text-cyan-400 font-bold' : (idx === 2 ? 'text-slate-300' : 'text-slate-400');
                this.printLine(msg, colorClass);
            });
            this.printLine('');
        }

        // Key Listeners
        this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.execute();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory('down');
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        }
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;

        if (direction === 'up') {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.inputEl.value = this.history[this.history.length - 1 - this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.inputEl.value = this.history[this.history.length - 1 - this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                this.inputEl.value = '';
            }
        }
    }

    autoComplete() {
        const current = this.inputEl.value.trim().toLowerCase();
        if (!current) return;

        const match = this.availableCommands.find(cmd => cmd.startsWith(current));
        if (match) {
            this.inputEl.value = match;
            if (window.cyberAudio) window.cyberAudio.play('click');
        }
    }

    execute() {
        const rawInput = this.inputEl.value.trim();
        if (!rawInput) return;

        const config = window.PORTFOLIO_CONFIG || {};
        const termConfig = config.terminal || {};

        // Add to history
        this.history.push(rawInput);
        this.historyIndex = -1;

        // Print entered command
        const userPrompt = this.promptUserEl ? this.promptUserEl.textContent : 'visitor@nexus:~$';
        this.printLine(`${userPrompt} ${rawInput}`, 'text-amber-400 font-bold');
        this.inputEl.value = '';

        if (window.cyberAudio) window.cyberAudio.play('terminal');

        const parts = rawInput.split(' ');
        const cmd = parts[0].toLowerCase();
        const arg = parts[1] ? parts[1].toLowerCase() : null;

        // Command routing
        switch (cmd) {
            case 'help':
                this.printLine(termConfig.commands.help || 'Available commands: help, skills, projects, contact, timeline, whoami, matrix, theme, audio, scan, clear', 'text-cyan-300');
                break;

            case 'skills':
                if (config.skills) {
                    let out = '[TECHNICAL COMPETENCY MATRIX]\n';
                    config.skills.forEach(cat => {
                        out += `\n>> ${cat.category} [${cat.subtitle}]\n`;
                        cat.items.forEach(item => {
                            out += `   • ${item.name.padEnd(38, ' ')} : ${item.level}%\n`;
                        });
                    });
                    this.printLine(out, 'text-emerald-400');
                }
                break;

            case 'projects':
                if (config.projects) {
                    let out = '[DEPLOYED ARCHITECTURES IN VAULT]\n';
                    config.projects.forEach(p => {
                        out += `\n[${p.id}] ${p.title} (${p.tags.join(', ')})\n  -> ${p.description}\n`;
                    });
                    this.printLine(out, 'text-pink-400');
                }
                break;

            case 'timeline':
                if (config.timeline) {
                    let out = '[SYSTEM OPERATIONAL TIMELINE]\n';
                    config.timeline.forEach(t => {
                        out += `\n[${t.period}] ${t.role} @ ${t.organization}\n  >> Status: ${t.status}\n  >> Detail: ${t.details}\n`;
                    });
                    this.printLine(out, 'text-cyan-300');
                }
                break;

            case 'contact':
                this.printLine(termConfig.commands.contact || 'Email: alex.vance@nexus-dev.io', 'text-amber-300');
                break;

            case 'whoami':
                this.printLine(termConfig.commands.whoami || 'USER: GUEST_OPERATOR', 'text-slate-300');
                break;

            case 'specs':
                this.printLine(termConfig.commands.specs || 'Core status: NOMINAL', 'text-cyan-400');
                break;

            case 'matrix':
                if (window.cyberCanvas) {
                    let isActive;
                    if (arg === 'stop' || arg === 'off' || arg === '0' || arg === 'disable' || arg === 'exit') {
                        isActive = window.cyberCanvas.toggleMatrix(false);
                        this.printLine(`>> Matrix code rain simulation TERMINATED.`, 'text-amber-400');
                    } else if (arg === 'start' || arg === 'on' || arg === '1' || arg === 'enable') {
                        isActive = window.cyberCanvas.toggleMatrix(true);
                        this.printLine(`>> Matrix code rain simulation ACTIVATED. (Type 'stop' or 'matrix stop' to end)`, 'text-emerald-400');
                    } else {
                        isActive = window.cyberCanvas.toggleMatrix();
                        this.printLine(`>> Matrix rain protocol ${isActive ? 'ACTIVATED (Type \'stop\' to exit)' : 'TERMINATED'}.`, isActive ? 'text-emerald-400' : 'text-amber-400');
                    }
                    if (window.cyberAudio) window.cyberAudio.play('beep');
                }
                break;

            case 'stop':
            case 'stop-matrix':
            case 'unmatrix':
                if (window.cyberCanvas) {
                    if (window.cyberCanvas.matrixActive) {
                        window.cyberCanvas.toggleMatrix(false);
                        this.printLine(`>> Matrix code rain simulation TERMINATED successfully.`, 'text-amber-400');
                        if (window.cyberAudio) window.cyberAudio.play('beep');
                    } else {
                        this.printLine(`>> Matrix rain simulation is not currently running. Type 'matrix' to launch.`, 'text-slate-400');
                    }
                }
                break;

            case 'theme':
                if (!arg) {
                    this.printLine(`Theme missing argument. Usage: theme <cyan | magenta | green | gold | purple>`, 'text-red-400');
                } else if (['cyan', 'magenta', 'green', 'gold', 'purple'].includes(arg)) {
                    if (window.setCyberTheme) window.setCyberTheme(arg);
                    this.printLine(`>> Color theme updated to [${arg.toUpperCase()}].`, 'text-cyan-300');
                } else {
                    this.printLine(`Invalid theme '${arg}'. Choose: cyan, magenta, green, gold, purple`, 'text-red-400');
                }
                break;

            case 'audio':
                if (window.cyberAudio) {
                    const status = window.cyberAudio.toggle();
                    this.printLine(`>> SFX Audio Synthesizer: [${status ? 'ENABLED' : 'DISABLED'}]`, status ? 'text-cyan-400' : 'text-amber-400');
                }
                break;

            case 'scan':
            case 'diagnostics':
                if (window.openDiagnosticsModal) {
                    window.openDiagnosticsModal();
                    this.printLine(`>> Telemetry diagnostic HUD engaged.`, 'text-cyan-300');
                }
                break;

            case 'clear':
                this.bodyEl.innerHTML = '';
                return;

            case 'sudo':
                this.printLine(`ACCESS DENIED: Operator is not in the cryptographic sudoers file. Incident reported to Core Security Sentinel.`, 'text-red-400 font-bold');
                if (window.cyberAudio) window.cyberAudio.play('error');
                break;

            default:
                this.printLine(`Command not recognized: '${cmd}'. Type 'help' for authorized commands.`, 'text-red-400');
                if (window.cyberAudio) window.cyberAudio.play('error');
                break;
        }

        // Auto-scroll to bottom
        this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
    }

    printLine(text, className = 'text-slate-300') {
        const line = document.createElement('div');
        line.className = className + ' whitespace-pre-wrap leading-relaxed';
        line.textContent = text;
        this.bodyEl.appendChild(line);
        this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
    }
}

// Global Terminal instance
window.addEventListener('DOMContentLoaded', () => {
    window.cyberTerminal = new CyberTerminal();
});
