import { Button } from '@chakra-ui/button';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrash } from 'react-icons/bs';
import Icon from '@chakra-ui/icon';
import { Box, Container, Flex, Grid, Text } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useLocalStorage } from 'react-use';
import { useApp } from './AppContext';
import ProductModal from './ProductModal';

function App() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = useLocalStorage('products', []);

  //data from context API
  const { handleClick, isOpen, onClose } = useApp();

  let mounted;

  React.useEffect(() => {
    mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'http://www.mocky.io/v2/5c3e15e63500006e003e9795'
        );
        if (res.status === 200) {
          setState(res.data.products);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  //fucntion to delete a product
  const handleDelete = (id) => {
    const newList = state.filter((item) => item.id !== id);
    setState(newList);
  };

  return (
    <Box>
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        setData={setState}
        data={state}
      />
      <Container my={20}>
        <Box mb={10} textAlign='right'>
          <Button
            colorScheme='blue'
            onClick={() => handleClick(null, 'Add a product', null, 'add')}
          >
            Add a new Product
          </Button>
        </Box>
        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6}>
          {loading ? (
            <Text>loading...</Text>
          ) : (
            state.map((item) => (
              <Stat key={item.id} borderWidth={1} p={3} rounded='md'>
                <StatLabel>{item.name}</StatLabel>
                {item.prices.map((price) => (
                  <Box key={price.id}>
                    <StatNumber fontSize='lg'>GHC{price.price}</StatNumber>
                    <StatHelpText>
                      {moment(price.date).format('LL')}
                    </StatHelpText>
                  </Box>
                ))}

                <Flex align='center' justify='space-between'>
                  <Flex
                    align='center'
                    as='button'
                    role='button'
                    aria-label='edit button'
                    mr={2}
                    color='blue.500'
                    onClick={() =>
                      handleClick(item, 'Edit product', item.id, 'edit')
                    }
                  >
                    <Icon as={HiPencilAlt} />
                    Edit
                  </Flex>

                  <Flex
                    align='center'
                    as='button'
                    role='button'
                    aria-label='edit button'
                    mr={2}
                    color='red.500'
                    onClick={() => handleDelete(item.id)}
                  >
                    <Icon as={BsTrash} />
                    Delete
                  </Flex>
                </Flex>
              </Stat>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
