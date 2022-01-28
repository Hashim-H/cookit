import React, { useState } from 'react'
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Image,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  cuisine: '',
  description: '',
  ingredients: '',
  steps: '',
  tags: '',
  imgs: [],
  file: [],
}

const cuisines = [
  'American',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Mexican',
  'Spanish'
]


export default function PostRecipe(props) {
  let navigate = useNavigate()
  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  const handleImageUpload = (event) => {
    setState({
      imgs: event.target.files,
    })
  }

  function handleDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
   }
   function handleDrop(ev) {
    ev.preventDefault();
    setState({imgs: ev.dataTransfer.files});
   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { cuisine, title, description, ingredients, steps, imgs } = state;
    const cuisine_id = cuisines.indexOf(cuisine) + 1;
    const recipe = { title, cuisine_id, user_id: props.user.id, description, ingredients, steps, imgs };
    await props.postRecipe(recipe, state.imgs);
    navigate('/')
  }



  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden='true'>
        <Box py={5}>
          <Box
            borderTop='solid 1px'
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method='POST'
              shadow='base'
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor='title'
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Tilte
                    </FormLabel>
                    <Input
                      type='text'
                      name='title'
                      value={state.title}
                      onChange={handleChange}
                      id='title'
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      rounded='md'
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor='country'
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Cuisine
                    </FormLabel>
                    <Select
                      name='cuisine'
                      value={state.cuisine}
                      onChange={handleChange}
                      placeholder='Select option'
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      rounded='md'
                    >
                      {cuisines.map(cuisine => <option>{cuisine}</option>)}
                    </Select>
                  </FormControl>

                  <FormControl id='email' mt={1} as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      name='description'
                      value={state.description}
                      onChange={handleChange}
                      placeholder='A brief description for your recipe......'
                      mt={1}
                      rows={4}
                      shadow='sm'
                      focusBorderColor='brand.400'
                      fontSize={{ sm: 'sm' }}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor='street_address'
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Ingredients
                    </FormLabel>
                    <FormHelperText>
                      type a comma after every ingredient so they can get
                      seperated
                    </FormHelperText>
                    <Input
                      placeholder='eg.( tomato, potato, sugar, etc.....)'
                      type='text'
                      name='ingredients'
                      value={state.ingredients}
                      onChange={handleChange}
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      rounded='md'
                    />
                  </FormControl>
                  <FormControl id='email' mt={1} as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Steps
                    </FormLabel>
                    <Textarea
                      placeholder='A brief description for your recipe......'
                      name='steps'
                      value={state.steps}
                      onChange={handleChange}
                      mt={1}
                      rows={4}
                      shadow='sm'
                      focusBorderColor='brand.400'
                      fontSize={{ sm: 'sm' }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Cover photo
                    </FormLabel>
                    <Flex
                      mt={1}
                      justify='center'
                      px={7}
                      pt={6}
                      pb={12}
                      borderWidth={2}
                      borderColor={useColorModeValue('gray.300', 'gray.500')}
                      borderStyle='dashed'
                      rounded='md'
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <Stack spacing={1} textAlign='center'>
                        <Icon
                          mx='auto'
                          boxSize={12}
                          color={useColorModeValue('gray.400', 'gray.500')}
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </Icon>
                        <Flex
                          fontSize='sm'
                          color={useColorModeValue('gray.600', 'gray.400')}
                          alignItems='baseline'
                        >
                          <chakra.label
                            htmlFor='file-upload'
                            cursor='pointer'
                            rounded='md'
                            fontSize='md'
                            color={useColorModeValue('brand.600', 'brand.200')}
                            pos='relative'
                            _hover={{
                              color: useColorModeValue(
                                'brand.400',
                                'brand.300'
                              ),
                            }}
                          >
                            <span>Upload a file</span>
                            <VisuallyHidden>
                              <input
                                onChange={handleImageUpload}
                                id='file-upload'
                                name='file-upload'
                                type='file'
                              />
                            </VisuallyHidden>
                          </chakra.label>
                          <Text pl={1}>or drag and drop</Text>
                        </Flex>
                        <Text
                          fontSize='xs'
                          color={useColorModeValue('gray.500', 'gray.50')}
                        >
                          PNG, JPG, GIF up to 10MB
                        </Text>
                      </Stack>
                    </Flex>
                  </FormControl>
                  {state.imgs &&
                    [...state.imgs].map((file) => (
                      <Image
                        key={URL.createObjectURL(file)}
                        src={URL.createObjectURL(file)}
                      />
                    ))}

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor='street_address'
                      fontSize='sm'
                      fontWeight='md'
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Tags
                    </FormLabel>
                    <FormHelperText>
                      type a comma after every ingredient so they can get
                      seperated
                    </FormHelperText>
                    <Input
                      placeholder='eg.( tomato, potato, sugar, etc.....)'
                      name='tags'
                      value={state.tags}
                      onChange={handleChange}
                      autoComplete='street-address'
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      rounded='md'
                    />
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign='right'
              >
                <Button
                  onClick={handleSubmit}
                  //   colorScheme='brand.'
                  _focus={{ shadow: '' }}
                  fontWeight='md'
                >
                  Create Post
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden='true'>
        <Box py={5}>
          <Box
            borderTop='solid 1px'
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
    </Box>
  )
}
