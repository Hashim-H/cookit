import SignIn from './signIn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom'
//import api from '../services/apiServices'



jest.mock('../services/apiServices.js', () => ({
  SignIn: () => ({email: 'Jane@jane.com', password: 'Doe123'})
}));

it('should call SignIn with the correct credentials', async () => {

  const setIsAuthenticated = jest.fn();
  // const credentials = {
  //   email: 'Jane@jane.com',
  //   password: 'Doe123'}

render(<Router><SignIn setIsAuthenticated={setIsAuthenticated}/> </Router>); //

const emailInput = screen.getByRole('email');
const passwordInput = screen.getByRole('password');
//const submitBtn = screen.getByRole('sign-in-btn')

// populate input fields
userEvent.type(emailInput, 'test@test.com');
userEvent.type(passwordInput, 'test');
//userEvent.type(submitBtn, 'sign-in-btn');

//submit form
//await userEvent.click(submitBtn);

//expect(setIsAuthenticated).toHaveBeenCalledWith(credentials);

})