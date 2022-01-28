import { render, screen } from '@testing-library/react';
import React from 'react';
import ListRecipe from './listRecipe';
import { BrowserRouter as Router } from 'react-router-dom'


it('Should render exact number of recipes', () => {
  const recipes = [{
    id: 1,
    description: "Pierogi",
  }, {
    id: 2,
    description: "Pancakes",
  }];

  render(<Router><ListRecipe recipes={recipes} /></Router>);

  //itemRecipe line 61 role=definition
  const definitions = screen.getAllByRole("definition");
  expect(definitions).toHaveLength(2);
  expect(definitions[0]).toHaveTextContent("Pierogi");
  expect(definitions[1]).toHaveTextContent("Pancakes");
})

