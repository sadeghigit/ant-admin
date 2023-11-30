"use client"

import { App, Button, Drawer, Form, Input, Select } from "antd";
import { gql, useMutation } from '@apollo/client';
import { useContext, useState } from "react";
import { MittContext } from "../layout";
import UserImage from "./user-image";

const MUTATION = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) { id }
}
`;

export default function CreateUser() {
  const emitter = useContext(MittContext);
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted: onSaveCompleted,
    onError: (error) => message.error(error.message),
  });

  function onSaveCompleted() {
    onDrawerClose()
    emitter.emit('usersChanged')
  }

  function onFormSubmit(input: any) {
    mutate({ variables: { input } })
  }

  function onDrawerOpen() {
    setIsOpen(true)
  }

  function onDrawerClose() {
    setIsOpen(false)
    form.resetFields()
  }

  return (
    <>
      <Button type="primary" onClick={onDrawerOpen}>
        Create
      </Button>

      <Drawer open={isOpen} title="Create User" width={500}
        closable={false} onClose={onDrawerClose}>

        <Form form={form} labelAlign="left"
          labelCol={{ style: { minWidth: 100 } }}
          onFinish={onFormSubmit} disabled={loading}>

          <Form.Item label="Role" name={'userRole'}
            rules={[
              { required: true, message: "Role is required" }
            ]}>
            <Select options={[
              { label: "Admin", value: "ADMIN" },
              { label: "Member", value: "MEMBER" },
            ]} />
          </Form.Item>

          <Form.Item label="Mobile" name={'mobile'}
            rules={[
              { required: true, message: "Mobile is required" },
              { pattern: /^09[0-9]{9}$/, message: "Mobile is invalid" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Image" name={'imageUrl'}
            rules={[
              { required: true, message: "Image is required" },
            ]}>
            <UserImage open={isOpen} />
          </Form.Item>

          <Form.Item label="Password" name={'password'}
            rules={[
              { required: true, message: "Password is required" }
            ]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit"
            style={{ marginLeft: 100, minWidth: 100 }}
            loading={loading} >
            Save
          </Button>

        </Form>
      </Drawer>
    </>
  )
}
