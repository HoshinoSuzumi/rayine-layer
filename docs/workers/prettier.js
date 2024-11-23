// ref: https://github.com/nuxt/ui/blob/f3632ddee511f0fccb24d4fc37403421e84ffdae/docs/workers/prettier.js
/* eslint-disable no-undef */
self.onmessage = async function (event) {
  self.postMessage({
    uid: event.data.uid,
    message: await handleMessage(event.data.message),
  })
}

function handleMessage(message) {
  switch (message.type) {
    case 'format':
      return handleFormatMessage(message)
  }
}

async function handleFormatMessage(message) {
  if (!globalThis.prettier) {
    await Promise.all([
      import('https://unpkg.com/prettier@3.3.3/standalone.js'),
      import('https://unpkg.com/prettier@3.3.3/plugins/html.js'),
      import('https://unpkg.com/prettier@3.3.3/plugins/markdown.js'),
    ])
  }

  const { options, source } = message
  const formatted = await prettier.format(source, {
    parser: 'markdown',
    plugins: prettierPlugins,
    ...options,
  })

  return formatted
}
