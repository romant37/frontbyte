import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, Progress } from 'antd'
import { Row, Col } from 'styled-bootstrap-grid'
import { PageLayout } from 'layouts'
import { MainGridLayout } from 'layouts'
// import { MainGridLayoutSegmentProps } from 'layouts/layout.contract'
import { getSummary } from 'modules/Dashboard/reducers/dashboard'
import styles from './styles.module.scss'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { summary } = useSelector(({ dashboard }) => ({
    summary: dashboard.summary,
  }))

  useEffect(() => {
    dispatch(getSummary())
  }, [dispatch])

  const { isLoading, data } = summary
  const { Trainings = [] } = data || {}

  function renderTrainingsProgress() {
    return (
      <MainGridLayout>
        {Trainings.map(training => (
          <Col xl='4' md='6' xs='12' key={training.Name}>
            <Card title={training.Name} className={styles.card}>
              <div className={styles.cardContent}>
                <Progress
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  type='circle'
                  percent={training.Progress}
                />
              </div>
            </Card>
          </Col>
        ))}
      </MainGridLayout>
    )
  }

  return (
    <PageLayout title={t('navigation.dashboard')} isLoading={isLoading}>
      {Trainings.length !== 0 && renderTrainingsProgress()}
    </PageLayout>
  )
}

export default Dashboard
