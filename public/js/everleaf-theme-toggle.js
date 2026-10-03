(() => {
    const storageKey = 'everleaf-color-mode';
    const validModes = ['light', 'dark'];

    let savedMode = 'light';
    try {
        const storedMode = window.localStorage.getItem(storageKey);
        if (validModes.includes(storedMode)) savedMode = storedMode;
    } catch (_) {
        // Keep the switch usable when browser storage is unavailable.
    }

    const setMode = (mode) => {
        if (!validModes.includes(mode)) return;
        document.documentElement.dataset.everleafTheme = mode;
        document.querySelectorAll('[data-everleaf-mode]').forEach((button) => {
            const selected = button.dataset.everleafMode === mode;
            button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.setAttribute('content', mode === 'dark' ? '#07130b' : '#18301d');
        try {
            window.localStorage.setItem(storageKey, mode);
        } catch (_) {
            // The selected mode still applies for this page when storage is unavailable.
        }
    };

    setMode(savedMode);

    const body = document.body;
    const embeddedPreview = body.classList.contains('embedded-preview');
    if (!embeddedPreview) {
        const atmosphere = document.createElement('div');
        atmosphere.className = 'everleaf-atmosphere';
        atmosphere.setAttribute('aria-hidden', 'true');
        body.prepend(atmosphere);

        const fireflies = document.createElement('div');
        fireflies.className = 'everleaf-firefly-field';
        fireflies.setAttribute('aria-hidden', 'true');
        for (let index = 0; index < 16; index += 1) {
            const firefly = document.createElement('span');
            firefly.className = 'everleaf-firefly';
            firefly.style.setProperty('--start-x', `${8 + ((index * 37) % 86)}%`);
            firefly.style.setProperty('--start-y', `${12 + ((index * 53) % 78)}%`);
            firefly.style.setProperty('--fly-size', `${2 + (index % 3)}px`);
            firefly.style.setProperty('--fly-duration', `${7 + (index % 8)}s`);
            firefly.style.setProperty('--fly-delay', `${-((index * 1.7) % 12)}s`);
            fireflies.append(firefly);
        }
        body.append(fireflies);
    }

    const controls = document.createElement('div');
    controls.className = 'everleaf-mode-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Website appearance');
    controls.innerHTML = '<button type="button" data-everleaf-mode="light" aria-label="Use light mode">☼ <span>Light</span></button><button type="button" data-everleaf-mode="dark" aria-label="Use dark mode">☾ <span>Dark</span></button>';
    controls.querySelectorAll('[data-everleaf-mode]').forEach((button) => {
        button.addEventListener('click', () => setMode(button.dataset.everleafMode));
    });

    const host = document.querySelector('.site-header .account-actions, .topbar, .toolbar, body > header');
    if (host) {
        host.append(controls);
    } else {
        controls.classList.add('everleaf-mode-controls-floating');
        body.append(controls);
    }
    setMode(savedMode);

    window.addEventListener('storage', (event) => {
        if (event.key === storageKey && validModes.includes(event.newValue)) setMode(event.newValue);
    });
})();
