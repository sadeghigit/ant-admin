"use client"

import { App, Button, Popconfirm } from "antd";
import { gql, useMutation } from '@apollo/client';
import { QuestionCircleOutlined } from "@ant-design/icons"
import { useContext } from "react";
import { MittContext } from "../layout";

const MUTATION = gql`
mutation deleteUser($id: ID!) {
  deleteUser(id: $id) 
}
`;

type Props = { id: string }
export default function DeleteUser({ id }: Props) {
  const emitter = useContext(MittContext);

  const { message } = App.useApp()
  const [mutate] = useMutation(MUTATION);

  function onError(error: any) {
    message.error(error.message)
  }

  function onCompleted() {
    emitter.emit('usersChanged')
  }

  function onConfirm() {
    mutate({ onCompleted, onError, variables: { id } })
  }

  return (
    <Popconfirm
      placement="bottomLeft"
      title="Delete User"
      description="Are you sure, you want to delete user?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => onConfirm()}>
      <Button type="primary" danger size="small">
        Delete
      </Button>
    </Popconfirm>
  )
}
