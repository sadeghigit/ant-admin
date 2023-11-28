"use client"

import { Layout as AntLayout, Menu } from "antd"
import * as Icons from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logout from "./logout"

type Props = { children: React.ReactNode }
export default function Layout({ children }: Props) {
  const pathname = usePathname()
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout.Sider theme="dark" collapsible collapsedWidth={64}>
        <Menu
          style={{ marginTop: 64 }}
          theme="dark"
          selectedKeys={[pathname]}
          items={[
            { label: <Link href={'/admin'} >Dashboard</Link>, key: "/admin", icon: <Icons.DashboardOutlined /> },
            { label: <Link href={'/admin/users'} >Users</Link>, key: "/admin/users", icon: <Icons.UserOutlined /> },
          ]}
        />
      </AntLayout.Sider>
      <AntLayout>
        <AntLayout.Header style={{ backgroundColor: "#ffffff", padding: "0 24px", textAlign: "right" }}>
          <Logout />
        </AntLayout.Header>
        <AntLayout.Content>
          {children}
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>

  )
}
