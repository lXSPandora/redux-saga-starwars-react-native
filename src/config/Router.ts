import { StackNavigator,  } from 'react-navigation';
import Home from '../screens/Home/Home';

export const RouteNames = {
  HOME: 'HOME',
};

export const Router = StackNavigator({
  [RouteNames.HOME]: {
    screen: Home
  },
}, {
  initialRouteName: RouteNames.HOME,
  navigationOptions: {
    header: null
  }
});