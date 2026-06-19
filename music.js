/**
 * Shared background music controller.
 * Include this file (after other scripts, near the closing </body> tag)
 * on every page that should play the music.
 *
 * - Autoplays on load and loops forever.
 * - Remembers playback position + play/pause state in sessionStorage,
 *   so moving between pages (index -> cause -> last) feels seamless
 *   instead of restarting the song from 0:00 each time.
 * - Adds a small floating circular button (bottom-right) to toggle play/pause.
 * - If the browser blocks autoplay-with-sound, it starts muted and
 *   unmutes itself the moment the visitor interacts with the page
 *   (click/tap/keypress) -- so it still feels automatic.
 */
(function () {
    var TIME_KEY = 'bgmCurrentTime';
    var PAUSED_KEY = 'bgmUserPaused';

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent = [
            '#bgm-toggle{',
            '  position:fixed;',
            '  bottom:22px;',
            '  right:22px;',
            '  width:56px;',
            '  height:56px;',
            '  border-radius:50%;',
            '  border:none;',
            '  background:linear-gradient(45deg,#ff69b4,#ff99cc);',
            '  box-shadow:0 4px 18px rgba(255,105,180,0.55);',
            '  display:flex;',
            '  align-items:center;',
            '  justify-content:center;',
            '  cursor:pointer !important;',
            '  z-index:99999;',
            '  padding:0;',
            '  transition:transform 0.25s ease, box-shadow 0.25s ease;',
            '}',
            '#bgm-toggle:hover{',
            '  transform:scale(1.1);',
            '  box-shadow:0 6px 22px rgba(255,105,180,0.75);',
            '}',
            '#bgm-toggle svg{',
            '  width:24px;',
            '  height:24px;',
            '  fill:#ffffff;',
            '  pointer-events:none;',
            '}',
            '#bgm-toggle.bgm-playing{',
            '  animation:bgmPulse 2s ease-in-out infinite;',
            '}',
            '@keyframes bgmPulse{',
            '  0%,100%{box-shadow:0 4px 18px rgba(255,105,180,0.55);}',
            '  50%{box-shadow:0 4px 26px rgba(255,105,180,0.9);}',
            '}',
            '@media (max-width:600px){',
            '  #bgm-toggle{width:48px;height:48px;bottom:16px;right:16px;}',
            '  #bgm-toggle svg{width:20px;height:20px;}',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    var ICON_PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    var ICON_PAUSE = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';

    function init() {
        injectStyles();

        var audio = document.createElement('audio');
        audio.id = 'bgm-audio';
        audio.src = 'hbd.mp3';
        audio.loop = true;
        audio.preload = 'auto';
        document.body.appendChild(audio);

        // Restore playback position from the previous page, if any.
        var savedTime = parseFloat(sessionStorage.getItem(TIME_KEY));
        if (!isNaN(savedTime) && savedTime > 0) {
            try { audio.currentTime = savedTime; } catch (e) { /* not ready yet */ }
            audio.addEventListener('loadedmetadata', function () {
                if (audio.currentTime < savedTime) {
                    try { audio.currentTime = savedTime; } catch (e) {}
                }
            });
        }

        var userPaused = sessionStorage.getItem(PAUSED_KEY) === '1';

        var btn = document.createElement('button');
        btn.id = 'bgm-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Play or pause background music');
        btn.innerHTML = ICON_PLAY;
        document.body.appendChild(btn);

        function setIcon(isPlaying) {
            btn.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
            btn.classList.toggle('bgm-playing', isPlaying);
        }

        function attemptAutoplay() {
            var playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    setIcon(true);
                }).catch(function () {
                    // Autoplay with sound was blocked by the browser.
                    // Start muted (always allowed) and unmute on first interaction.
                    audio.muted = true;
                    audio.play().catch(function () {});
                    setIcon(false);

                    var unlock = function () {
                        audio.muted = false;
                        audio.play().then(function () { setIcon(true); }).catch(function () {});
                        document.removeEventListener('click', unlock);
                        document.removeEventListener('keydown', unlock);
                        document.removeEventListener('touchstart', unlock);
                    };
                    document.addEventListener('click', unlock, { once: true });
                    document.addEventListener('keydown', unlock, { once: true });
                    document.addEventListener('touchstart', unlock, { once: true });
                });
            }
        }

        if (userPaused) {
            setIcon(false);
        } else {
            attemptAutoplay();
        }

        btn.addEventListener('click', function () {
            if (audio.paused || audio.muted) {
                audio.muted = false;
                audio.play().then(function () {
                    setIcon(true);
                    sessionStorage.setItem(PAUSED_KEY, '0');
                }).catch(function () {});
            } else {
                audio.pause();
                setIcon(false);
                sessionStorage.setItem(PAUSED_KEY, '1');
            }
        });

        // Periodically persist position so a refresh/navigation resumes close to where it left off.
        setInterval(function () {
            sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
        }, 1000);

        window.addEventListener('beforeunload', function () {
            sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
            sessionStorage.setItem(PAUSED_KEY, (audio.paused || audio.muted) ? '1' : '0');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
