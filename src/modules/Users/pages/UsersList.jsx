import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Tag } from 'antd'
import { SortUtils, DictionariesUtils, history } from 'utils'
import { PageLayout } from 'layouts'
import { getUsers } from 'modules/Users/reducers/usersList'
import styles from './styles.module.scss'

const UsersList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { users, nationalities } = useSelector(({ usersList, dicts }) => ({
    users: usersList.users,
    nationalities: dicts.nationalities,
  }))

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  function onRow(record) {
    return {
      onClick: () => {
        history.push(`/users/${record.Id}`)
      },
    }
  }

  const { isLoading } = users

  const columns = [
    {
      title: t('users.firstName'),
      dataIndex: 'Firstname',
      key: 'Firstname',
      width: '35%',
      sorter: SortUtils.sortAlphabet('Firstname'),
    },
    {
      title: t('users.surname'),
      dataIndex: 'Surname',
      key: 'Surname',
      width: '35%',
      sorter: SortUtils.sortAlphabet('Surname'),
    },
    {
      title: t('users.nationality'),
      dataIndex: 'Nationality',
      key: 'Nationality',
      width: '30%',
      render: id => {
        return (
          <Tag color='geekblue' key={id}>
            {DictionariesUtils.getLocalizedName(nationalities.data, id)}
          </Tag>
        )
      },
    },
  ]

  return (
    <PageLayout title={t('navigation.users')}>
      <Table
        loading={isLoading}
        rowKey='Id'
        columns={columns}
        dataSource={users.data}
        onRow={onRow}
        rowClassName={styles.row}
      />
    </PageLayout>
  )
}

export default UsersList
