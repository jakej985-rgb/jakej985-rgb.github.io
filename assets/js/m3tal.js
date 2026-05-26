document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Global Header/Navbar if placeholder exists
  const headerPlaceholder = document.getElementById('m3tal-global-header');
  if (headerPlaceholder) {
    const currentPath = window.location.pathname;
    
    // Determine active tab
    let homeActive = '';
    let docsActive = '';
    let pluginsActive = '';
    let installActive = '';
    
    if (currentPath === '/' || currentPath.endsWith('index.html') && !currentPath.includes('/projects/')) {
      homeActive = 'active';
    } else if (currentPath.includes('/m3tal-docs/')) {
      docsActive = 'active';
    } else if (currentPath.includes('/m3tal-plugin-page/')) {
      pluginsActive = 'active';
    } else if (currentPath.includes('/m3tal-apt-key/')) {
      installActive = 'active';
    }

    headerPlaceholder.innerHTML = `
      <nav class="m3tal-nav">
        <a href="/" class="m3tal-nav-brand">
          🚀 <span>M3TAL</span> Ecosystem
        </a>
        <ul class="m3tal-nav-links">
          <li><a href="/" class="m3tal-nav-link ${homeActive}">Home</a></li>
          <li><a href="/m3tal-docs/" class="m3tal-nav-link ${docsActive}">Docs</a></li>
          <li><a href="/m3tal-plugin-page/" class="m3tal-nav-link ${pluginsActive}">Plugins</a></li>
          <li><a href="/m3tal-apt-key/" class="m3tal-nav-link ${installActive}">Install</a></li>
          <li><a href="https://github.com/jakej985-rgb" class="m3tal-nav-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>
    `;
  }

  // 2. Inject Global Footer if placeholder exists
  const footerPlaceholder = document.getElementById('m3tal-global-footer');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="m3tal-footer">
        <p>&copy; ${new Date().getFullYear()} M3TAL Ecosystem. Open source under the MIT License.</p>
      </footer>
    `;
  }

  // 3. Setup Copy Code Buttons
  setupCopyButtons();
});

function setupCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentNode;
    if (pre && pre.tagName === 'PRE') {
      // Avoid duplicate buttons
      if (pre.querySelector('.m3tal-copy-btn')) return;

      const container = document.createElement('div');
      container.className = 'm3tal-code-container';
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(pre);

      const copyBtn = document.createElement('button');
      copyBtn.className = 'm3tal-copy-btn';
      copyBtn.textContent = 'Copy';
      container.appendChild(copyBtn);

      copyBtn.addEventListener('click', () => {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.textContent = 'Copied!';
          copyBtn.style.borderColor = 'var(--accent-emerald)';
          copyBtn.style.color = 'var(--accent-emerald)';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
          }, 2000);
        }).catch((err) => {
          console.error('Failed to copy text: ', err);
        });
      });
    }
  });
}
