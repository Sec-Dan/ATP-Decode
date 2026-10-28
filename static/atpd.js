// Decoding runs on every keystroke, so only count the first successful decode per page load
let decodeTracked = false;

function decodeUrl() {
    const link = document.getElementById('safelink').value.trim();
    const output = document.getElementById('target_url');

    if (!link) {
        output.value = '';
        output.dataset.state = '';
        return;
    }

    const queryStart = link.indexOf('?');
    if (queryStart === -1) {
        output.value = 'No query string found - paste a full SafeLinks URL.';
        output.dataset.state = 'err';
        return;
    }

    try {
        const params = new URLSearchParams(link.slice(queryStart + 1));
        const url = params.get('url');

        if (!url) {
            output.value = 'No "url" parameter found in this link.';
            output.dataset.state = 'err';
            return;
        }

        output.value = decodeURIComponent(url);
        output.dataset.state = 'ok';

        if (!decodeTracked && window.umami) {
            umami.track('safelink-decode');
            decodeTracked = true;
        }
    } catch (e) {
        output.value = 'Could not decode URL: ' + e.message;
        output.dataset.state = 'err';
    }
}

function copyResult() {
    const value = document.getElementById('target_url').value;
    if (!value || !value.startsWith('http')) return;

    navigator.clipboard.writeText(value).then(() => {
        const btn = document.getElementById('copy-btn');
        btn.textContent = '[copied]';
        setTimeout(() => { btn.textContent = '[copy]'; }, 1500);
    });
}

function clearAll() {
    document.getElementById('safelink').value = '';
    document.getElementById('target_url').value = '';
    document.getElementById('target_url').dataset.state = '';
    document.getElementById('safelink').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('safelink').addEventListener('input', decodeUrl);
});
