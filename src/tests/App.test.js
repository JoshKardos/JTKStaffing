import React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import AppContainer from '../AppContainer'

const middlewares = []
const mockState = {
  LayoutReducers: {
    layoutReducer: {
      currentLayout: 'HOME'
    }
  }
}

const mockStore = configureMockStore(middlewares)

// eslint-disable-next-line no-undef
test('renders Home link', () => {
  // const store = mockStore
  const { getByText } = render(
    <Provider store={mockStore(mockState)}>
      <AppContainer />
    </Provider>
  )
  const linkElement = getByText(/Home/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
})
