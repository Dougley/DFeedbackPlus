const results = document.querySelectorAll('*[class^=search-results-list]')[1].querySelectorAll('*[class^=meta-group]')

const createURLButton = (x, opts) => {
  const list = document.createElement('li')
  list.className = 'meta-data'

  const button = document.createElement('a')
  button.appendChild(document.createTextNode('Copy URL'))
  button.setAttribute('role', 'button') // this is zendesk's styling for buttons

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(`${opts.url.origin}/${opts.ref}`).then(() => {
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
}

const createIDButton = (x, opts) => {
  const list = document.createElement('li')
  list.className = 'meta-data'

  const button = document.createElement('a')
  button.appendChild(document.createTextNode('Copy ID'))
  button.setAttribute('role', 'button') // this is zendesk's styling for buttons

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(opts.id).then(() => {
      button.innerHTML = 'Copied!'
      button.setAttribute('aria-selected', 'true')
    }).catch(e => {
      console.error(e)
      button.innerHTML = 'Failed to copy :('
    })
    setTimeout(() => { 
      button.innerHTML = 'Copy ID'
      button.setAttribute('aria-selected', 'false')
    }, 5000)
  })

  list.append(button)
  x.append(list)
}

results.forEach(x => {
  const ref = new URL(x.parentNode.querySelector('*[class^=search-result-link]').href)
  const url = new URLSearchParams(ref.search)
  const data = url.get('data')
  const enc = new TextDecoder()
  
  const decoded = enc.decode(base64js.toByteArray(data))
  const id = decoded.match(/hc\/[-a-zA-Z]+\/community\/posts\/(\d{12,})(?:-[\w-]+)?/)

  createIDButton(x, {
    id: id[1]
  })
  createURLButton(x, {
    ref: id[0],
    url: ref
  })
})

