import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Descriptions, Card, Tag } from 'antd'
import { DictionariesUtils, DateUtils, history } from 'utils'
import { PageLayout } from 'layouts'
import { getUserDetails } from 'modules/Users/reducers/usersList'

const UserDetails = () => {

  const dispatch = useDispatch()
  const { userDetails, nationalities, ranks } = useSelector(({ usersList, dicts }) => ({
    userDetails: usersList.userDetails,
    nationalities: dicts.nationalities,
    ranks: dicts.ranks,
  }))

  useEffect(() => {
    const { location } = history
    const locationKey = location.pathname.replace('/users/' , '')
    dispatch(getUserDetails(locationKey))
  }, [dispatch])

  function getTitle() {
    const { Firstname = '', Surname = '' } = userDetails.data || {}
    return `${Firstname} ${Surname}`
  }

  function renderInfo() {
    if (!userDetails.data) return null
    const {
      Firstname, Surname, Nationality,
      Rank, Address, DateOfBirth,
    } = userDetails.data || {}
    return (
      <Descriptions layout='vertical' bordered>
        <Descriptions.Item label='First Name'>{Firstname}</Descriptions.Item>
        <Descriptions.Item label='Surname'>{Surname}</Descriptions.Item>
        <Descriptions.Item label='Date Of Birth'>
          {DateUtils.formatDate(DateOfBirth)}
        </Descriptions.Item>
        <Descriptions.Item label='Nationality'>
          <Tag color='geekblue' key={Nationality}>
            {DictionariesUtils.getLocalizedName(nationalities.data, Nationality)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Rank'>
          <Tag color='green' key={Rank}>
            {DictionariesUtils.getLocalizedName(ranks.data, Rank)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Address'>{Address}</Descriptions.Item>
      </Descriptions>
    )
  }

  return (
    <PageLayout
      title={getTitle()}
      isLoading={userDetails.isLoading}
    >
      <Card title='User Info'>
        {renderInfo()}
      </Card>
    </PageLayout>
  )
}

export default UserDetails
