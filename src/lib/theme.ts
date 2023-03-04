import { Inter } from 'next/font/google'

import { createTheme } from '@mui/material/styles'

export const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
export const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: inter.style.fontFamily,
  },
})
