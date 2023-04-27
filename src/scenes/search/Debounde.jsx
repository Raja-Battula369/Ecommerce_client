import React, { useEffect } from 'react';

const Debounde = ({ qurey, setQurey, event, delay }) => {
  useEffect(() => {
    console.log(qurey);
    let timeout = setTimeout(() => {
      setQurey(event.target.value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [qurey]);
  return '';
};

export default Debounde;
