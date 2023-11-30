import type { Metadata } from 'next'
import Apollo from './apollo'
import { App } from 'antd';
import '../../public/globals.css'

export const metadata: Metadata = {
  title: 'Ant Admin',
  description: 'Open Source Admin Panel',
}

type Props = { children: React.ReactNode }
export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Apollo>
          <App>{children}</App>
        </Apollo>
      </body>
    </html>
  )
}
