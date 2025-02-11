chrome.runtime.onConnect.addListener((port) => {
  console.log('Connected to DevTools panel')

  port.onMessage.addListener((msg, sender) => {
    if (msg.type === 'livewire-data') {
      console.log('Received Livewire data:', msg.data)
    }
  })
})
