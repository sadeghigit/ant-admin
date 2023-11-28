import type { Metadata } from 'next'
import '../../public/globals.css'
import Apollo from './apollo'
import { App } from 'antd';

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
