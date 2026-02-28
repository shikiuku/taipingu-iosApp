import CourseSelect from '@/screens/CourseSelect';
import GameScreen from '@/screens/GameScreen';
import ResultScreen from '@/screens/Result';
import TitleScreen from '@/screens/TitleScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator
      initialRouteName="Title"
      screenOptions={{ headerShown: false, orientation: 'landscape' }}
    >
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="CourseSelect" component={CourseSelect} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}
