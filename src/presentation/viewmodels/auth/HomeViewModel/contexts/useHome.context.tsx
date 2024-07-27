import { useContext } from 'react';

import { IHome } from '../types/home.type';
import { HomeContext } from './home.context';

 const useHomeContext = (): IHome.Output => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error(
      'useHome must be used within an HomeProvider',
    );
  }

  return context;
};

export {useHomeContext}