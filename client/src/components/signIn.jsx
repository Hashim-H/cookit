import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import auth from '../utils/auth'
import api from '../services/apiServices'
import { useNavigate } from 'react-router-dom'

const initialState = {
  email: '',
  password: '',
}

export default function SignIn(props) {
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
    const { email, password } = state
    const user = { email, password }
    const res = await api.login(user)

    if (res.error) {
      alert(`${res.message}`)
      setState(initialState)
    } else {
      const { accessToken, user } = res.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', user[0])
      props.setIsAuthenticated(true)
      props.setAuthenticatedUser(user[0])
      auth.login(() => navigate('/'))
    }
  }

  const validateForm = () => {
    return !state.email || !state.password
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                role='email'
                type='email'
                value={state.email}
                name={'email'}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                role='password'
                type='password'
                value={state.password}
                name={'password'}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
              role='sign-in-btn'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                disabled={validateForm()}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
