import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Grid,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useApp } from './AppContext';

const ProductModal = ({ isOpen, onClose, setData, data }) => {
  //state and data from context API
  const { state, title, mode } = useApp();

  const [values, setValues] = React.useState({
    id: state?.id || '',
    name: state?.name || '',
    price: {
      price: state?.prices ? state?.prices[0]?.price : '',
    },
    price2: {
      price: state?.prices ? state?.prices[1]?.price : '',
    },
  });

  //handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //get random IDs
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 3;
  }

  //form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: getRandomInt(10),
      name: values.name,
      prices: [
        {
          id: getRandomInt(9),
          date: new Date(),
          price: values.price,
        },
        {
          id: getRandomInt(8),
          date: new Date(),
          price: values.price2,
        },
      ],
    };
    //copy state from state and append new data
    const newStateItem = [...data, newData];
    setData(newStateItem);

    //set input fields back to empty
    setValues({
      id: '',
      name: '',
      price: {
        price: '',
      },
      price2: {
        price: '',
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <form onSubmit={handleSubmit}>
            <Grid gap={4}>
              <FormControl>
                <FormLabel fontSize='sm' color='gray.500'>
                  Product name
                </FormLabel>
                <Input
                  placeholder='Product name'
                  id='name'
                  name='name'
                  onChange={handleChange}
                  value={values.name}
                />
              </FormControl>
              <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                <FormControl>
                  <FormLabel fontSize='sm' color='gray.500'>
                    Price 1
                  </FormLabel>
                  <Input
                    placeholder='10'
                    type='number'
                    id='price'
                    name='price'
                    value={values.price.price}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize='sm' color='gray.500'>
                    Price 2
                  </FormLabel>
                  <Input
                    placeholder='10'
                    type='number'
                    id='price2'
                    name='price2'
                    value={values?.price2?.price}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Button colorScheme='blue' type='submit'>
                {mode === 'add' ? 'Add' : 'Edit'} product
              </Button>
            </Grid>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
