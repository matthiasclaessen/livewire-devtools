// Create the DevTools panel (required by the DevTools API)
chrome.devtools.panels.create(
  'Livewire',
  'icons/icon48.png',
  'src/devtools.html',
  panel => {
    console.log('Livewire Debugger panel created');
  }
);

// Establish a persistent connection to the background script.
const devtoolsPort = chrome.runtime.connect({name: 'livewire-devtools'});

// Listen for messages forwarded from the background.
devtoolsPort.onMessage.addListener(message => {
  if (message.type === 'LIVEWIRE_DEBUG') {
    updateComponentsList(message.data);
  }
});

// Render the list of Livewire components in the left sidebar. Each component is represented like an HTML tag.
function updateComponentsList (data) {
  const list = document.querySelector('.components__list');
  list.innerHTML = ''; // Clear previous list

  if (!data || data.length === 0) {
    list.innerHTML = '<div class="list__empty">No components found.</div>';
    return;
  }

  data.forEach(component => {
    // Format the component as an HTML tag: <component-name>
    const div = document.createElement('div');
    div.innerHTML = `<span class="item__bracket"><</span>${component.name}<span>></span>`;

    // When a component is clicked, highlight it and display its state.
    div.addEventListener('click', () => {
      // Remove active class from all list items.
      document.querySelectorAll('.components__list li').forEach(item => {
        item.classList.remove('active');
      });

      div.classList.add('active');
      updateComponentDetails(component);
    });

    list.appendChild(div);
  });
}

// Render the state of the selected component in the right panel.
function updateComponentDetails (component) {
  const details = document.querySelector('.details__content');
  details.innerHTML = ''; // Clear previous details

  // Header with component name and ID.
  const header = document.createElement('h3');
  header.textContent = `<${component.name}>`;
  details.appendChild(header);

  // Render the 'data' property as the component state.
  const stateSection = document.createElement('div');
  stateSection.innerHTML = '<h4>State</h4>';
  // stateSection.appendChild(renderObject(component.state));
  // const objectType = document.createElement('span');
  // objectType.textContent = typeof component.state;
  // stateSection.appendChild(objectType);
  // details.appendChild(stateSection);
}

// Recursively renders an object (or array) into nested HTML elements.
// function renderObject (obj) {
// const container = document.createElement('div');
// container.classList.add('details-object');
//
// if (obj === null || obj === undefined) {
//   container.textContent = 'null';
//   return container;
// }

// For primitive values, simply show the text.
// if (typeof obj !== 'object') {
//   container.textContent = obj;
//   return container;
// }

// For arrays, render each item.
// if (Array.isArray(obj)) {
//   const ul = document.createElement('ul');
//   obj.forEach((item, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${index}: `;
//     li.appendChild(renderObject(item));
//     ul.appendChild(li);
//   });
//   container.appendChild(ul);
//   return container;
// }

// For objects, render each key-value pair.
// for (const key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const div = document.createElement('div');
//     const keySpan = document.createElement('span');
//     keySpan.classList.add('key');
//     keySpan.textContent = key + ': ';
//     div.appendChild(keySpan);
//     div.appendChild(renderObject(obj[key]));
//     container.appendChild(div);
//   }
// }

//   return container;
// }
