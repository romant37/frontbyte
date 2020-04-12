import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { SortUtils, DictionariesUtils } from 'utils'
import { PageLayout } from 'layouts'
import { getUsers } from 'modules/Users/reducers/usersList'

const UsersList = () => {

  const dispatch = useDispatch()
  const { users, nationalities } = useSelector(({ usersList, dicts }) => ({
    users: usersList.users,
    nationalities: dicts.nationalities,
  }))

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const { isLoading } = users

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'Firstname',
      key: 'Firstname',
      sorter: SortUtils.sortAlphabet('Firstname'),
    },
    {
      title: 'Surname',
      dataIndex: 'Surname',
      key: 'Surname',
      sorter: SortUtils.sortAlphabet('Surname'),
    },
    {
      title: 'Nationality',
      dataIndex: 'Nationality',
      key: 'Nationality',
      render: id => DictionariesUtils.getNationalityName(nationalities.data, id),
    },
  ]

  return (
    <PageLayout title='Users'>
      <Table
        loading={isLoading}
        rowKey='Id'
        columns={columns}
        dataSource={users.data}
      />
    </PageLayout>
  )
}

export default UsersList
