import { Box } from '@chakra-ui/react';
import React from 'react';
import MainCarousel from './MainCarousel';
import ShoppingItems from './ShoppingItems';
import Subscribe from './Subscribe';

const Home = () => {
  return (
    <Box scrollBehavior={'smooth'}>
      <MainCarousel />
      <ShoppingItems />
      <Subscribe />
    </Box>
  );
};

export default Home;
