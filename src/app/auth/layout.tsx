"use client"

import { Layout as AntLayout } from "antd"

type Props = { children: React.ReactNode }
export default function Layout({ children }: Props) {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout>
        <AntLayout.Content>
          {children}
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  )
}
