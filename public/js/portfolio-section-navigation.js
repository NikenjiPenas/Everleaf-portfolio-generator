(() => {
    const navigation = document.querySelector('.portfolio-section-nav');
    if (!navigation) return;

    const links = [...navigation.querySelectorAll('a[href^="#"]')];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!links.length || !sections.length) return;

    const setActive = (sectionId) => {
        links.forEach((link) => {
            const active = link.hash === `#${sectionId}`;
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };

    let clickedSectionUntil = 0;

    const activateHashTarget = () => {
        const sectionId = window.location.hash.slice(1);
        if (sections.some((section) => section.id === sectionId)) {
            setActive(sectionId);
            clickedSectionUntil = performance.now() + 1400;
        }
    };
    activateHashTarget();
    window.addEventListener('hashchange', activateHashTarget);

    navigation.addEventListener('click', (event) => {
        const origin = event.target instanceof Element ? event.target : event.target.parentElement;
        const link = origin && origin.closest('a[href^="#"]');
        const target = link && document.querySelector(link.getAttribute('href'));
        if (target) {
            setActive(target.id);
            // Keep the clicked item highlighted while smooth scrolling is in progress.
            clickedSectionUntil = performance.now() + 1400;
        }
    });

    let scheduled = false;
    const updateActiveSection = () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
            scheduled = false;
            if (performance.now() < clickedSectionUntil) return;
            const marker = Math.min(window.innerHeight * .3, 250);
            const current = sections.find((section) => {
                const bounds = section.getBoundingClientRect();
                return bounds.top <= marker && bounds.bottom > marker;
            });
            const nearest = sections.reduce((closest, section) => {
                const distance = Math.abs(section.getBoundingClientRect().top - marker);
                return !closest || distance < closest.distance ? { section, distance } : closest;
            }, null);
            setActive((current || nearest?.section || sections[0]).id);
        });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
})();
