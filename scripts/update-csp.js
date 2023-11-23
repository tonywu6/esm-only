import { createHash } from 'node:crypto'

import { JSDOM } from 'jsdom'

const cspDirectives = [
  "style-src 'self' 'unsafe-inline' https://rsms.me/",
  "font-src 'self' https://rsms.me/",
  "img-src 'self' https://cdn.esm.sh https://esm.sh https://upload.wikimedia.org",
  'connect-src https://cdn.esm.sh https://esm.sh https://rsms.me',
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
]

// why is it so hard to just read from stdin
const content = await (() => {
  /** @type {string[]} */
  const chunks = []
  return new Promise((resolve, reject) => {
    process.stdin
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      .on('error', reject)
  })
})()

const dom = new JSDOM(content)

/** @type {HTMLMetaElement | null} */
const meta = dom.window.document.querySelector(
  'meta[http-equiv="Content-Security-Policy"]',
)

if (!meta) {
  console.error('No CSP meta tag found')
  console.log(content)
  process.exit(1)
}

try {
  /** @type {string[]} */
  const shasums = []
  dom.window.document.querySelectorAll('script').forEach((script) => {
    const src = script.getAttribute('src')
    if (src) {
      return
    }
    const text = script.textContent
    if (!text) {
      return
    }
    const hash = createHash('sha384').update(text).digest('base64')
    shasums.push(`'sha384-${hash}'`)
  })

  const dynamic = shasums.join(' ')
  const scriptSrc = `script-src 'strict-dynamic' ${dynamic} 'self' https://esm.sh data:`

  meta.content = [...cspDirectives, scriptSrc].join('; ')

  console.log(dom.serialize())
} catch (e) {
  console.error(e)
  console.log(content)
  process.exit(1)
}
