import { type FC, type ReactElement } from 'react';
import { HomeProvider } from '../../viewmodels/HomeViewModel/contexts/home.context';

 const AllModelsContexts: FC<
  { children: ReactElement | ReactElement[] }
> = ({ children }) => {

  return (
    <HomeProvider defaultValue={[]}>
      {children}
    </HomeProvider>
  );
};

export {AllModelsContexts}
