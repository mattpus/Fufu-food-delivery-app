import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify'
import config from './src/aws-exports'
import { withAuthenticator} from 'aws-amplify-react-native';
import AuthContextProvider from './src/contexts/AuthContext'
Amplify.configure({...config, Analytics: {disabled: true}})
const App = ()  => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
         <StatusBar />
         <AuthContextProvider>
        <Navigation colorScheme={colorScheme} />
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}


export default withAuthenticator(App)