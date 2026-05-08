/* ========================================
   AMPT8528 - 首页脚本
   ======================================== */

// --- 1. 粒子背景 ---
(function initParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];
    const COUNT = 80;
    const MAX_SPEED = 0.3;
    const CONNECT_DIST = 120;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * MAX_SPEED * 2;
            this.vy = (Math.random() - 0.5) * MAX_SPEED * 2;
            this.r = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.update();
            p.draw();
        }
        drawLines();
        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();
})();

// --- 2. 标题点击效果 ---
(function initTitle() {
    const title = document.getElementById('heroTitle');
    if (!title) return;
    let clickCount = 0;
    const messages = [
        'ampt8528',
        'minext137.github.io',
        '✨ 你好呀 ✨',
        '感谢你的访问 💜',
    ];

    title.addEventListener('click', () => {
        clickCount = (clickCount + 1) % messages.length;
        title.style.animation = 'none';
        title.offsetHeight; // force reflow
        title.textContent = messages[clickCount];
        title.style.animation = 'heroIn 0.4s ease-out forwards';

        // 彩蛋：快速连点5次触发特效
        if (clickCount === 0 && title._clickTimer) {
            clearTimeout(title._clickTimer);
            title._clickCount = (title._clickCount || 0) + 1;
        } else {
            title._clickCount = 1;
        }

        title._clickTimer = setTimeout(() => {
            title._clickCount = 0;
        }, 800);

        if (title._clickCount >= 4) {
            title._clickCount = 0;
            createEasterEgg();
        }
    });
})();

// --- 3. 彩蛋特效 ---
function createEasterEgg() {
    const emojis = ['💜', '✨', '🌟', '🎉', '🚀', '🌈', '⭐', '💫'];
    const container = document.body;
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `
            position: fixed;
            z-index: 9999;
            font-size: ${16 + Math.random() * 24}px;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            transform: translateY(0) scale(0);
            opacity: 1;
            transition: all ${1.5 + Math.random() * 1}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        container.appendChild(el);
        requestAnimationFrame(() => {
            el.style.transform = `translateY(${-80 - Math.random() * 120}px) scale(${0.6 + Math.random() * 0.8})`;
            el.style.opacity = '0';
        });
        setTimeout(() => el.remove(), 3000);
    }
}

// --- 4. 页脚彩蛋悬停 ---
(function initFooter() {
    const egg = document.getElementById('easterEgg');
    if (!egg) return;
    const originals = ['泥嚎！ 我市中国任！', '🫡 看到你了', '🌟 毕业快乐', '💻 代码改变世界'];
    let idx = 0;

    egg.addEventListener('mouseenter', () => {
        idx = (idx + 1) % originals.length;
        egg.textContent = originals[idx];
    });
})();
