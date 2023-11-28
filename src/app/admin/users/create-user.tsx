"use client"

import { App, Button, Drawer, Form, Input, Select } from "antd";
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";

const MUTATION = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) { id}
}
`;

type Props = { onSuccess: () => void }
export default function CreateUser({ onSuccess }: Props) {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  const { message } = App.useApp()
  const [mutate, { loading }] = useMutation(MUTATION);

  function onError(error: any) {
    message.error(error.message)
  }

  function onCompleted(data: any) {
    setIsOpen(false)
    if (onSuccess) onSuccess()
    form.resetFields()
  }

  function onFinish(input: any) {
    mutate({ onCompleted, onError, variables: { input } })
  }

  return (
    <>
      <Button type="primary"
        onClick={() => setIsOpen(!isOpen)}>
        Create User
      </Button>

      <Drawer open={isOpen} title="Create User"
        onClose={() => setIsOpen(false)}>

        <Form form={form} layout="vertical" onFinish={onFinish} disabled={loading}>

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
            name={'password'}
            rules={[
              { required: true, message: " Password is required" }
            ]}>
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
            loading={loading}>Save</Button>
        </Form>
      </Drawer>
    </>
  )
}
