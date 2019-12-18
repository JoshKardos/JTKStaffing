import React from 'react';
import { render } from '@testing-library/react';
import AppContainer from '../AppContainer';

// eslint-disable-next-line no-undef
test('renders Home link', () => {
  const { getByText } = render(<AppContainer />);
  const linkElement = getByText(/Home/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
