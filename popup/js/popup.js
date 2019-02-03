(() => {
  document
  .getElementById('clickable')
  .addEventListener('click', function(e) {
    chrome.tabs.create({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    });
  window.close();
  })
})()
