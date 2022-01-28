import { render, screen } from '@testing-library/react';
import React from 'react';
import ItemRecipe from './itemRecipe';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom'


it('should show a recipe has an image', () => {
  const recipe = [{
    id: 1,
  }];


  render(<Router><ItemRecipe recipe={recipe}/> </Router>);

  const recipeImage = screen.getByRole('food-image');

  userEvent.type(recipeImage, 'food-image')
})