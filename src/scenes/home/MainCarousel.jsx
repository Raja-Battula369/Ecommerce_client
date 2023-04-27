import {
  Box,
  IconButton,
  Image,
  Skeleton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.scss';

const importAll = (r) => {
  return r.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = r(item);
    return acc;
  }, {});
};
export const heroTextureImports = importAll(
  require.context('../../assets', false, /\.(png|jpe?g|svg)$/)
);
const MainCarousel = () => {
  const [isNonMobile] = useMediaQuery('(min-width: 600px)');

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          pos="absolute"
          top="50%"
          left="0"
          color={'white'}
          p="5px"
          zIndex={10}
          icon={<MdNavigateBefore />}
          fontSize={40}
          backgroundColor="rgb(0, 0, 0, 0.4)"
        />
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          pos="absolute"
          top="50%"
          right="0"
          color={'white'}
          p="5px"
          zIndex={10}
          icon={<MdNavigateNext />}
          fontSize={40}
          backgroundColor="rgb(0, 0, 0, 0.4)"
        />
      )}
    >
      {Object?.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <Skeleton isLoaded={texture}>
            <Image
              src={texture}
              alt={`carousel-${index}`}
              w="100%"
              height={'600px'}
              objectFit="cover"
              backgroundAttachment={'fixed'}
            />
          </Skeleton>
          <Box
            className="font2"
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? undefined : '0'}
            margin={isNonMobile ? undefined : '0 auto'}
            maxW={isNonMobile ? undefined : '240px'}
          >
            <Text fontSize={'smaller'} color={'#6897e3'}>
              -- New ITEMS
            </Text>
            <Text fontSize={'2xl'} color={'#bbd4ed'}>
              Summer Sale
            </Text>
            <a href="#More">
              <Text
                textDecor={'underline'}
                as="b"
                fontSize={'smaller'}
                color="#227bd4"
              >
                Discover More
              </Text>
            </a>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
