import type { AppProps } from 'next/app'

import { createEmotionCache } from '@/lib/emotion'
import { theme } from '@/lib/theme'
import '@/styles/globals.css'
import type { EmotionCache } from '@emotion/react'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type MyAppProps = {
  emotionCache?: EmotionCache
} & AppProps

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
