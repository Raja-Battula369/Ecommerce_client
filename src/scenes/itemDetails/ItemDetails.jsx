import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdRemove,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addToCart,
  addToWatchList,
  removeFromWatchList,
} from '../../state/Index';
import '../../App.scss';
import Item from '../../components/Item';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isInWatchList, setIsInWatchList] = useState(false);

  const WatchList = useSelector((state) => state.cart.watchList);
  const getItem = async () => {
    try {
      const item = await axios.get(
        `https://ecserver1.onrender.com/api/items/${itemId}?populate=image`
      );
      setItem(item.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getItems = async () => {
    try {
      const item = await axios.get(
        `https://ecserver1.onrender.com/api/items?populate=image`
      );
      setItems(item.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItem();
    getItems();
    setCount(1);
    setIsInWatchList(false);
  }, [itemId]);

  useEffect(() => {
    const data = WatchList?.find((data) => data?.id === item?.id);
    data !== undefined ? setIsInWatchList(true) : setIsInWatchList(false);
  }, [WatchList]);

  return (
    <Container maxW={'full'} p="2rem">
      <Stack
        direction={['column', 'row']}
        w="full"
        p={'1.5rem'}
        alignItems="flex-start"
        gap={'2rem'}
      >
        <Skeleton isLoaded={item} flex={'1 1 50%'}>
          <Image
            maxW={['100%', '100%']}
            maxH={['100%', '100%']}
            alt={item?.name}
            src={`${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            objectFit="cover"
          />
        </Skeleton>
        <VStack
          alignItems={'flex-start'}
          className="font1"
          gap={'1rem'}
          flex={'1 1 50%'}
        >
          <Text className="font2" fontSize={'xl'} as="b">
            {item?.attributes?.name}
          </Text>
          <Text as="b">Rs {item?.attributes?.price} /-</Text>
          <Text>{item?.attributes?.shortDescription}</Text>
          <HStack>
            <Box display={'flex'} alignItems="center" borderRadius={'3px'}>
              <>
                <IconButton
                  borderRadius={'0'}
                  icon={<MdRemove />}
                  onClick={() => setCount(Math.max(count - 1, 1))}
                />
                <IconButton borderRadius={'0'}>
                  <Text as={'b'}>{count}</Text>
                </IconButton>
                <IconButton
                  borderRadius={'0'}
                  icon={<MdAdd />}
                  onClick={() => setCount(count + 1)}
                />
              </>
            </Box>
            <Button
              size={'sm'}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              color="white"
              bgColor={'blackAlpha.500'}
            >
              Add to Cart
            </Button>
          </HStack>
          <HStack gap={'1rem'}>
            {isInWatchList ? (
              <Icon
                color={'red'}
                as={MdFavorite}
                sx={{ cursor: 'pointer' }}
                onClick={() => dispatch(removeFromWatchList({ id: item.id }))}
              />
            ) : (
              <Icon
                as={MdOutlineFavoriteBorder}
                sx={{ cursor: 'pointer' }}
                onClick={() => dispatch(addToWatchList({ add: { ...item } }))}
              />
            )}

            <Text>Add To WishList</Text>
          </HStack>
          <Text>CATEGORIES: {item?.attributes?.category}</Text>
        </VStack>
      </Stack>
      <Tabs className="font2">
        <TabList>
          <Tab>DESCRIPTION</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text className="font1">{item?.attributes?.longDescription}</Text>
          </TabPanel>
          <TabPanel>
            <Text>under Work</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text as={'b'} className="font1">
        Related Products
      </Text>
      <HStack
        minW="full"
        wrap={'wrap'}
        justifyContent={['center', 'center', 'flex-start']}
      >
        {items.slice(0, 4).map((item, i) => (
          <Item item={item} key={`${item.name}-${i}`} />
        ))}
      </HStack>
    </Container>
  );
};

export default ItemDetails;
