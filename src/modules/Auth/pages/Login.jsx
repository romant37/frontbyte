import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Field, Formik } from 'formik'
import * as yup from 'yup'
import { Button, Card, Alert } from 'antd'
import { LockOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons'
import { usePrevious } from 'hooks'
import { AuthorizationUtils } from 'utils'
import { Input } from 'components/fields'
import { login } from 'modules/Auth/reducers/auth'
import styles from './styles.module.scss'

const INITIAL_VALUES = {
  User: '',
  Company: '',
  Password: '',
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loggedIn } = useSelector(({ auth }) => ({ loggedIn: auth.loggedIn }))
  const [formBag, setFormBag] = useState(null)
  const prevLoggedIn = usePrevious(loggedIn) || {}

  const VALIDATION_SCHEMA = yup.object().shape({
    User: yup.string().required(t('common.required')),
    Password: yup.string().required(t('common.required')),
    Company: yup.string().required(t('common.required')),
  })

  useEffect(() => {
    if (prevLoggedIn.isLoading && !loggedIn.isLoading && formBag) {
      formBag.setSubmitting(false)

      if (!loggedIn.error) {
        AuthorizationUtils.redirectToHomePage()
      }
    }
  }, [formBag, loggedIn, prevLoggedIn])

  function handleSubmitForm(values, formikBag) {
    setFormBag(formikBag)
    dispatch(login(values))
  }

  function renderForm({ isValid, isSubmitting }) {
    return (
      <Form>
        <Field
          component={Input}
          name='Company'
          size='large'
          icon={<HomeOutlined />}
          placeholder={t('login.company')}
        />
        <Field
          component={Input}
          name='User'
          size='large'
          icon={<UserOutlined />}
          placeholder={t('login.user')}
        />
        <Field
          component={Input}
          type='password'
          name='Password'
          size='large'
          icon={<LockOutlined />}
          placeholder={t('login.password')}
        />
        <Button
          className={styles.button}
          htmlType='submit'
          loading={isSubmitting}
          size='large'
          type='primary'
          disabled={!isValid || isSubmitting}
        >
          {t('login.signIn')}
        </Button>
      </Form>
    )
  }

  const { error } = loggedIn
  const { ErrorMessage } = error || {}

  return (
    <div className={styles.root}>
      <Card title={t('common.appName')} className={styles.inner}>
        {ErrorMessage && (
          <div className={styles.error}>
            <Alert message={ErrorMessage} type='error' />
          </div>
        )}
        <Formik
          validationSchema={VALIDATION_SCHEMA}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmitForm}
          validateOnMount
          validateOnBlur
          validateOnChange
        >
          {props => renderForm(props)}
        </Formik>
      </Card>
    </div>
  )
}

export default LoginPage
