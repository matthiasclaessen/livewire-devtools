(() => {
  // Inject the debugging script into the page's context.
  const injectScript = () => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('src/inject.js');

    // Clean up the injected script after it loads.
    script.onload = function () {
      this.remove();
    };

    // Handle script loading errors.
    script.onerror = function (err) {
      console.error('Livewire Debugger: Failed to inject the script.', err);
      this.remove();
    };

    document.documentElement.appendChild(script);
  };

  // Establish a connection to the extension.
  const connectToExtension = () => {
    try {
      let port = chrome.runtime.connect({name: 'livewire-debugger'});

      // Reconnect if the extension context disconnects.
      port.onDisconnect.addListener(() => {
        console.warn('Livewire Debugger: Extension context invalidated. Reconnecting...');
        setTimeout(() => {
          port = connectToExtension(); // Update the global 'port' variable.
        }, 1000);
      });

      return port;
    } catch (err) {
      console.error('Livewire Debugger: Could not connect to the extension.', err);
      return null;
    }
  };

  // Initialize the connection.
  let port = connectToExtension();

  // Handle messages sent from the injected script.
  const handleLivewireData = (event) => {
    // Only process messages from the current window and of the expected type.
    if (event.source !== window || !event.data || event.data.type !== 'LIVEWIRE_DEBUG') {
      return;
    }

    // Optional: Validate event.origin if necessary.
    // if (event.origin !== window.location.origin) return;

    if (port) {
      try {
        port.postMessage(event.data);
      } catch (err) {
        console.warn('Livewire Debugger: Failed to send message, reconnecting...', err);
        port = connectToExtension();
      }
    }
  };

  // Listen for messages from the injected script.
  window.addEventListener('message', handleLivewireData, false);

  // Start by injecting the debugging script.
  injectScript();
})();
