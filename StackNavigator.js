import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MusicScreen from "./screens/MusicScreen";
import FavoritesScreen from "./screens/FavoritesScreen";


const Tab = createBottomTabNavigator()
function BottomTabs() {
    return (<Tab.Navigator screenOptions={{
        tabBarStyle:{
            backgroundColor:"white",
            elevation:4,
            borderTopWidth:0 
        }
    }}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home', headerShown: false, tabBarLabelStyle: { color: 'black' },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Entypo name="home" size={24} color="black" />
                       
                    ) : (
                        <AntDesign name="home" size={24} color="black" />
                    ),
            }}
        />
        <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
                tabBarLabel: "Favorites",
                headerShown: false,
                tabBarLabelStyle: { color: "black" },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <AntDesign name="heart" size={24} color="black" /> 
                    ) : (
                        <AntDesign name="hearto" size={24} color="black" />
                    ),
            }}
        />
    </Tab.Navigator>)
}

const Stack = createNativeStackNavigator()
function Navigation (){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                 <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}} />
                 <Stack.Screen name="Music" component={MusicScreen} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation