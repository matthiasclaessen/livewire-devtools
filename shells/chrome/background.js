// These will store our active connections.
let contentPort = null;
let devtoolsPort = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'livewire-debugger') {
    // This port comes from the content script.
    contentPort = port;
    console.log('Livewire Debugger: Content script connected.');

    port.onMessage.addListener((message) => {
      console.log('Background received data from content script:', message);
      // Relay the message to the devtools port if available.
      if (devtoolsPort) {
        devtoolsPort.postMessage(message);
      }
    });

    port.onDisconnect.addListener(() => {
      console.warn('Livewire Debugger: Content script disconnected.');
      contentPort = null;
    });
  } else if (port.name === 'livewire-devtools') {
    // This port comes from the DevTools page.
    devtoolsPort = port;
    console.log('Livewire Debugger: DevTools connected.');

    port.onMessage.addListener((message) => {
      // (Optional) Handle messages from DevTools if needed.
      console.log('Background received message from DevTools:', message);
    });

    port.onDisconnect.addListener(() => {
      console.warn('Livewire Debugger: DevTools disconnected.');
      devtoolsPort = null;
    });
  }
});
