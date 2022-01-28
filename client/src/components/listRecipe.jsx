import ItemRecipe from './itemRecipe'


export default function ListRecipe({ recipes }) {
  return (
       recipes.length && recipes.map((recipe) => (
          <ItemRecipe key={recipe.id} recipe={recipe} />
      ))
  )
}
