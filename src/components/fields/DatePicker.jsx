import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Form, DatePicker } from 'antd'

const DateInput = props => {

  const { t } = useTranslation()
  const { form, field, label, placeholder, disabled, className, helperText, size } = props
  const fieldError = form.errors[field.name]
  const isTouched = form.touched[field.name]
  const isShowError = !!(fieldError && isTouched)
  const momentDate = field.value ? moment((new Date(field.value)), 'YYYY-MM-DD') : null

  function onValueChange(date, dateString) {
    const setValue = dateString ? moment(dateString, 'YYYY-MM-DD') : null
    form.setFieldValue(field.name, setValue)
  }

  function onBlur() {
    form.setFieldTouched(field.name, true)
  }

  return (
    <Form.Item
      label={label}
      validateStatus={fieldError && isTouched && "error"}
      help={isShowError ? fieldError : helperText}
    >
      <DatePicker
        {...field}
        value={momentDate}
        className={className}
        size={size || 'large'}
        placeholder={placeholder || t('common.datePicker.select')}
        disabled={disabled}
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'
        autoCorrect='off'
        style={{ width: '100%' }}
        onChange={onValueChange}
        onBlur={onBlur}
      />
    </Form.Item>
  )
}

export default DateInput
