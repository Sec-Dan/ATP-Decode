function decodeUrl() {
    const link = document.getElementById('safelink').value.trim();
    const output = document.getElementById('target_url');

    if (!link) {
        output.value = '';
        return;
    }

    const queryStart = link.indexOf('?');
    if (queryStart === -1) {
        output.value = 'No query string found — paste a full SafeLinks URL.';
        return;
    }

    try {
        const params = new URLSearchParams(link.slice(queryStart + 1));
        const url = params.get('url');

        if (!url) {
            output.value = 'No "url" parameter found in this link.';
            return;
        }

        output.value = decodeURIComponent(url);
    } catch (e) {
        output.value = 'Could not decode URL: ' + e.message;
    }
}

function copyResult() {
    const value = document.getElementById('target_url').value;
    if (!value || !value.startsWith('http')) return;

    navigator.clipboard.writeText(value).then(() => {
        const btn = document.getElementById('copy-btn');
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
    });
}

function clearAll() {
    document.getElementById('safelink').value = '';
    document.getElementById('target_url').value = '';
    document.getElementById('safelink').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('safelink').addEventListener('input', decodeUrl);
});
