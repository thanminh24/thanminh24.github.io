/**
 * Resume Configuration
 * Centralized config for managing resume links across different hosting options
 * 
 * Choose the best option for your deployment:
 * 1. GitHub Releases (Recommended for GitHub Pages)
 * 2. Google Drive (Easy updates, but requires setup)
 * 3. Local file (Simple, but publicly visible in repo)
 */

const RESUME_CONFIG = {
    // ========================================
    // CHOOSE YOUR HOSTING METHOD
    // ========================================
    // Options: 'github-release', 'google-drive', 'local', 'external'
    hosting: 'github-release',

    // ========================================
    // CONFIGURATION FOR EACH METHOD
    // ========================================

    // Option 1: GitHub Releases (RECOMMENDED for privacy)
    // Upload your CV as a release asset
    // URL format: https://github.com/USERNAME/REPO/releases/download/TAG/resume.pdf
    githubRelease: {
        username: 'thanminh24',
        repo: 'thanminh24.github.io',
        tag: 'resume-v1', // Update this when you release a new version
        filename: 'resume.pdf' // Standardized filename
    },

    // Option 2: Google Drive (Easy updates)
    // 1. Upload your CV to Google Drive
    // 2. Right-click → Share → Get link
    // 3. Change to "Anyone with the link can view"
    // 4. Extract the FILE_ID from the link
    // Link format: https://drive.google.com/file/d/FILE_ID/view
    googleDrive: {
        fileId: 'YOUR_FILE_ID_HERE', // Replace with your Google Drive file ID
        // For direct download (recommended):
        useDirectDownload: true
    },

    // Option 3: Local file (Simplest, but public in repo)
    local: {
        filename: 'resume.pdf' // Use standardized filename
    },

    // Option 4: External hosting (Dropbox, Cloudinary, etc.)
    external: {
        url: 'https://your-hosting-service.com/resume.pdf'
    },

    // ========================================
    // DOWNLOAD SETTINGS
    // ========================================
    downloadFilename: 'ThanTueMinh_Resume.pdf', // Filename when user downloads
    openInNewTab: true
};

/**
 * Get the resume URL based on configured hosting method
 */
function getResumeUrl() {
    switch (RESUME_CONFIG.hosting) {
        case 'github-release':
            const { username, repo, tag, filename } = RESUME_CONFIG.githubRelease;
            return `https://github.com/${username}/${repo}/releases/download/${tag}/${filename}`;

        case 'google-drive':
            const { fileId, useDirectDownload } = RESUME_CONFIG.googleDrive;
            if (useDirectDownload) {
                // Direct download link (recommended)
                return `https://drive.google.com/uc?export=download&id=${fileId}`;
            } else {
                // View link (opens in Google Drive viewer)
                return `https://drive.google.com/file/d/${fileId}/view`;
            }

        case 'local':
            return RESUME_CONFIG.local.filename;

        case 'external':
            return RESUME_CONFIG.external.url;

        default:
            console.error('Invalid hosting method configured');
            return '#';
    }
}

/**
 * Initialize resume link when page loads
 */
function initializeResumeLink() {
    // Nav button (#resumeBtn) plus any additional links marked with .resume-link (e.g. hero CTA)
    const resumeLinks = document.querySelectorAll('#resumeBtn, .resume-link');
    if (resumeLinks.length === 0) return;

    const url = getResumeUrl();

    resumeLinks.forEach(link => {
        link.href = url;

        // Always set download attribute with custom filename
        // This ensures the file downloads as "ThanTueMinh_Resume.pdf"
        // even if the source file is named "resume.pdf"
        link.setAttribute('download', RESUME_CONFIG.downloadFilename);

        if (RESUME_CONFIG.openInNewTab) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    console.log('Resume links initialized:', url, '→', RESUME_CONFIG.downloadFilename);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResumeLink);
} else {
    initializeResumeLink();
}
