window.addEventListener('error', (event) => {
  const errors = document.getElementById('errors')
  if (!errors) {
    return
  }
  errors.textContent = `Uncaught:\n${event.error.stack}`
  errors.style.display = 'block'
})

setTimeout(() => {
  const fallback = document.getElementById('fallback')
  if (!fallback) {
    // already rendered
    return
  }
  const notice = document.createElement('span')
  notice.style.color = 'rgb(118 118 118)'
  notice.textContent =
    " If things don't show up, check your internet connection to https://esm.sh"
  fallback.after(notice)
}, 10000)
