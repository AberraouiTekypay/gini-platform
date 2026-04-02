import 'intl-pluralrules';

import React from 'react';
import AppNavigation from './AppNavigation';
import {TailwindProvider} from 'tailwindcss-react-native';
import AppProvider from './src/AppContext';

function App(): JSX.Element {
  return (
    <TailwindProvider>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </TailwindProvider>
  );
}

export default App;
