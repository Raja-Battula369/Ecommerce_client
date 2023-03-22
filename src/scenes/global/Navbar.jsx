import React from 'react';
import {
  HStack,
  Icon,
  Heading,
  Badge,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdOutlineShoppingBag,
  MdOutlineFavoriteBorder,
  MdOutlineSearch,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';
import '../../App.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsCartOpen,
  setIsSearchOn,
  setIsWatchListOpen,
} from '../../state/Index';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const WatchList = useSelector((state) => state.cart.watchList);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      className="font1"
      px="3rem"
      py="1rem"
      justifyContent={'space-between'}
      maxW={'full'}
    >
      <Heading
        fontSize={['small', 'lg', 'xl', '2xl']}
        onClick={() => navigate('/')}
        sx={{ '&:hover': { cursor: 'pointer' } }}
        color="#4982de"
      >
        E-COMMeRCe
      </Heading>
      <HStack maxW={'full'} gap={['0.5rem', '1rem']}>
        <Box>
          <Icon
            title="search"
            boxSize={['1.5rem', '2rem']}
            as={MdOutlineSearch}
            sx={{ cursor: 'pointer' }}
            onClick={() => dispatch(setIsSearchOn({}))}
          />
        </Box>
        <Box>
          {colorMode === 'light' ? (
            <Icon
              title="Dark"
              boxSize={['1.5rem', '2rem']}
              as={MdOutlineDarkMode}
              sx={{ cursor: 'pointer' }}
              onClick={toggleColorMode}
            />
          ) : (
            <Icon
              title="Light"
              boxSize={['1.5rem', '2rem']}
              as={MdOutlineLightMode}
              sx={{ cursor: 'pointer' }}
              onClick={toggleColorMode}
            />
          )}
        </Box>

        <Box>
          <Badge
            pos={'relative'}
            bgColor={'red.500'}
            borderRadius={'full'}
            fontSize="0.7rem"
            left={['2rem', '2.5rem']}
            top={['-0.5rem', '-1rem']}
            title="cart1"
            color={'white'}
          >
            {cart.length > 9 ? '9+' : cart.length !== 0 ? cart.length : ''}
          </Badge>

          <Icon
            onClick={() => {
              dispatch(setIsCartOpen({}));
            }}
            title="cart"
            boxSize={['1.5rem', '2rem']}
            as={MdOutlineShoppingBag}
            sx={{ cursor: 'pointer' }}
          />
        </Box>

        <Box>
          <Badge
            pos={'relative'}
            bgColor={'red.500'}
            borderRadius={'full'}
            fontSize="0.7rem"
            left={['2.1rem', '2.6rem']}
            top={['-0.5rem', '-1rem']}
            title="cart1"
            color={'white'}
          >
            {WatchList.length > 9
              ? '9+'
              : WatchList.length !== 0
              ? WatchList.length
              : ''}
          </Badge>
          <Icon
            title="WatchList"
            boxSize={['1.5rem', '2rem']}
            as={MdOutlineFavoriteBorder}
            onClick={() => {
              dispatch(setIsWatchListOpen({}));
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </HStack>
    </HStack>
  );
};

export default Navbar;
