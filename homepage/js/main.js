/* ==========================================================================
   🎮 PREMIUM 5-THEME PORTFOLIO SKELETON JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initializations
    initThemeSwitcher();
    initGithubGrid();
    initSmoothScrolling();
    fetchGitHubStats();
});

/**
 * 🎨 Theme Switching and LocalStorage Syncing
 */
function initThemeSwitcher() {
    const htmlElement = document.documentElement;
    const switcherButtons = document.querySelectorAll('.theme-btn');
    
    // Default theme setting
    const savedTheme = localStorage.getItem('portfolio-theme') || 'theme-bento';
    applyTheme(savedTheme);

    switcherButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            applyTheme(selectedTheme);
        });
    });

    function applyTheme(themeName) {
        // Remove all theme classes first
        const themes = ['theme-glass', 'theme-brutal', 'theme-terminal', 'theme-minimal', 'theme-bento'];
        themes.forEach(theme => htmlElement.classList.remove(theme));
        
        // Add selected theme class
        htmlElement.classList.add(themeName);
        
        // Sync button states
        switcherButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Save theme in local storage
        localStorage.setItem('portfolio-theme', themeName);

        // Optional terminal theme visual feedback log
        if (themeName === 'theme-terminal') {
            console.log('%c[SYS] TERMINAL_THEME_ESTABLISHED // STACK: EXCELLENT', 'color: #39ff14; font-weight: bold;');
        }
    }
}

/**
 * 📅 GitHub Contribution Grid Skeleton Loader
 */
function initGithubGrid() {
    const gridContainer = document.getElementById('fake-contrib-grid');
    if (!gridContainer) return;

    // Loading skeleton
    const totalTiles = 168; 
    gridContainer.style.gridTemplateColumns = 'repeat(24, 1fr)';
    gridContainer.innerHTML = '';

    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add('level-0');
        gridContainer.appendChild(tile);
    }
}

/**
 * 📅 Render Real GitHub Contribution Grid
 */
function renderGithubGrid(contributions) {
    const gridContainer = document.getElementById('fake-contrib-grid');
    if (!gridContainer) return;

    // Use recent 364 days to fit exactly 52 columns of 7 days
    const recentContribs = contributions.slice(-364); 
    
    gridContainer.style.gridTemplateColumns = 'repeat(52, 1fr)';
    gridContainer.innerHTML = '';

    recentContribs.forEach(day => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add(`level-${day.level}`);
        
        const countText = day.count === 0 ? 'No commits' : `${day.count} commits`;
        tile.setAttribute('title', `${countText} on ${day.date}`);

        tile.addEventListener('mouseenter', () => {
            tile.style.transform = 'scale(1.25)';
            tile.style.zIndex = '10';
        });
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = 'scale(1)';
            tile.style.zIndex = '1';
        });

        gridContainer.appendChild(tile);
    });
}

/**
 * 🧭 Smooth Scrolling and Active Nav Highlighting
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 📡 Fetch GitHub Stats (Repos & Yearly Commits)
 */
async function fetchGitHubStats() {
    const username = 'sungmin6610';
    
    // Fetch Repositories Count
    try {
        const repoRes = await fetch(`https://api.github.com/users/${username}`);
        if (repoRes.ok) {
            const repoData = await repoRes.json();
            const repoEl = document.getElementById('github-repos');
            if (repoEl && repoData.public_repos !== undefined) {
                repoEl.textContent = repoData.public_repos;
            }
        }
    } catch (e) {
        console.error('Failed to fetch GitHub repos:', e);
    }

    // Fetch Yearly Commits via a public contribution proxy
    try {
        const commitsRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (commitsRes.ok) {
            const commitsData = await commitsRes.json();
            let totalCommits = 0;
            if (commitsData && commitsData.total) {
                const keys = Object.keys(commitsData.total);
                if (keys.length > 0) {
                    totalCommits = commitsData.total[keys[0]]; 
                }
            }
            
            const commitsEl = document.getElementById('github-commits');
            if (commitsEl && totalCommits > 0) {
                commitsEl.textContent = totalCommits.toLocaleString();
            } else if (commitsEl) {
                commitsEl.textContent = '0';
            }

            if (commitsData && commitsData.contributions) {
                renderGithubGrid(commitsData.contributions);
            }
        }
    } catch (e) {
        console.error('Failed to fetch GitHub commits:', e);
    }
}
