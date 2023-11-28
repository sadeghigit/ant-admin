"use client"

import { Breadcrumb, Flex } from "antd";
import UsersTable from "./users-table";
import Link from "next/link";
import CreateUser from "./create-user";
import { useState } from "react";

export default function Page() {
  const [refresh,setRefresh] = useState(Math.random())
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
        <CreateUser onSuccess={() => setRefresh(Math.random())} />
      </Flex>
      <UsersTable refresh={refresh} />
    </main>
  )
}
