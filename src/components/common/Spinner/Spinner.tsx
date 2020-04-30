import React from 'react'
import { Spin } from 'antd'
import styles from './Spinner.module.scss'

const Spinner: React.FC = () => (
  <div className={styles.root}>
    <Spin className={styles.progress} />
  </div>
)

export default Spinner
