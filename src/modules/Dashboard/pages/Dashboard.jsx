import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, Progress, Col, Row } from 'antd'
import { PageLayout } from 'layouts'
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
    if (Trainings.length === 0) return null
    return (
      <Row gutter={24}>
        {Trainings.map(training => (
          <Col
            key={training.Name}
            span={8}
          >
            <Card
              title={training.Name}
              className={styles.card}
            >
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
      </Row>
    )
  }

  return (
    <PageLayout title={t('navigation.dashboard')} isLoading={isLoading}>
      {renderTrainingsProgress()}
    </PageLayout>
  )
}

export default Dashboard
