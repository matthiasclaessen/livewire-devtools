(() => {
  // Flag to ensure we only initialize once
  let livewireInitialized = false;

  // Detects Livewire components on the page.
  function detectLivewireComponents () {
    // Check if Livewire exists and is properly initialized (i.e. has the 'all' method)
    if (!window.Livewire || typeof window.Livewire.all !== 'function') {
      console.warn('Livewire is not fully initialized yet.');
      return []; // Return an empty array if Livewire isn't ready
    }

    // Retrieve all Livewire components and convert them into an array.
    const components = Object.values(window.Livewire.all() || {});

    console.log(components);

    // Map each component to a simplified object containing only useful debugging info.
    return components.map(component => ({
      id: component.id,
      name: component.name,
      state: component.snapshot.data
    }));
  }

  // Sends the detected Livewire components data to the window via postMessage.
  function sendLivewireData () {
    const data = detectLivewireComponents();
    // Send a message with type 'LIVEWIRE_DEBUG' containing the data.
    window.postMessage({type: 'LIVEWIRE_DEBUG', data}, '*');
  }

  // Listen for the Livewire custom event that signals Livewire 3 has loaded.
  document.addEventListener('livewire:loaded', () => {
    livewireInitialized = true;
    console.log('Livewire Debugger: Livewire 3 initialized.');
    // Send initial data once Livewire is ready.
    sendLivewireData();
    // Continue to send updated data every 2 seconds.
    setInterval(sendLivewireData, 2000);
  });

  // Fallback check: In case Livewire is already initialized without emitting 'livewire:loaded'
  if (!livewireInitialized && window.Livewire && typeof window.Livewire.all === 'function') {
    const components = detectLivewireComponents();
    // If any components are found, assume Livewire is initialized.
    if (components.length > 0) {
      console.log('Livewire Debugger: Livewire 3 initialized but not through "livewire:loaded".');
      livewireInitialized = true;
      sendLivewireData();
      // Start sending component data every 2 seconds.
      setInterval(sendLivewireData, 2000);
    }
  }
})();
