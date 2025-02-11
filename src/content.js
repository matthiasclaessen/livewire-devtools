(() => {
  function detectLivewireComponents () {
    if (window.Livewire) {
      const components = Object.values(window.Livewire.components.components)
      return components.map(comp => ({
        id: comp.id,
        name: comp.name,
        data: comp.effects || {},
        fingerprint: comp.fingerprint
      }))
    }
    return []
  }

  function sendLivewireData () {
    const data = detectLivewireComponents()
    window.postMessage({type: 'LIVEWIRE_DEBUG', data}, '*')
  }

  setInterval(sendLivewireData, 2000) // Poll every 2 seconds

  console.log('Livewire Debugger: Listening for components...')
})()
