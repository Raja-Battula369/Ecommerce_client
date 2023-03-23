import { Box, Button, Icon, Input, Text, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import '../../App.scss';

const Subscribe = () => {
  const [email, SetEmail] = useState('');

  const { colorMode } = useColorMode();
  return (
    <Box
      w={'80%'}
      m="80px auto"
      textAlign={'center'}
      className="img"
      color={colorMode === 'light' ? 'black' : 'black'}
    >
      <Icon as={MdOutlineMarkEmailRead} boxSize="2rem" />
      <Text className="font2">Subscribe To Our Newsletter</Text>
      <Text className="font1">
        and receive $20 coupon for your first order when you checkout{' '}
      </Text>
      <Box p="2px 4px" m="15px auto" display="flex" alignItems="center" w="75%">
        <Input
          w="80%"
          ml="1"
          placeholder="Enter Email"
          onChange={(e) => SetEmail(e.target.value)}
          value={email}
          border={'1px solid black'}
        />
        <Button
          className="font2"
          p="10px"
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Subscribe;
