import React from 'react'
import AppContent from './Component/AppContent'
import { Provider } from 'react-redux'
import {store} from './store/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AppContent />
    </Provider> 
    </div>
  )
}

export default App