import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
function _createMdxContent(props) {
  const _components = {
    h1: 'h1',
    ...props.components,
  }
  return _jsxs(_Fragment, {
    children: [
      _jsx(_components.h1, {
        children: 'Lorem ipsum',
      }),
      '\n',
      _jsx('img', {
        src: new URL('./shinjuku.jpg', import.meta.url).href,
        style: {
          width: '50vw',
          height: 'auto',
        },
      }),
    ],
  })
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout
    ? _jsx(MDXLayout, {
        ...props,
        children: _jsx(_createMdxContent, {
          ...props,
        }),
      })
    : _createMdxContent(props)
}
