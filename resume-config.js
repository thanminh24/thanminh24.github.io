/**
 * Resume Configuration
 * Centralized config for the bilingual resume download links.
 * CVs are hosted as GitHub Release assets (kept out of git via .gitignore).
 */

const RESUME_CONFIG = {
    githubRelease: {
        username: 'thanminh24',
        repo: 'thanminh24.github.io',
        tag: 'resume-v1',
        // GitHub sanitizes release asset names (spaces/parens -> dots) on upload
        files: {
            en: 'Resume.-.Than.Tue.Minh.EN.pdf',
            vi: 'Resume.-.Than.Tue.Minh.VI.pdf'
        }
    },

    // Filename the browser saves the download as, per language
    downloadFilenames: {
        en: 'ThanTueMinh_Resume_English.pdf',
        vi: 'ThanTueMinh_Resume_Vietnamese.pdf'
    },

    openInNewTab: true
};

/**
 * Build the GitHub Release download URL for a given language
 */
function getResumeUrl(lang) {
    const { username, repo, tag, files } = RESUME_CONFIG.githubRelease;
    const filename = files[lang] || files.en;
    return `https://github.com/${username}/${repo}/releases/download/${tag}/${filename}`;
}

/**
 * Wire up every resume download link (identified by [data-lang] on a
 * .resume-link element) to its language-specific release asset.
 */
function initializeResumeLinks() {
    const resumeLinks = document.querySelectorAll('.resume-link[data-lang]');
    if (resumeLinks.length === 0) return;

    resumeLinks.forEach(link => {
        const lang = link.getAttribute('data-lang') === 'vi' ? 'vi' : 'en';
        link.href = getResumeUrl(lang);
        link.setAttribute('download', RESUME_CONFIG.downloadFilenames[lang]);

        if (RESUME_CONFIG.openInNewTab) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResumeLinks);
} else {
    initializeResumeLinks();
}
