"use client"

import { App, Button, Popconfirm } from "antd";
import { gql, useMutation } from '@apollo/client';
import * as Icons from "@ant-design/icons"

const MUTATION = gql`
mutation deleteUser($id: ID!) {
  deleteUser(id: $id) 
}
`;

type Props = { id: string, onSuccess: () => void }
export default function DeleteUser({ id, onSuccess }: Props) {
  const { message } = App.useApp()
  const [mutate] = useMutation(MUTATION);

  function onError(error: any) {
    message.error(error.message)
  }

  function onCompleted() {
    if (onSuccess) onSuccess()
  }

  function onConfirm() {
    mutate({ onCompleted, onError, variables: { id } })
  }

  return (
    <Popconfirm
      placement="bottomLeft"
      title="Delete User"
      description="Are you sure, you want to delete user?"
      onConfirm={() => onConfirm()}>
      <Button type="primary" danger size="small">
        Delete
      </Button>
    </Popconfirm>
  )
}
