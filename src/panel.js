chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'LIVEWIRE_DEBUG') {
    document.getElementById('livewire-data').innerText = JSON.stringify(message.data, null, 2)
  }
})
