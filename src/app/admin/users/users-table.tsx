"use client"

import { Space, Table, Tag } from "antd";
import { gql, useQuery } from '@apollo/client';
import UpdateUser from "./update-user";
import DeleteUser from "./delete-user";
import { useContext, useEffect } from "react";
import moment from "moment-jalaali"
import { MittContext } from "../layout";

const QUERY = gql`
query {
  getUsers{ id createdAt updatedAt mobile userRole}
}
`;

export default function UsersTable() {
  const emitter = useContext(MittContext);

  const { loading, data, refetch } = useQuery(QUERY);

  useEffect(() => {
    emitter.on('usersChanged', () => refetch())
    return () => emitter.off('usersChanged')
  })

  return (
    <Table
      rowKey={'id'}
      loading={loading}
      dataSource={data?.getUsers || []}
      columns={[
        {
          dataIndex: "mobile", title: "Mobile",
          sorter: true
        },
        {
          dataIndex: "userRole", title: "Role",
          width: 100, sorter: true,
          render(value) {
            if (value == "ADMIN") return <Tag color="red">Admin</Tag>
            if (value == "MEMBER") return <Tag color="green">Member</Tag>
          }
        },
        {
          dataIndex: "createdAt", title: "Created At",
          width: 141, sorter: true,
          render(value) {
            return moment(value).format('jYYYY/jMM/jDD HH:mm')
          }
        },
        {
          dataIndex: "updatedAt", title: "Updated At",
          width: 141, sorter: true,
          render(value) {
            return moment(value).format('jYYYY/jMM/jDD HH:mm')
          }
        },
        {
          dataIndex: "id", title: "Action",
          width: 160,
          render(value) {
            return (
              <Space>
                <UpdateUser id={value} />
                <DeleteUser id={value} />
              </Space>
            )
          }
        },
      ]}
    />
  )
}
