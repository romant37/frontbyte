import React from 'react'
import { Spin } from 'antd'

import styles from './styles.module.scss'

function Spinner() {
  return (
    <div className={styles.root}>
      <Spin className={styles.progress} />
    </div>
  )
}

export default Spinner
