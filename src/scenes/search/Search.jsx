import {
  Box,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  IconButton,
  useColorMode,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { setIsSearchOn } from '../../state/Index';
import { useNavigate } from 'react-router-dom';
import '../../App.scss';
const Search = () => {
  const IsSearchOn = useSelector((state) => state.cart.isSearchOn);
  const [query, setQuery] = useState(null);
  const [items, SetItems] = useState([]);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getSearchData = async () => {
      try {
        const { data } = await axios.get(
          `https://ecserver1.onrender.com/api/items?populate=*&filters[name][$contains]=${query}`
        );
        SetItems(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchData();
  }, [query]);

  return (
    <Box
      display={IsSearchOn ? 'block' : 'none'}
      pos={'fixed'}
      zIndex={10}
      w="100%"
      h={'100%'}
      left="0"
      top="0"
      overflow={'auto'}
      color={colorMode === 'light' ? 'black' : 'white'}
      backgroundColor={colorMode === 'light' ? 'white' : 'black'}
      className={'animation font1'}
    >
      <VStack w="100%" h="100%" p="2rem" gap={'1rem'}>
        <HStack>
          <Heading textDecor={'underline'} fontSize={['md', '2xl']}>
            Search for Products
          </Heading>
          <IconButton
            isRound
            icon={<MdClose />}
            onClick={() => {
              setQuery(null);
              dispatch(setIsSearchOn({}));
            }}
            size="md"
          />
        </HStack>
        <Input
          p={'1rem'}
          type={'text'}
          value={query === null ? '' : query}
          placeholder="Type here..."
          onChange={(e) => setQuery(e.target.value)}
        />

        <VStack m="1rem 0">
          {items?.map((item, i) => (
            <HStack
              key={`${item.name}-${i}`}
              m="1rem 0"
              w="60%"
              shadow="md"
              onClick={() => {
                dispatch(setIsSearchOn({}));
                navigate(`/item/${item.id}`);
                setQuery(null);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <Skeleton isLoaded={item}>
                <Image
                  src={`${item.attributes.image.data.attributes.formats.medium.url}`}
                  alt={item.attributes.name}
                  w="70px"
                  h="70px"
                  objectFit={'cover'}
                />
              </Skeleton>
              <Box>
                <Text className="font2" noOfLines={1}>
                  {item.attributes.name}
                </Text>
                <Text noOfLines={1}>{item.attributes.shortDescription}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Search;
