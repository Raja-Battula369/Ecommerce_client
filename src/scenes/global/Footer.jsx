import { HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import '../../App.scss';
const Footer = () => {
  const [breakPoint] = useMediaQuery('(min-width: 671px)');

  return (
    <HStack
      className="font2"
      w="full"
      mt="70px"
      bgColor={'grey'}
      justifyContent="space-evenly"
      p="1rem"
      wrap={'wrap'}
    >
      <VStack w={breakPoint ? '30%' : ''}>
        <Text as={'b'}>E-COMMeRCe</Text>
        <Text maxW={'90%'} fontSize="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Text>
      </VStack>
      <VStack>
        <Text as={'b'}> About Us</Text>
        <VStack fontSize="small">
          <Text>Careers</Text>
          <Text>Our Stores</Text>
          <Text>Terms & Conditions</Text>
          <Text>Pivacy Policy</Text>
        </VStack>
      </VStack>
      <VStack>
        <Text as={'b'}> Customer Care</Text>
        <VStack fontSize="small">
          <Text>Help Center</Text>
          <Text>Track Your Order</Text>
          <Text>Corporate & Bulk Purchasing</Text>
          <Text>Returns & Refunds</Text>
        </VStack>
      </VStack>
      <VStack>
        <Text as={'b'}> Contact Us</Text>
        <VStack fontSize="small">
          <Text> 50 north Whatever Blvd, Washington, DC 10501</Text>
          <Text>Email:buttulavenkatamuralikrishnaraj@gmail.com</Text>
          <Text>(91+)8328027690</Text>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default Footer;
