import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field, Formik } from 'formik'
import * as yup from 'yup'
import { Button, Card, Alert } from 'antd'
import { LockOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons'
import { Input } from 'components/fields'
import { login } from 'modules/Auth/reducers/auth'
import styles from './styles.module.scss'

const SCHEME = yup.object().shape({
  account: yup.string().required('Required'),
  password: yup.string().required('Required'),
  company: yup.string().required('Required'),
})

const LoginPage = () => {
  
  const dispatch = useDispatch()
  const { user } = useSelector(({ auth }) => ({ user: auth.user }))
  console.log('user: ', user)

  function handleSubmitForm(values, formikBag) {
    console.log('values: ', values)
    console.log('formikBag: ', formikBag)
    dispatch(login(values))
  }

   const initialValues = {
    account: '',
    company: '',
    password: '',
  }

  function renderForm({ isValid, isSubmitting }) {
    return (
      <Form>
        <Field
          component={Input}
          name='company'
          size='large'
          icon={HomeOutlined}
          placeholder='Company'
        />
        <Field
          component={Input}
          name='account'
          size='large'
          icon={UserOutlined}
          placeholder='User'
        />
        <Field
          component={Input}
          type='password'
          name='password'
          size='large'
          icon={LockOutlined}
          placeholder='Password'
        />
        <Button
          className={styles.button}
          htmlType='submit'
          loading={isSubmitting}
          size='large'
          type='primary'
          disabled={!isValid || isSubmitting}
        >
          Sign In
        </Button>
      </Form>
    )
  }

  return (
    <div className={styles.root}>
      <Card title='Frontbyte' className={styles.inner}>
        <div className={styles.error}>
          <Alert message='some error message' type="error" />
        </div>
        <Formik
          validationSchema={SCHEME}
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          isInitialValid
          validateOnBlur
          validateOnChange
          render={renderForm}
        />
      </Card>
    </div>
  )
}

export default LoginPage
