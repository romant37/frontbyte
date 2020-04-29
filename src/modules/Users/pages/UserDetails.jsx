import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Descriptions, Card, Tag } from 'antd'
import { DictionariesUtils, DateUtils, history } from 'utils'
import { PageLayout } from 'layouts'
import { EditUserForm } from 'modules/Users/components'
import { getUserDetails } from 'modules/Users/reducers/usersList'

const UserDetails = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { userDetails, nationalities, ranks } = useSelector(
    ({ usersList, dicts }) => ({
      userDetails: usersList.userDetails,
      nationalities: dicts.nationalities,
      ranks: dicts.ranks,
    })
  )

  function getCurrentUser() {
    const { location } = history
    const locationKey = location.pathname.replace('/users/', '')
    dispatch(getUserDetails(locationKey))
  }

  useEffect(() => {
    getCurrentUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function getTitle() {
    const { Firstname = '', Surname = '' } = userDetails.data || {}
    return `${Firstname} ${Surname}`
  }

  function renderEditButton() {
    return <EditUserForm user={userDetails.data} onSuccess={getCurrentUser} />
  }

  function renderInfo() {
    if (!userDetails.data) return null
    const { Firstname, Surname, Nationality, Rank, Address, DateOfBirth } =
      userDetails.data || {}
    return (
      <Descriptions layout='vertical' bordered>
        <Descriptions.Item label={t('users.firstName')}>
          {Firstname}
        </Descriptions.Item>
        <Descriptions.Item label={t('users.surname')}>
          {Surname}
        </Descriptions.Item>
        <Descriptions.Item label={t('users.dateOfBirth')}>
          {DateUtils.formatDate(DateOfBirth)}
        </Descriptions.Item>
        <Descriptions.Item label={t('users.nationality')}>
          <Tag color='geekblue' key={Nationality}>
            {DictionariesUtils.getLocalizedName(
              nationalities.data,
              Nationality
            )}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={t('users.rank')}>
          <Tag color='green' key={Rank}>
            {DictionariesUtils.getLocalizedName(ranks.data, Rank)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={t('users.address')}>
          {Address}
        </Descriptions.Item>
      </Descriptions>
    )
  }

  return (
    <PageLayout title={getTitle()} isLoading={userDetails.isLoading}>
      <Card title={t('users.info')} extra={renderEditButton()}>
        {renderInfo()}
      </Card>
    </PageLayout>
  )
}

export default UserDetails
