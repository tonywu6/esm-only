import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

import Page from './page.js'

createRoot(document.getElementById('root')).render(createElement(Page))
