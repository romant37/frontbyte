import React from 'react'
import { Form, Select } from 'antd'
import { FieldProps } from 'formik'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

interface ISelectProps extends FieldProps {
  label?: string
  type?: 'text' | 'password' | 'number'
  icon: React.ReactNode
  placeholder?: string
  className?: string
  helperText?: string
  size?: SizeType
  disabled?: boolean
  items: []
  valueName: string
}

type ItemType = {
  Id: number | string
  Name?: string
  [key: string]: any
}

const SelectPicker = (props: ISelectProps) => {
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

  function onValueChange(value: string) {
    form.setFieldValue(field.name, value)
  }

  function onBlur() {
    form.setFieldTouched(field.name, true)
  }

  function getValueMap(item: ItemType) {
    const convertedName: any = []
    if (Array.isArray(valueName)) {
      valueName.map((value: string) => convertedName.push(item[value]))
      return convertedName.join(' ')
    }
    return item[valueName]
  }

  return (
    <Form.Item
      label={label}
      validateStatus={(fieldError && isTouched && 'error') || ''}
      help={isShowError ? fieldError : helperText}
    >
      <Select
        {...field}
        size={size || 'large'}
        className={className}
        defaultValue={field.value || ''}
        disabled={disabled}
        onChange={onValueChange}
        onBlur={onBlur}
      >
        <Select.Option value=''>{label || placeholder}</Select.Option>
        {items &&
          items.map((item: ItemType) => (
            <Select.Option value={item.Id} key={item.Id}>
              {getValueMap(item)}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  )
}

export default SelectPicker
