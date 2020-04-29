import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import styles from './styles.module.scss'

const { Option } = Select

const LanguageLayout = ({ children }) => {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState('en')

  function handleChange(value) {
    setLang(lang)
    i18n.changeLanguage(value)
  }

  return (
    <>
      <Select
        defaultValue={lang}
        className={styles.select}
        onChange={handleChange}
      >
        <Option value='en'>EN</Option>
        <Option value='ru'>RU</Option>
      </Select>
      {children}
    </>
  )
}

export default LanguageLayout
