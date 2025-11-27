import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('Paathner', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Paathner', {
    rootTag: document.getElementById('root'),
  });
}
