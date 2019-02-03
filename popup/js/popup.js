(() => {
  document
  .getElementById('veryLegitMenuOption')
  .addEventListener('click', function(e) {
    chrome.tabs.create({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    });
  window.close();
  })
  
  document
  .getElementById('sourceCodeOption')
  .addEventListener('click', function(e) {
    chrome.tabs.create({
        url: 'https://github.com/Dougley/DFeedbackPlus'
    });
  window.close();
  })
})()
