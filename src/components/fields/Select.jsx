import React from 'react'
import { Form, Select } from 'antd'

const SelectPicker = props => {
  const {
    form,
    field,
    label,
    placeholder,
    disabled,
    items,
    className,
    helperText,
    size,
    valueName,
  } = props
  const fieldError = form.errors[field.name]
  const isTouched = form.touched[field.name]
  const isShowError = !!(fieldError && isTouched)

  function onValueChange(value) {
    form.setFieldValue(field.name, value)
  }

  function onBlur() {
    form.setFieldTouched(field.name, true)
  }

  function getValueMap(item) {
    const convertedName = []
    if (Array.isArray(valueName)) {
      valueName.map(value => convertedName.push(item[value]))
      return convertedName.join(' ')
    }
    return item[valueName]
  }

  return (
    <Form.Item
      label={label}
      validateStatus={fieldError && isTouched && 'error'}
      help={isShowError ? fieldError : helperText}
    >
      <Select
        {...field}
        size={size || 'large'}
        className={className}
        label={fieldError && isTouched ? fieldError : label}
        defaultValue={field.value || ''}
        disabled={disabled}
        onChange={onValueChange}
        onBlur={onBlur}
      >
        <Select.Option value=''>{label || placeholder}</Select.Option>
        {items &&
          items.map(item => (
            <Select.Option value={item.Id} key={item.Id}>
              {getValueMap(item)}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  )
}

export default SelectPicker
