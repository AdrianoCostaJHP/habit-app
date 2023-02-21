import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Habit } from "../screens/Habit";
import { CreateHabit } from "../screens/Habit/create";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Screen name="home" component={Home} />
      <Screen name="habit" component={Habit} />
      <Screen name="createHabit" component={CreateHabit} />
    </Navigator>
  );
}
