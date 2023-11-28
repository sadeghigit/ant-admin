"use client"

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { App, Button, Form, Input, Typography } from "antd";
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
mutation loginPassword($input: LoginPasswordInput!) {
  loginPassword(input: $input) {
    accessToken expiresIn refreshToken
  }
}
`;

export default function LoginForm() {
  const { message } = App.useApp()
  const router = useRouter()
  const [mutate, { loading }] = useMutation(MUTATION);

  function onError(error: any) {
    message.error(error.message)
  }

  function onCompleted(data: any) {
    const { accessToken, expiresIn, refreshToken } = data.loginPassword
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken, { maxAge: expiresIn });
    router.replace('/admin')
  }

  function onFinish(input: any) {
    mutate({ onCompleted, onError, variables: { input } })
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Typography.Title level={4}>
        Login Form
      </Typography.Title>
      <Form.Item label="Mobile"
        name={'mobile'}
        rules={[
          { required: true, message: " Mobile is required" },
          { pattern: /^09[0-9]{9}$/, message: " Mobile is invalid" },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password"
        name={'password'}
        rules={[
          { required: true, message: " Password is required" }
        ]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" block htmlType="submit"
        loading={loading}>Login</Button>
    </Form>
  )
}
