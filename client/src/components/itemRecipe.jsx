// import Image from 'next/image'
import {
  Box,
  Center,
  Image,
  Heading,
  Text,
  Stack,
  Badge,
  // Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'


export default function ItemRecipe({ recipe }) {
  // let navigate = useNavigate()

  return (
    <Center py={6}>
      <Box
        maxW={'7xl'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box h={'420px'} bg={'gray.100'} mt={-6} mx={-6} mb={6}>
          <Image
            role='food-image'
            src={
              'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=pexels-pixabay-461198.jpg&fm=jpg'
            }
            layout={'fill'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={'100%'}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {recipe.cuisine}
          </Heading>
          <Text color={'gray.500'} role="definition">{recipe.description}</Text>
        </Stack>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #spicy
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #wrap
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #carbs
          </Badge>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          {/* <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          /> */}
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>  {recipe.username}</Text>
            <Text color={'gray.500'}>{moment(recipe.updated_at).format('DD MMM YYYY')}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
