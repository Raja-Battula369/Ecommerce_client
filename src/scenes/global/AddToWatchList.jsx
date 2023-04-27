import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Skeleton,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { removeFromWatchList, setIsWatchListOpen } from '../../state/Index';
import '../../App.scss';
import { useNavigate } from 'react-router-dom';
const AddToWatchList = () => {
  const dispatch = useDispatch();
  const WatchList = useSelector((state) => state.cart.watchList);
  const IsCartOpen = useSelector((state) => state.cart.isWatchList);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

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
        color={colorMode === 'light' ? 'black' : 'white'}
        bgColor={colorMode === 'light' ? 'white' : 'black'}
        className="animation1"
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
            WatchList{' '}
            <Text as={'b'} color="#4982de">
              {WatchList.length}
            </Text>{' '}
          </Text>
          <Icon
            title="close"
            as={MdClose}
            onClick={() => dispatch(setIsWatchListOpen({}))}
          />
        </HStack>
        {/* body  */}
        <Box>
          {WatchList?.map((item) => (
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
                      onClick={() => {
                        dispatch(setIsWatchListOpen({}));
                        navigate(`/item/${item.id}`);
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Skeleton>
                </Box>
                <Box flex={'1 1 60%'}>
                  <HStack justifyContent={'space-between'} mb="0.3rem">
                    <Text
                      as="b"
                      noOfLines={2}
                      title={item.attributes.name}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        dispatch(setIsWatchListOpen({}));

                        navigate(`/item/${item.id}`);
                      }}
                    >
                      {item.attributes.name}{' '}
                    </Text>
                    <Icon
                      as={MdClose}
                      onClick={() =>
                        dispatch(removeFromWatchList({ id: item.id }))
                      }
                    />
                  </HStack>
                  <Text noOfLines={2}>{item.attributes.shortDescription}</Text>
                </Box>
              </HStack>
              <VStack alignItems={'flex-end'}>
                <Text as={'b'} px="1rem">
                  Rs {item.attributes.price}
                </Text>
              </VStack>

              <Divider />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddToWatchList;
