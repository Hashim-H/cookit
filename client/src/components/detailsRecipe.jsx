import React, { useState, useEffect } from 'react'
import {
  Box,
  // chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  //   Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  //   VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react'
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
// import { MdLocalShipping } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import api from '../services/apiServices'

export default function DetailsRecipe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState([])

  useEffect(() => {
    api.getRecipe(id).then((data) => {
      setRecipe(data.data)
    })
  })
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=pexels-pixabay-461198.jpg&fm=jpg'
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {recipe.title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {recipe.cuisine}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                role='recipe-description'
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                {recipe.description}
              </Text>
              {/* <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text> */}
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Ingredients
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>{recipe.ingredients}</ListItem>
                  <ListItem>Olive Oil</ListItem>{' '}
                  <ListItem>Chicken Breasts</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Pepper</ListItem>
                  <ListItem>Brown Sugar</ListItem>
                  <ListItem>Egg </ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Steps
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    First:
                  </Text>{' '}
                  {recipe.steps}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Second:
                  </Text>{' '}
                  Heat the oil in a saucepan over a high heat. Add the pancetta
                  and cook, stirring, for about 2–3 minutes, or until the fat
                  has rendered and the bacon is golden and crisp. Remove from
                  the pan with a slotted spoon and drain on kitchen paper.
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Third:
                  </Text>{' '}
                  Add the onion and carrots to the pancetta pan and cook for 5
                  minutes until the onion is softened. Add the celery and garlic
                  and cook for a further 3–4 minutes, stirring occasionally.
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    After the Oven:
                  </Text>{' '}
                  Add the thyme, bay leaf, stock and tomatoes, stir and bring to
                  a gentle simmer. Add the lentils and cook for 20–25 minutes,
                  or until they are softened. Remove the bay leaf and use a
                  stick blender or food processor to partially blend the soup,
                  keeping a fairly chunky texture.
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Then:
                  </Text>{' '}
                  Bring the soup back to a simmer, add the cabbage and cook for
                  3–4 minutes until wilted. Reheat the pancetta in a small
                  frying pan at the same time.
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Fridge:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Finally:
                  </Text>{' '}
                  Enjoy !{' '}
                </ListItem>
              </List>
            </Box>
          </Stack>

          {/* <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Add to cart
          </Button> */}

          {/* <Stack direction='row' alignItems='center' justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
