import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { Button, Modal, Alert } from 'antd'
import { Form, Field, Formik } from 'formik'
import * as yup from 'yup'
import { EditOutlined } from '@ant-design/icons'
import { usePrevious } from 'hooks'
import { Input, Select, DatePicker } from 'components/fields'
import { editUser } from 'modules/Users/reducers/usersList'
import styles from './styles.module.scss'

const EditUserForm = props => {

  const { t } = useTranslation()
  const [isOpen, setVisibility] = useState(false)
  const [formBag, setFormBag] = useState(null)
  const { user, onSuccess } = props

  const VALIDATION_SCHEMA = yup.object().shape({
    Firstname: yup.string().required(t('common.required')),
    Surname: yup.string().required(t('common.required')),
    DateOfBirth: yup.string().required(t('common.required')),
    Nationality: yup.number().required(t('common.required')),
    Rank: yup.string().required(t('common.required')),
    Address: yup.string().required(t('common.required')),
  })

  const dispatch = useDispatch()
  const { nationalities, ranks, userEdit } = useSelector(({ dicts, usersList }) => ({
    nationalities: dicts.nationalities,
    ranks: dicts.ranks,
    userEdit: usersList.userEdit,
  }))
  const prevUserEdit = usePrevious(userEdit) || {}

  function toggleModal() {
    setVisibility(!isOpen)
  }

  useEffect(() => {
    if (prevUserEdit.isLoading && !userEdit.isLoading && formBag) {
      formBag.setSubmitting(false)

      if (!userEdit.error) {
        onSuccess()
        toggleModal()
      }
    }
  }, [formBag, userEdit, prevUserEdit]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmitForm(values, formikBag) {
    const { DateOfBirth, ...rest } = values
    const requestData = {
      ...rest,
      DateOfBirth: format(DateOfBirth, 'DD-MM-YYYY') || null,
    }
    setFormBag(formikBag)
    dispatch(editUser(requestData))
  }

  function renderForm({ isValid, isSubmitting }) {
    return (
      <Form>
        <Field
          component={Input}
          name='Firstname'
          placeholder={t('users.firstName')}
        />
        <Field
          component={Input}
          name='Surname'
          placeholder={t('users.surname')}
        />
        <Field
          component={DatePicker}
          name='DateOfBirth'
          placeholder={t('users.dateOfBirth')}
        />
        <Field
          component={Input}
          name='Address'
          placeholder={t('users.address')}
        />
        <Field
          component={Select}
          name='Nationality'
          valueName='Name'
          items={nationalities.data}
          placeholder={t('users.nationality')}
        />
        <Field
          component={Select}
          name='Rank'
          valueName='Name'
          items={ranks.data}
          placeholder={t('users.rank')}
        />
        <Button
          htmlType='submit'
          loading={isSubmitting}
          size='large'
          type='primary'
          disabled={!isValid || isSubmitting}
        >
          {t('users.edit.save')}
        </Button>
      </Form>
    )
  }

  const { error } = userEdit
  const { ErrorMessage } = error || {}

  return (
    <>
      <Button
        type='primary'
        shape='circle'
        icon={<EditOutlined />}
        size='large'
        onClick={toggleModal}
      />
      <Modal
        title={t('users.edit.title')}
        visible={isOpen}
        onCancel={toggleModal}
        destroyOnClose={true}
        footer={null}
      >
        {ErrorMessage &&
          <div className={styles.error}>
            <Alert message={ErrorMessage} type='error' />
          </div>
        }
        <Formik
          validationSchema={VALIDATION_SCHEMA}
          initialValues={user}
          onSubmit={handleSubmitForm}
          isInitialValid
          validateOnBlur
          validateOnChange
          enableReinitialize
          render={renderForm}
        />
      </Modal>
    </>
  )
}

export default EditUserForm
