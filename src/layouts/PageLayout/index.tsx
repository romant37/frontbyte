import React, { FC } from 'react'
import { Typography } from 'antd'
import { Spinner } from 'components/common'
import styles from './styles.module.scss'

const { Title } = Typography

interface IPageLayoutProps {
  title: string
  isLoading?: boolean
  children: React.ReactNode
}

const PageLayout: FC<IPageLayoutProps> = props => {
  const { title, isLoading, children } = props
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Title level={2}>{title}</Title>
      </div>
      <div className={styles.content}>
        {isLoading && <Spinner />}
        {children}
      </div>
    </div>
  )
}

export default PageLayout
