// Test-preview only. Observe the committed React document, then expose an inert
// JSON report for browser inspection; no audit code is shipped in dist.
(() => {
  let started = false;
  const observer = new MutationObserver(check);
  observer.observe(document.body, { childList: true, subtree: true });
  function check() {
    if (started || !document.querySelector('main h1')) return;
    started = true;
    observer.disconnect();
    setTimeout(async () => {
      const report = document.createElement('script');
      report.type = 'application/json';
      report.id = 'accessibility-report';
      try {
        const results = await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
        });
        report.textContent = JSON.stringify({
          engine: results.testEngine, url: location.href,
          viewport: { width: innerWidth, height: innerHeight },
          violations: results.violations, incomplete: results.incomplete,
          passedRules: results.passes.map(rule => rule.id),
        });
      } catch (error) {
        report.textContent = JSON.stringify({ error: String(error) });
      }
      document.body.appendChild(report);
    }, 500);
  }
  check();
})();
