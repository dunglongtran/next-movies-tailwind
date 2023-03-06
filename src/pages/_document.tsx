import { Html, Head, Main, NextScript } from 'next/document'

import { Container } from '@mui/material'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-[#05161E] text-white">
        <Container maxWidth="xl">
          <Main />
        </Container>
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
