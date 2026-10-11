import { renderContextSection } from './frontend/context_section.js';
import { exampleTabTemplate } from './frontend/example_tab.js';
import { mathTabTemplate } from './frontend/math_tab.js';
import { codeTabTemplate } from './frontend/code_tab.js';
import { executeExample } from './frontend/execution_results.js';

const tabIds = ['example-tab', 'math-tab', 'code-tab'];

function mountTemplate(mountId, template) {
  document.getElementById(mountId).innerHTML = template;
}

function mountPage() {
  mountTemplate('context-mount', renderContextSection());
  mountTemplate('example-mount', exampleTabTemplate);
  mountTemplate('math-mount', mathTabTemplate);
  mountTemplate('code-mount', codeTabTemplate);
}

function selectTab(tabId, focusTab = false) {
  for (const currentId of tabIds) {
    const tab = document.getElementById(currentId);
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    const isSelected = currentId === tabId;

    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    panel.hidden = !isSelected;
  }

  if (focusTab) {
    document.getElementById(tabId).focus();
  }
}

function tabIdForPanel(panelId) {
  return tabIds.find((tabId) => (
    document.getElementById(tabId).getAttribute('aria-controls') === panelId
  ));
}

function bindTabs() {
  for (const tabId of tabIds) {
    const tab = document.getElementById(tabId);
    tab.addEventListener('click', () => selectTab(tabId));
    tab.addEventListener('keydown', (event) => {
      const currentIndex = tabIds.indexOf(tabId);
      const destinations = {
        ArrowLeft: (currentIndex - 1 + tabIds.length) % tabIds.length,
        ArrowRight: (currentIndex + 1) % tabIds.length,
        Home: 0,
        End: tabIds.length - 1,
      };

      if (event.key in destinations) {
        event.preventDefault();
        selectTab(tabIds[destinations[event.key]], true);
      }
    });
  }
}

function bindStudyLinks() {
  for (const link of document.querySelectorAll('a[data-tab-target]')) {
    link.addEventListener('click', () => {
      selectTab(tabIdForPanel(link.dataset.tabTarget));
    });
  }
}

function initialize() {
  mountPage();
  bindTabs();
  bindStudyLinks();
  selectTab('example-tab');
}

initialize();
void executeExample(async () => {
  let bridge;
  try {
    bridge = await import('./qollab_bridge.js');
  } catch (cause) {
    const error = new Error('The Qollab Python bridge could not be loaded.', { cause });
    error.code = 'QOLLAB_RUNTIME_UNAVAILABLE';
    throw error;
  }
  return bridge.runWholeExample();
});
