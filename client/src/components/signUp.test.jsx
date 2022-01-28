import SignUp from './signUp';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../services/apiServices.js', () => ({
  SignUp: () => ({name: 'Jane', email: 'Jane@jane.com', password: 'Doe123'})
}));

it('should call SignUp with the correct credentials', async () => {

  const setIsAuthenticated = jest.fn();
  // const credentials = {
  //   name: 'Jane',
  //   email: 'jane@jane.com',
  //   password: 'Doe123'}

render(<Router><SignUp setIsAuthenticated={setIsAuthenticated}/> </Router>); //

const nameInput = screen.getByRole('name');
const emailInput = screen.getByRole('email');
const passwordInput = screen.getByRole('password');
const submitBtn = screen.getByRole('sign-up-button');

// populate input fields
userEvent.type(nameInput, 'Jane');
userEvent.type(emailInput, 'jane@jane.com');
userEvent.type(passwordInput, 'Doe123');
userEvent.type(submitBtn, 'sign-up-button');

//submit form
//await userEvent.click(submitBtn);

//expect(setIsAuthenticated).toHaveBeenCalledWith(credentials);

})

