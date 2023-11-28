import { Card, Col, Flex, Row } from "antd";
import LoginForm from "./login-form";

export default function Page() {
  return (
    <Row justify={'center'} align={"middle"} style={{ minHeight: "100vh" }} >
      <Col >
        <Card >
          <LoginForm />
        </Card>
      </Col>
    </Row>
  )
}
