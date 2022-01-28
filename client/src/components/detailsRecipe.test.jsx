import DetailsRecipe from './detailsRecipe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



it('should show a recipe description user has input', () => {


render(<DetailsRecipe />);

const recipeDescription = screen.getByRole('recipe-description');

userEvent.type(recipeDescription, 'recipe-description');

})