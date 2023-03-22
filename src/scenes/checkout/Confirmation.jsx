import {
  Alert,
  AlertIcon,
  AlertTitle,
  Container,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Confirmation = () => {
  return (
    <Container minH={'50vh'} minW={'100%'}>
      <VStack h={'100%'} w={'100%'}>
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Success</AlertTitle>
          You have successfully made an Order
        </Alert>
      </VStack>
    </Container>
  );
};

export default Confirmation;
