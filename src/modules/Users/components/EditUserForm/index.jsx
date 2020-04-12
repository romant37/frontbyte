import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { Button, Modal, Alert } from 'antd'
import { Form, Field, Formik } from 'formik'
import * as yup from 'yup'
import { EditOutlined } from '@ant-design/icons'
import { usePrevious } from 'hooks'
import { Input, Select, DatePicker } from 'components/fields'
import { editUser } from 'modules/Users/reducers/usersList'
import styles from './styles.module.scss'

const VALIDATION_SCHEMA = yup.object().shape({
  Firstname: yup.string().required('Required'),
  Surname: yup.string().required('Required'),
  DateOfBirth: yup.string().required('Required'),
  Nationality: yup.number().required('Required'),
  Rank: yup.string().required('Required'),
  Address: yup.string().required('Required'),
})

const EditUserForm = props => {

  const [isOpen, setVisibility] = useState(false)
  const [formBag, setFormBag] = useState(null)
  const { user, onSuccess } = props

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
          placeholder='First Name'
        />
        <Field
          component={Input}
          name='Surname'
          placeholder='Surname'
        />
        <Field
          component={DatePicker}
          name='DateOfBirth'
          placeholder='Date Of Birth'
        />
        <Field
          component={Input}
          name='Address'
          placeholder='Address'
        />
        <Field
          component={Select}
          name='Nationality'
          valueName='Name'
          items={nationalities.data}
        />
        <Field
          component={Select}
          name='Rank'
          valueName='Name'
          items={ranks.data}
        />
        <Button
          htmlType='submit'
          loading={isSubmitting}
          size='large'
          type='primary'
          disabled={!isValid || isSubmitting}
        >
          Save changes
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
        title='Edit user'
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
