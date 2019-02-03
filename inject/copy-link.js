document.querySelectorAll('*[class^=meta-group]').forEach(x => {
  const whitelist = ['striped-list-info', 'post-meta', 'comment-meta']
  if (!whitelist.includes(x.parentElement.className)) return

  const list = document.createElement('li')
  list.className = 'meta-data'

  const button = document.createElement('a')
  button.appendChild(document.createTextNode('Copy URL'))
  button.setAttribute('role', 'button') // this is zendesk's styling for buttons

  button.addEventListener('click', () => {
    let id

    switch (x.parentElement.className) {
      case 'striped-list-info': {
        id = x.parentElement.querySelector('*[class^=striped-list-title]').getAttribute('href')
        break
      }
      case 'post-meta': {
        id = window.location.href
        break
      }
      case 'comment-meta': {
        const node = [...document.querySelectorAll('*[id^=community_comment]')].filter(y => y.contains(button))[0]
        id = node.querySelector('*[data-action^=show-permalink]').href
        break
      }
      default: return console.warn('[DFB+ LinkCopy] Unknown classname clicked!')
    }

    navigator.clipboard.writeText(id).then(() => {
      button.innerHTML = 'Copied!'
      button.setAttribute('aria-selected', 'true')
    }).catch(e => {
      console.error(e)
      button.innerHTML = 'Failed to copy :('
    })
    setTimeout(() => { 
      button.innerHTML = 'Copy URL'
      button.setAttribute('aria-selected', 'false')
    }, 5000)
  })

  list.append(button)
  x.append(list)
})