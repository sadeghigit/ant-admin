"use client"

import { App, Button, Drawer, Form, Input, Select } from "antd";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from "react";

const MUTATION = gql`
mutation updateUser($id:ID!,$input: UpdateUserInput!) {
  updateUser(id:$id, input: $input) 
}
`;

const QUERY = gql`
query getUser($id:ID!){
  getUser(id:$id){ mobile userRole }
}
`;

type Props = { id: string, onSuccess: () => void }
export default function UpdateUser({ id, onSuccess }: Props) {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)
  const { message } = App.useApp()

  function onError(error: any) {
    message.error(error.message)
  }

  function onLoadCompleted(data: any) {
    form.setFieldsValue(data.getUser)
  }

  const { loading } = useQuery(QUERY, {
    onCompleted: onLoadCompleted,
    onError, variables: { id }
  });

  function onSaveCompleted(data: any) {
    setIsOpen(false)
    if (onSuccess) onSuccess()
  }

  const [mutate, { loading: saving }] = useMutation(MUTATION);

  function onFinish(input: any) {
    mutate({
      onCompleted: onSaveCompleted,
      onError, variables: { input, id }
    })
  }

  return (
    <>
      <Button type="primary" size="small" onClick={() => setIsOpen(!isOpen)}>
        Update
      </Button>
      <Drawer open={isOpen} title="Update User"
        onClose={() => setIsOpen(false)}>

        <Form layout="vertical" onFinish={onFinish} form={form} disabled={loading}>

          <Form.Item
            label="Mobile"
            name={'mobile'}
            rules={[
              { required: true, message: " Mobile is required" },
              { pattern: /^09[0-9]{9}$/, message: " Mobile is invalid" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={'password'}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name={'userRole'}
            rules={[
              { required: true, message: "Role is required" }
            ]}>
            <Select options={[
              { label: "Admin", value: "ADMIN" },
              { label: "Member", value: "MEMBER" },
            ]} />
          </Form.Item>
          <Button type="primary" htmlType="submit"
            loading={loading || saving}>Save</Button>
        </Form>
      </Drawer>
    </>
  )
}
