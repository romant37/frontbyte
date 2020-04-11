import React from 'react'
import { Typography } from 'antd'
import { Spinner } from 'components/common'
import styles from './styles.module.scss'

const { Title } = Typography

const PageLayout = props => {
  const { title, isLoading, children } = props
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Title>{title}</Title>
      </div>
      <div className={styles.content}>
        {isLoading && <Spinner />}
        {children}
      </div>
    </div>
  )
}

export default PageLayout
