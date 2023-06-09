import {
  HStack,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setItems } from '../../state/Index';
import Item from '../../components/Item';

const ShoppingItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { colorMode } = useColorMode();

  const getItems = async () => {
    try {
      const items = await axios.get(
        'https://ecserver1.onrender.com/api/items?populate=image'
      );
      dispatch(setItems(items.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const topRatedItems = items.filter(
    (item) => item.attributes.category === 'topRated'
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === 'newArrivals'
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === 'bestSellers'
  );

  return (
    <VStack width={'80%'} m="80px auto" className="font2">
      <Text fontSize={'xl'}>
        Our Featured <Text as={'b'}>Products</Text>{' '}
      </Text>
      <Tabs
        colorScheme={colorMode === 'light' ? 'black' : 'white'}
        align="center"
        isLazy={true}
      >
        <TabList sx={{ cursor: 'pointer' }} id="More">
          <Tab as={'b'}>All</Tab>
          <Tab as={'b'}>NEW ARRIVALS</Tab>
          <Tab as={'b'}>BEST SELLERS</Tab>
          <Tab as={'b'}>TOP RATED</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Skeleton isLoaded={items.length !== 0}>
              <HStack
                maxW={'full'}
                justifyContent={['center', 'center', 'flex-start']}
                wrap={'wrap'}
                p="0.3rem"
                m="0.4rem"
              >
                {items?.map((item) => (
                  <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
              </HStack>
            </Skeleton>
          </TabPanel>
          <TabPanel>
            <Skeleton isLoaded={items.length !== 0}>
              <HStack
                maxW={'full'}
                justifyContent={['center', 'center', 'flex-start']}
                wrap={'wrap'}
                p="0.3rem"
                m="0.4rem"
              >
                {newArrivalsItems?.map((item) => (
                  <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
              </HStack>
            </Skeleton>
          </TabPanel>
          <TabPanel>
            <Skeleton isLoaded={items.length !== 0}>
              <HStack
                maxW={'full'}
                justifyContent={['center', 'center', 'flex-start']}
                wrap={'wrap'}
                p="0.3rem"
                m="0.4rem"
              >
                {bestSellersItems?.map((item) => (
                  <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
              </HStack>
            </Skeleton>
          </TabPanel>
          <TabPanel>
            <HStack
              maxW={'full'}
              justifyContent={['center', 'center', 'flex-start']}
              wrap={'wrap'}
              p="0.3rem"
              m="0.4rem"
            >
              {topRatedItems?.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ShoppingItems;
