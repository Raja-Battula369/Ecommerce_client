import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../state/Index';
import '../App.scss';

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, SetIsHovered] = useState(false);
  const { colorMode } = useColorMode();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        pos={'relative'}
        onMouseOver={() => SetIsHovered(true)}
        onMouseOut={() => SetIsHovered(false)}
      >
        <Skeleton isLoaded={url}>
          <Image
            alt={item.name}
            title={item.name}
            w="300px"
            h="400px"
            objectFit={'cover'}
            src={`${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
            sx={{ cursor: 'pointer' }}
          />
        </Skeleton>
        <Box
          display={isHovered ? 'block' : 'none'}
          pos="absolute"
          bottom={'10%'}
          left="0"
          p="0 5%"
        >
          <HStack justifyContent={'space-between'}>
            <Box display={'flex'} alignItems="center" borderRadius={'3px'}>
              <ButtonGroup
                gap={'0'}
                size="sm"
                colorScheme={colorMode === 'light' ? 'gray' : 'red'}
              >
                <IconButton
                  borderRadius={'0'}
                  icon={<MdRemove />}
                  onClick={() => setCount(Math.max(count - 1, 1))}
                />
                <IconButton borderRadius={'0'}>
                  <Text>{count}</Text>
                </IconButton>
                <IconButton
                  borderRadius={'0'}
                  icon={<MdAdd />}
                  onClick={() => setCount(count + 1)}
                />
              </ButtonGroup>
            </Box>
            <Button
              size={'sm'}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              color={'black'}
              bgColor={colorMode === 'light' ? 'grey' : 'red.600'}
            >
              Add to Cart
            </Button>
          </HStack>
        </Box>
      </Box>

      <Box mt="0.3rem" textAlign={'left'}>
        <Text
          className="font1"
          color={colorMode === 'light' ? 'blackAlpha.500' : 'white'}
        >
          {category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        </Text>
        <Text className="font2" title={name} noOfLines={1} maxW="15rem">
          {name}
        </Text>
        <Text as={'b'}>Rs {price}</Text>
      </Box>
    </Box>
  );
};

export default Item;
