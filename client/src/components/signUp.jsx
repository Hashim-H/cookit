import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import auth from '../utils/auth'
import api from '../services/apiServices'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
}

export default function Signup(props) {
  const [showPassword, setShowPassword] = useState(false)

  let navigate = useNavigate()
  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password, name, username } = state
    const user = { email, password, name, username }
    const res = await api.signUp(user)

    if (res.error) {
      alert(`${res.message}`)
      setState(initialState)
    } else {
      const { accessToken, user } = res.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', user)
      props.setIsAuthenticated(true)
      props.setAuthenticatedUser(user)
      auth.login(() => navigate('/'))
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id='name' isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    role='name'
                    type='text'
                    value={state.name}
                    name={'name'}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='username'>
                  <FormLabel>Username</FormLabel>
                  <Input
                    role='username'
                    type='text'
                    value={state.username}
                    name={'username'}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                role='email'
                type='email'
                value={state.email}
                name={'email'}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                role='password'
                  type={showPassword ? 'text' : 'password'}
                  value={state.password}
                  name={'password'}
                  onChange={handleChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    role='sign-up-button'
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size='lg'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} to={'/signIn'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
