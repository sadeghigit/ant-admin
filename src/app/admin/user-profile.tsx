"use client"

import { App, Avatar, Button, Drawer, Form, Input } from "antd";
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useState } from "react";
import { UserOutlined } from "@ant-design/icons"
import { MittContext } from "./layout";
import UserImage from "./users/user-image";

const GET_PROFILE = gql`
query getProfile{
  getProfile{ mobile imageUrl }
}
`;

const UPDATE_PROFILE = gql`
mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) 
}
`;

export default function UserProfile() {
  const { message } = App.useApp()
  const emitter = useContext(MittContext);
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)

  const [runGetProfile, getProfile] = useLazyQuery(GET_PROFILE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => form.setFieldsValue(data.getProfile),
    onError: (error) => message.error(error.message)
  });

  function onSaveCompleted() {
    onDrawerClose()
    emitter.emit('usersChanged')
  }

  const [runUpdateProfile, updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: onSaveCompleted,
    onError: (error) => message.error(error.message),
  });

  function onFormSubmit(input: any) {
    runUpdateProfile({ variables: { input } })
  }

  const loading = getProfile.loading || updateProfile.loading

  function onDrawerOpen() {
    runGetProfile()
    setIsOpen(true)
  }

  function onDrawerClose() {
    setIsOpen(false)
    form.resetFields()
  }

  return (
    <>
      <Avatar shape="square" icon={<UserOutlined />}
        onClick={onDrawerOpen} />

      <Drawer open={isOpen} title="Upload Profile"
        width={500} closable={false} onClose={onDrawerClose}>

        <Form form={form} labelAlign="left"
          labelCol={{ style: { minWidth: 100 } }}
          onFinish={onFormSubmit} disabled={loading}>

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
