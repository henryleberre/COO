import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { Entypo, Foundation, MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { Text, View, SafeAreaView, ScrollView, Image, Dimensions, Pressable } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler'

const APP_NAME = "KooKoo";

let PAGES = [
  { bShow: true,  icon: (size, color) => <Entypo        name="magnifying-glass" size={size} color={color} />, title: "Discover",   component: App_Discover },
  { bShow: true,  icon: (size, color) => <Entypo        name="heart-outlined"   size={size} color={color} />, title: "For You",    component: App_Discover },
  { bShow: true,  icon: (size, color) => <Entypo        name="ticket"           size={size} color={color} />, title: "My Events",  component: App_Discover },
  { bShow: true,  icon: (size, color) => <Foundation    name="dollar-bill"      size={size} color={color} />, title: "Sell",       component: App_Discover },
  { bShow: true,  icon: (size, color) => <MaterialIcons name="account-circle"   size={size} color={color} />, title: "My Account", component: App_Discover },
  { bShow: false, icon: () => {},                                                                             title: "Category",   component: App_Category }
];

const CATEGORIES = [
  { name: "The Rolling Stones", backgroundImageRes: require("./assets/the-rolling-stones.jpg"), rating: 4.8 },
  { name: "Les Inconnus",       backgroundImageRes: require("./assets/les-inconnus.jpg"),       rating: 4.5 }
];

let EVENTS = [
  { category: "The Rolling Stones", name: "The Rolling Stones Concert", date: { day: 17, month: "Nov", dayName: "Wed", time: "7:30pm" }, location: "Atlanta, GA" },
  { category: "Les Inconnus",       name: "Les Inconnus Concert",       date: { day: 17, month: "Nov", dayName: "Wed", time: "7:30pm" }, location: "Atlanta, GA" }
];

let TICKETS = [
  { name: "", count: 1 }
];

function GetEventsFilter(category) {
  return EVENTS.filter((e) => e.category==category);
}

const Stack = createNativeStackNavigator();

function App_Discover({ navigation }) {
  return (<ScreenHolder navigation={navigation}>
    <View>
      <Image style={{ width: "100%",
        height: Dimensions.get('window').width*202/1102,
        resizeMode: "cover"
      }}
      source={require('./assets/ticketmaster.png')} />
      <Text style={{
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontWeight: "600",
        fontSize: 30
      }}>Trending</Text>
      <View flex>
        {CATEGORIES.map((e, i) => {
          return (
            <TouchableOpacity key={i}  onPress={() => { navigation.navigate("Category", i); }}>
              <Pressable style={{ paddingHorizontal: 15,
                                  width: "100%",
                                  height: 100
              }}>
                <View flex style={{ borderBottomWidth: 0.5,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                }}>
                  <Image resizeMethod="scale" style={{
                    width: "40%",
                    height: undefined,
                    aspectRatio: 16.0/9.0,
                    borderRadius: 10,
                    borderColor: "black"
                  }} source={e.backgroundImageRes} />
                  <View style={{ width: "60%",
                                height: 100,
                                justifyContent: "center"
                  }}>
                    <Text style={{ color: "#026CDF",
                                  fontSize: 20,
                                  fontWeight: "700",
                                  paddingVertical: 5,
                                  paddingLeft: 10
                    }}>{e.name}</Text>
                    <Text text50 style={{ paddingVertical: 5, paddingLeft: 10 }}>{GetEventsFilter(e.name).length} Upcoming Event{GetEventsFilter(e.name).length > 1 ? "s" : ""}</Text>
                  </View>
                </View>
              </Pressable>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  </ScreenHolder>);
}

function App_Category({ navigation, route }) {
  let category       = CATEGORIES[route.params];
  let categoryEvents = GetEventsFilter(category.name);

  return (
    <ScreenHolder navigation={navigation}>
      <View style={{ height: 48,
                     width: "100%",
                     backgroundColor: "#1F262D",
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     paddingHorizontal: 10,
                     justifyContent: "space-between"
      }}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name="chevron-back-outline" size={35} color="white" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: "#1F262D",
                     paddingHorizontal: 20,
                     paddingVertical: 20
      }}>
        <View style={{ padding: 5,
                       borderRadius: 5,
                       borderWidth: 1,
                       borderColor: "#FFFFFF",
                       alignSelf: 'flex-start',
                       flexDirection: "row",
                       alignItems: "center",
                       marginBottom: 10
        }}>
          <Entypo name="star" size={15} color="white" />
          <Text style={{ color: "#FFFFFF" }}>{category.rating}</Text>
        </View>
        <Image style={{ width: "100%",
                        height: undefined,
                        aspectRatio: 16.0/9.0 }} source={category.backgroundImageRes} />
        <View style={{ paddingVertical: 10 }}></View>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "800" }}>{category.name}</Text>
        <View style={{ paddingVertical: 2 }}></View>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "300" }}>Tickets</Text>
        <View style={{ paddingVertical: 10 }}></View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ paddingRight: 20 }}>
            <View style={{ paddingBottom: 7, borderBottomColor: "#FFFFFF", borderBottomWidth: 3 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20 }}>Events ({categoryEvents.length})</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingRight: 20 }}>
            <View style={{ paddingBottom: 7 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20 }}>Reviews</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingRight: 20 }}>
            <View style={{ paddingBottom: 7 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20 }}>Bio</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        {categoryEvents.map((e, i) => {
          return (
            <TouchableOpacity key={i} style={{ paddingBottom: 10,
                                               borderBottomWidth: 0.5,
                                               flexDirection: "row"
            }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 17, fontWeight: "600", color: "purple" }}>{e.date.month} {e.date.day}</Text>
                  <Text style={{ paddingLeft: 10, fontSize: 17 }}>{e.date.dayName}</Text>
                  <Entypo name="dot-single" size={24} color="black" />
                  <Text style={{ fontSize: 17 }}>{e.date.time}</Text>
                </View>
              </View>
              <View>
                <Entypo name="dots-three-vertical" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScreenHolder>
  );
}

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

        if (e.bShow) {
          return (
            <Pressable key={i} flex style={{alignItems: "center"}} onPress={()=>{navigation.navigate(e.title)}}>
              {e.icon(30, color)}
              <Text style={{color: color, fontSize: 10}}>{e.title}</Text>
            </Pressable>
          );
        }
      })}
    </View>
  );
}

function ScreenHolder({ navigation, children }) {
  return (
    <Fragment>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {children}
      </ScrollView>
      <App_Footer navigation={navigation} />
    </Fragment>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#1F262D' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} flex>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Discover">
            {PAGES.map((e, i) => {
              return (<Stack.Screen key={i} name={e.title}>
                {props => <e.component {...props} />}
              </Stack.Screen>);
            })}
          </Stack.Navigator>
        </SafeAreaView>
        <StatusBar style="inverted" />
      </Fragment>
    </NavigationContainer>
  );
}