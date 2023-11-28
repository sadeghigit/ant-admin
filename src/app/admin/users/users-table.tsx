"use client"

import { Space, Table } from "antd";
import { gql, useQuery } from '@apollo/client';
import UpdateUser from "./update-user";
import DeleteUser from "./delete-user";
import { useEffect } from "react";
import moment from "moment-jalaali"

const QUERY = gql`
query {
  getUsers{ id createdAt updatedAt mobile userRole}
}
`;

type Props = { refresh: number }
export default function UsersTable({ refresh }: Props) {
  const { loading, data, refetch } = useQuery(QUERY);

  useEffect(() => {
    refetch()
  }, [refresh])

  return (
    <Table
      loading={loading}
      dataSource={data?.getUsers || []}
      columns={[
        { dataIndex: "mobile", title: "Mobile" },
        { dataIndex: "userRole", title: "User Role", width: 100 },
        {
          dataIndex: "createdAt", title: "Created At",
          width: 150,
          render(value) {
            return moment(value).format('jYYYY/jMM/jDD HH:mm')
          }
        },
        {
          dataIndex: "updatedAt", title: "Updated At",
          width: 150,
          render(value) {
            return moment(value).format('jYYYY/jMM/jDD HH:mm')
          }
        },
        {
          dataIndex: "id", title: "Action", width: 160,
          render(value) {
            return (
              <Space>
                <UpdateUser id={value} onSuccess={() => refetch()} />
                <DeleteUser id={value} onSuccess={() => refetch()} />
              </Space>
            )
          }
        },
      ]}
    />
  )
}
