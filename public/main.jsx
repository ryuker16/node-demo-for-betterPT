
/**
 *
 *  Sentiments Front End
 *
 * Although it's overkill, I took this as a good opportunity to work on
 * my redux & middleware skills. The application handles api calls to protected
 * routes via middleware that attaches an authorization header JWT.
 *
 *  Fairly straight forward: login as "brandon" with password 'test' and enter
 *  a sentence
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'
import api from './middleware/api'
//reducer - holds our immutable data such as state
import sentimentsApp from './reducers'
import App from './components/App.jsx'

// AppContainer is a necessary wrapper component for HMR

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(sentimentsApp)



const render = (Component) => {
	ReactDOM.render(
    <AppContainer>
			<Provider store={store}>
      <Component/>
			</Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

//here we render our application
render(App)

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App.jsx', () => {
		const NewApp = require('./components/App.jsx').default
		render(NewApp)
	})
}
