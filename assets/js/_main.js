/* ==========================================================================
   Site behavior and deferred visual integrations
   ========================================================================== */

/*jslint es6 */
'use strict';

const PLOTLY_URL = 'https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js';
const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
const PLOTLY_LIGHT_TEMPLATE = {
  layout: {
    autotypenumbers: 'strict',
    colorway: ['#126782', '#2a9d8f', '#e76f51', '#6c5ce7', '#b56576'],
    font: { color: '#26343d' },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    xaxis: { gridcolor: '#dfe7ec', linecolor: '#b8c7d0', automargin: true },
    yaxis: { gridcolor: '#dfe7ec', linecolor: '#b8c7d0', automargin: true }
  }
};

let plotlyElements = document.querySelectorAll('pre > code.language-plotly');
let plotlyReady = null;

function loadScriptOnce(url, id) {
  const existing = document.getElementById(id);

  if (existing) {
    return existing.dataset.loaded === 'true'
      ? Promise.resolve()
      : new Promise(function (resolve, reject) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      });
  }

  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.id = id;
    script.src = url;
    script.async = true;
    script.addEventListener('load', function () {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });
}

function renderPlotlyElement(element) {
  let jsonData;

  try {
    jsonData = JSON.parse(element.textContent);
  } catch (error) {
    console.error('Invalid Plotly JSON:', error);
    return;
  }

  element.parentElement.classList.add('hidden');

  let chartElement = element.parentElement.nextElementSibling;
  if (!chartElement || !chartElement.classList.contains('plotly-chart')) {
    chartElement = document.createElement('div');
    chartElement.className = 'plotly-chart';
    element.parentElement.after(chartElement);
  }

  jsonData.layout = jsonData.layout || {};
  jsonData.layout.template = jsonData.layout.template
    ? { ...PLOTLY_LIGHT_TEMPLATE, ...jsonData.layout.template }
    : PLOTLY_LIGHT_TEMPLATE;

  window.Plotly.react(
    chartElement,
    jsonData.data || [],
    jsonData.layout,
    { responsive: true, displaylogo: false }
  );
}

function initializePlotly() {
  if (plotlyElements.length === 0) {
    return Promise.resolve();
  }

  plotlyReady = plotlyReady || loadScriptOnce(PLOTLY_URL, 'plotly-library')
    .then(function () {
      plotlyElements.forEach(renderPlotlyElement);
    })
    .catch(function (error) {
      console.error('Plotly could not be loaded:', error);
    });

  return plotlyReady;
}

function initializeMermaid() {
  if (document.querySelectorAll('pre > code.language-mermaid').length === 0) {
    return;
  }

  const moduleScript = document.createElement('script');
  moduleScript.type = 'module';
  moduleScript.textContent = `
    import mermaid from '${MERMAID_URL}';
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    await mermaid.run({ querySelector: 'code.language-mermaid' });
  `;
  document.body.appendChild(moduleScript);
}

function initializeSmoothAnchors() {
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    let target;
    try {
      target = document.querySelector(hash);
    } catch (error) {
      return;
    }
    if (!target) return;

    event.preventDefault();
    const masthead = document.querySelector('.masthead');
    const offset = masthead ? masthead.getBoundingClientRect().height + 12 : 12;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    window.history.pushState(null, '', hash);
  });
}

$(document).ready(function () {
  const profileButton = $('.author__urls-wrapper button');
  const profileLinks = $('.author__urls');

  profileButton.on('click', function () {
    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', String(!expanded));
    profileLinks.toggle();
  });

  $(window).on('resize', function () {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      profileLinks.removeAttr('style');
      profileButton.attr('aria-expanded', 'false');
    }
  });

  initializeSmoothAnchors();
  initializePlotly();
  initializeMermaid();
});
