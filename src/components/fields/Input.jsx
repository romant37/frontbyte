import React from 'react'
import { Form, Input as InputComponent } from 'antd'

const Input = props => {
  const {
    form,
    field,
    type = 'text',
    label,
    icon,
    placeholder,
    disabled,
    className,
    helperText,
    size,
  } = props
  const fieldError = form.errors[field.name]
  const isTouched = form.touched[field.name]
  const isShowError = !!(fieldError && isTouched)
  const IconComponent = icon

  function onValueChange(e) {
    form.setFieldValue(field.name, e.target.value)
  }

  function onBlur() {
    form.setFieldTouched(field.name, true)
  }

  return (
    <Form.Item
      label={label}
      validateStatus={fieldError && isTouched && 'error'}
      help={isShowError ? fieldError : helperText}
    >
      <InputComponent
        {...field}
        value={field.value || ''}
        className={className}
        size={size || 'large'}
        type={type}
        prefix={icon && <IconComponent />}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'
        autoCorrect='off'
        onChange={onValueChange}
        onBlur={onBlur}
      />
    </Form.Item>
  )
}

export default Input
