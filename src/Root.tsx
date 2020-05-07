import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import store from 'store'
import i18n from 'localization/i18n'
import RootRouting from 'routing/RootRouting'
import 'normalize.css'

const Root = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RootRouting />
      </I18nextProvider>
    </Provider>
  )
}

export default Root
