import { useNavigate } from 'react-router-dom';
import React from 'react';

import useMountOnce from '@hooks/useMountOnce';
import Loading from '@components/loading';

const Logout: React.FC = () => {
  const navigate = useNavigate()

  useMountOnce(() => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/signin');
    }, 1500);
  });

  return (
    <Loading message={"Estamos deslogando você"}/>
  );
};

export default Logout;
