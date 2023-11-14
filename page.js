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

export default function Page() {
  return jsxs(Fragment, {
    children: [
      jsx(Heading, {
        children: 'ES module in browser',
      }),
      jsx(Image, {
        src: new URL('./assets/shinjuku.jpg', import.meta.url).href,
      }),
      jsx(Paragraph, {
        children: jsx('a', {
          href: 'https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg',
          target: '_blank',
          children: 'CC BY-SA 3.0',
        }),
      }),
    ],
  })
}
