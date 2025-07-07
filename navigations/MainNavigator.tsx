import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyBooksScreen from "../screens/MyBooksScreen";
import AddBooksScreen from "../screens/AddBooksScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditBooksScreen from "../screens/EditBooksScreen";

import { Ionicons } from '@expo/vector-icons';
import OrderBooksScreen from "../screens/OrderBooksScreen";



const Stack = createStackNavigator()

function MyStack() {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={MyTabs} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Tab" component={MyTabs} />
        </Stack.Navigator>

    )
}

const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'help';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'AddBooks') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'EditBooks') {
                        iconName = focused ? 'create' : 'create-outline';
                    } else if (route.name === 'MyBooks') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e40af', //este es el color del icono cuando estas en la pagina. Para q puedas cambiarlo
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="AddBooks" component={AddBooksScreen} options={{ title: "Añadir Libros" }} />
            <Tab.Screen name="EditBooks" component={EditBooksScreen} options={{ title: "Editar Libros" }} />
            <Tab.Screen name="MyBooks" component={MyBooksScreen} options={{ title: "Mis Libros" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
            <Tab.Screen name="OrderBooks" component={OrderBooksScreen} options={{ title: "Ordenes" }} />
        </Tab.Navigator>
    );
}


export default function NavegadorPrincipal() {

    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}