import { type FC, type ReactElement } from 'react';
import { HomeProvider } from '@/presentation/viewmodels/auth/HomeViewModel/contexts/home.context';

 const AllModelsContexts: FC<
  { children: ReactElement | ReactElement[], appIsLoaded:boolean }
> = ({ children , appIsLoaded}) => {

  return (
    <HomeProvider appIsLoaded={appIsLoaded}>
      {children}
    </HomeProvider>
  );
};

export {AllModelsContexts}
