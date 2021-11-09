import React, { Fragment } from 'react';
import { Entypo, Foundation, MaterialIcons } from '@expo/vector-icons'; 
import { Text, View, SafeAreaView, ScrollView, Image, Dimensions, Pressable } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App_Discover({ navigation }) {
  return (<ScreenHolder navigation={navigation}>
    <View>
      <Image style={{ width: "100%",
        height: Dimensions.get('window').width*202/1102,
        resizeMode: "cover"
      }}
      source={require('./assets/ticketmaster.png')} />
    </View>
  </ScreenHolder>);
}

let PAGES = [
  { bShow: true, icon: (size, color) => <Entypo        name="magnifying-glass" size={size} color={color} />, title: "Discover",   component: App_Discover },
  { bShow: true, icon: (size, color) => <Entypo        name="heart-outlined"   size={size} color={color} />, title: "For You",    component: App_Discover },
  { bShow: true, icon: (size, color) => <Entypo        name="ticket"           size={size} color={color} />, title: "My Events",  component: App_Discover },
  { bShow: true, icon: (size, color) => <Foundation    name="dollar-bill"      size={size} color={color} />, title: "Sell",       component: App_Discover },
  { bShow: true, icon: (size, color) => <MaterialIcons name="account-circle"   size={size} color={color} />, title: "My Account", component: App_Discover },
];

function App_Footer({ navigation }) {
  const routes       = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1].name;

  return (
    <View style={{
        height: 55,
        borderTopColor: "gray",
        borderTopWidth: 0.5,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#FFFFFF"
    }}>
      {PAGES.map((e, i) => {
        const color = currentRoute == e.title ? "blue" : "gray";

        return (<Pressable key={i} flex style={{alignItems: "center"}} onPress={()=>{navigation.navigate(e.title)}}>
          {e.icon(30, color)}
          <Text style={{color: color, fontSize: 10}}>{e.title}</Text>
        </Pressable>);
      })}
    </View>
  );
}

function ScreenHolder({ navigation, children }) {
  return (<Fragment>
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {children}
    </ScrollView>
    <App_Footer navigation={navigation} />
  </Fragment>);
}

export default function App() {
  return (
    <NavigationContainer>
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#1F262D' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} flex>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Discover">
            {PAGES.map((e, i) => {
              if (e.bShow)
                return (<Stack.Screen key={i} name={e.title}>
                  {props => <e.component {...props} />}
                </Stack.Screen>);
            })}
          </Stack.Navigator>
          
        </SafeAreaView>
      </Fragment>
    </NavigationContainer>
  );
}