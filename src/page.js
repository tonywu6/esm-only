import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import styled, { css } from 'styled-components'

const fonts = css`
  font-family: Inter, Helvetica Neue, system-ui, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans,
    sans-serif;
`

const Heading = styled.h1`
  ${fonts}
`
const Paragraph = styled.p`
  ${fonts}
`

const Image = styled.img`
  height: auto;
  max-width: 768px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const RE_ESM_SH =
  /^https:\/\/esm\.sh\/[^/]+\/(?<identifier>(?:@[^/]+\/)?[^/]+@[^/]+)\/.+$/

/**
 * @typedef {Object} ResolveStaticOptions
 * @property {string} name
 * @property {string | undefined} base
 * @property {() => string} fallback
 *
 * @param {ResolveStaticOptions} options
 * @returns {string | undefined}
 */
function resolveStatic({ name, base, fallback }) {
  if (base) {
    const match = RE_ESM_SH.exec(base)
    if (match) {
      const { identifier } = match.groups
      return new URL(name, `https://cdn.esm.sh/${identifier}/`).href
    }
  }
  try {
    return fallback()
  } catch (e) {
    return undefined
  }
}

export default function Page() {
  return jsxs(Fragment, {
    children: [
      jsx(Heading, {
        children: 'Shinjuku, Tokyo',
      }),
      jsx(Image, {
        src: resolveStatic({
          name: 'assets/shinjuku.jpg',
          base: import.meta.url,
          fallback: () =>
            new URL('../assets/shinjuku.jpg', import.meta.url).href,
        }),
        width: 3400,
        height: 1858,
      }),
      jsx(Paragraph, {
        children: jsx('a', {
          href: 'https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg',
          target: '_blank',
          children: 'CC BY-SA 3.0',
        }),
      }),
      jsxs(Paragraph, {
        children: [
          'Powered by ',
          jsx('a', {
            href: 'https://esm.sh',
            target: '_blank',
            children: 'esm.sh',
          }),
        ],
      }),
      jsx(Paragraph, {
        children: jsx('a', {
          href: 'https://github.com/tonywu6/esm-only/blob/main/src/page.js',
          children: 'Source code for this page',
        }),
      }),
    ],
  })
}
