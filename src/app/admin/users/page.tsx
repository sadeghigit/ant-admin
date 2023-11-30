"use client"

import { Breadcrumb, Flex } from "antd";
import UsersTable from "./users-table";
import Link from "next/link";
import CreateUser from "./create-user";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <Flex justify="space-between"
        style={{ marginBottom: 16 }}>
        <Breadcrumb
          items={[
            { title: <Link href={'/admin'}>Dashboard</Link>, },
            { title: "Users", },
          ]}
        />
        <CreateUser />
      </Flex>
      <UsersTable />
    </main>
  )
}
