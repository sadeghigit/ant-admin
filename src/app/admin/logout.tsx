"use client"

import { Button, Popconfirm } from "antd";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter()

  function onConfirm() {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    router.replace('/auth')
  }

  return (
    <Popconfirm
      placement="bottomLeft"
      title="Logout"
      description="Are you sure, you want to logout?"
      onConfirm={() => onConfirm()}>
      <Button type="primary" danger>
        Logout
      </Button>
    </Popconfirm>
  )
}
