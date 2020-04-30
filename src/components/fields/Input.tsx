import React, { FC } from 'react'
import { Form, Input as InputComponent } from 'antd'
import { FieldProps } from 'formik'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

interface IInputProps extends FieldProps {
  label?: string
  type?: 'text' | 'password' | 'number'
  icon: React.ReactNode
  placeholder?: string
  className?: string
  helperText?: string
  size?: SizeType
  disabled?: boolean
}

const Input: FC<IInputProps> = props => {
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

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>): void {
    form.setFieldValue(field.name, e.target.value)
  }

  function onBlur() {
    form.setFieldTouched(field.name, true)
  }

  return (
    <Form.Item
      label={label}
      validateStatus={(fieldError && isTouched && 'error') || ''}
      help={isShowError ? fieldError : helperText}
    >
      <InputComponent
        {...field}
        value={field.value || ''}
        className={className}
        size={size || 'large'}
        type={type}
        prefix={icon}
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
