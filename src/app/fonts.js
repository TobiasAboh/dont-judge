// app/fonts.ts
import { Archivo } from 'next/font/google'

export const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '700'], // or any you want
  variable: '--font-archivo', // optional for Tailwind
  display: 'swap',
})
