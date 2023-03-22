import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdClose, MdRemove } from 'react-icons/md';
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from '../../state/Index';
import makePayment from '../checkout/makePayment';
import '../../App.scss';

const CartMenu = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const IsCartOpen = useSelector((state) => state.cart.isCartOpen);

  const { colorMode } = useColorMode();
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    // layout
    <Box
      display={IsCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0,0,0,0.4)"
      pos={'fixed'}
      zIndex={10}
      width="100%"
      height={'100%'}
      left="0"
      top="0"
      overflow={'auto'}
    >
      {/* cart */}
      <Box
        color={colorMode === 'light' ? 'black' : 'white'}
        bgColor={colorMode === 'light' ? 'white' : 'black'}
        pos={'fixed'}
        right="0"
        buttom="0"
        width={['full', 'max(400px,30%)']}
        height="100%"
        overflow={'auto'}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        className="animation1 font1"
      >
        {/* header  */}
        <HStack
          shadow={'md'}
          w="full"
          p="2rem"
          className="font1"
          justifyContent={'space-between'}
        >
          <Text fontSize={'md'}>
            SHOPPING BAG{' '}
            <Text as={'b'} color="#4982de">
              {cart.length}
            </Text>
          </Text>
          <Icon
            title="close"
            as={MdClose}
            onClick={() => dispatch(setIsCartOpen({}))}
          />
        </HStack>
        {/* body  */}
        <Box>
          {cart?.map((item) => (
            <Box
              key={`${item.attributes.name}-${item.id}`}
              shadow={'lg'}
              m="0.6rem 0"
            >
              <HStack justifyContent={'space-between'} p="0.5rem 1rem">
                <Box flex={'1 1 40%'}>
                  <Skeleton isLoaded={item}>
                    <Image
                      width={'123px'}
                      height={'164px'}
                      title={item?.name}
                      alt={item?.name}
                      src={`${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Skeleton>
                </Box>
                <Box flex={'1 1 60%'}>
                  <HStack justifyContent={'space-between'} mb="0.3rem">
                    <Text as="b" noOfLines={2} title={item.attributes.name}>
                      {item.attributes.name}{' '}
                    </Text>
                    <Icon
                      as={MdClose}
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    />
                  </HStack>
                  <Text noOfLines={2} title={item.attributes.shortDescription}>
                    {item.attributes.shortDescription}
                  </Text>
                  <HStack m="0.5rem 0" justifyContent={'space-between'}>
                    <Box display={'flex'} alignItems="center">
                      <IconButton
                        size={'sm'}
                        borderRadius={'0'}
                        icon={<MdRemove />}
                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                      />
                      <IconButton borderRadius={'0'} size={'sm'}>
                        <Text>{item.count}</Text>
                      </IconButton>

                      <IconButton
                        size={'sm'}
                        borderRadius={'0'}
                        icon={<MdAdd />}
                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                      />
                    </Box>
                    <Text as={'b'}>Rs {item.attributes.price}</Text>
                  </HStack>
                </Box>
              </HStack>
              <Divider />
            </Box>
          ))}
        </Box>
        {/* foot  */}
        <Box m="1rem 0">
          <HStack p="0 0.5rem" m="1rem 0" justifyContent={'space-between'}>
            <Text as={'b'}>SUBTOTAL</Text>
            <Text as="b">RS {totalPrice}</Text>
          </HStack>
          <Button
            px="0.4rem"
            color={'white'}
            bgColor="#4982de"
            borderRadius={'0'}
            minWidth="100%"
            p="1rem 2rem"
            onClick={() => {
              makePayment(cart);
              dispatch(setIsCartOpen({}));
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
