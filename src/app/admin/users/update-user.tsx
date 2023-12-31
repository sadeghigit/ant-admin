"use client"

import { App, Button, Drawer, Form, Input, Select } from "antd";
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useState } from "react";
import { MittContext } from "../layout";
import UserImage from "./user-image";

const GET_USER = gql`
query getUser($id:ID!){
  getUser(id:$id){ mobile userRole imageUrl }
}
`;

const UPDATE_USER = gql`
mutation updateUser($id:ID!,$input: UpdateUserInput!) {
  updateUser(id:$id, input: $input) 
}
`;

type Props = { id: string }
export default function UpdateUser({ id }: Props) {
  const emitter = useContext(MittContext);
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  const [runGetUser, getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
    onCompleted: (data) => form.setFieldsValue(data.getUser),
    onError: (error) => message.error(error.message),
  });

  function onSaveCompleted() {
    onDrawerClose()
    emitter.emit('usersChanged')
  }

  const [runUpdateUser, updateUser] = useMutation(UPDATE_USER, {
    onCompleted: onSaveCompleted,
    onError: (error) => message.error(error.message),
  });

  function onFormSubmit(input: any) {
    runUpdateUser({ variables: { input, id } })
  }

  function onDrawerOpen() {
    setIsOpen(true)
    runGetUser({ variables: { id } })
  }

  function onDrawerClose() {
    setIsOpen(false)
    form.resetFields()
  }

  const loading = getUser.loading || updateUser.loading

  return (
    <>
      <Button type="primary" size="small" onClick={onDrawerOpen}>
        Update
      </Button>

      <Drawer open={isOpen} title="Upload User"
        width={500} closable={false} onClose={onDrawerClose}>

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
            <UserImage />
          </Form.Item>

          <Form.Item label="Password" name={'password'}>
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
