import Nav from './navbar';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'



jest.mock('../services/apiServices.js', () => ({
  Nav: () => ({ })
}));

it('should check that there is a navbar', async () => {

  const setAuthenticatedUser = jest.fn();

render(<Router><Nav setAuthenticatedUser={setAuthenticatedUser}/> </Router>);

})