import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const api = {}

//USER

api.signUp = async (user) => {
  try {
    const response = await apiClient.post('/api/auth/signup', user)
    return response
  } catch (error) {
    console.error(error)
  }
}

api.login = async (user) => {
  try {
    const response = await apiClient.post('/api/auth/login', user)
    return response
  } catch (error) {
    console.error(error)
  }
}

api.logout = async (tokenName,user) => {
  localStorage.removeItem(tokenName)
  localStorage.removeItem(user)
}

//RECIPE

api.getRecipes = async () => {
  try {
    const response = await apiClient.get('/api/recipes')
    return response
  } catch (error) {
    console.error(error)
  }
}
api.getRecipe = async (id) => {
  try {
    const response = await apiClient.get('/api/recipes/' + id)
    return response
  } catch (error) {
    console.error(error)
  }
}


api.postRecipeImages = async (token, images) => {
  try {
    // make it so that /api/uploadImages accept files and returns urls
    // TODO form post attachments
    const response = await apiClient.post('/api/uploadImages', images, {
      headers: { 'jwt': token }

    });
    return response
  } catch (error) {
    console.error(error)
  }
}

api.postRecipes = async (tokenName, data) => {
  try {
    const response = await apiClient.post('/api/recipes/create', data, {
      headers: { 'jwt': tokenName }
    });
    return response
  } catch (error) {
    console.error(error)
  }
}

export default api