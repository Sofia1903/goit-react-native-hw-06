import { StyleSheet } from 'react-native';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ButtonLogOut } from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { logOut } from '../redux/operations';
import { useDispatch } from 'react-redux';

export default function HomeScreen() {
  const Tabs = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Tabs.Navigator initialRouteName="PostsScreen">
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: 'Posts',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ tintColor }) => <Icon name="grid" color={tintColor} size={24} />,
          // headerStyle: {
          //     justifyContent: 'center',
          // },
          headerRight: () => (
            <ButtonLogOut
              onPress={() => {
                dispatch(logOut());
                navigation.navigate('LoginScreen');
              }}
            />
          ),
          headerRightContainerStyle: { paddingRight: 20 },
        }}
      />
      <Tabs.Screen
        name="CreatePostScreen"
        component={CreatePostsScreen}
        options={{
          title: 'Create Post',
          headerTitleAlign: 'center',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ tintColor }) => (
            <Ionicon name="add-circle-outline" color={tintColor} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ tintColor }) => <Icon name="user" color={tintColor} size={24} />,
        }}
      />
    </Tabs.Navigator>
  );
}

// const styles = StyleSheet.create({
//   out: { paddingRight: 20, color: '#212121', marginRight: 20 },
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
// },
// });
