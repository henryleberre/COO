import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import { Entypo, Foundation, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'; 
import { Text, View, SafeAreaView, ScrollView, Image, Dimensions, Pressable, Button } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Emoji    from 'react-native-emoji';
import Carousel from 'react-native-snap-carousel';

const APP_NAME = "COO";

let PAGES = [
  { bShow: true,  icon: (size, color) => <Entypo        name="magnifying-glass" size={size} color={color} />, title: "Discover",               component: App_Discover },
  { bShow: true,  icon: (size, color) => <Entypo        name="heart-outlined"   size={size} color={color} />, title: "For You",                component: App_Discover },
  { bShow: true,  icon: (size, color) => <Entypo        name="ticket"           size={size} color={color} />, title: "My Events",              component: App_MyEvents },
  { bShow: true,  icon: (size, color) => <Foundation    name="dollar-bill"      size={size} color={color} />, title: "Sell",                   component: App_Discover },
  { bShow: true,  icon: (size, color) => <MaterialIcons name="account-circle"   size={size} color={color} />, title: "My Account",             component: App_Discover },
  { bShow: false, icon: () => {},                                                                             title: "Category",               component: App_Category },
  { bShow: false, icon: () => {},                                                                             title: "EventConditions",        component: App_EventConditions },
  { bShow: false, icon: () => {},                                                                             title: "ComplianceConsent",      component: App_ComplianceConsent },
  { bShow: false, icon: () => {},                                                                             title: "Privacy Policy",         component: App_PrivacyPolicy },
  { bShow: false, icon: () => {},                                                                             title: "SelectSeats",            component: App_SelectSeats },
  { bShow: false, icon: () => {},                                                                             title: "Pay",                    component: App_Pay},
  { bShow: false, icon: () => {},                                                                             title: "GetTicketFinished",      component: App_GetTicketFinished },
  { bShow: false, icon: () => {},                                                                             title: "Tickets",                component: App_Tickets }
];

const CATEGORIES = [
  { name: "The Rolling Stones", backgroundImageRes: require("./assets/the-rolling-stones.jpg"), rating: 4.8 },
  { name: "Les Inconnus",       backgroundImageRes: require("./assets/les-inconnus.jpg"),       rating: 4.5 }
];

let EVENTS = [
  { category: "The Rolling Stones", name: "The Rolling Stones Concert", date: { day: 17, month: "Nov", dayName: "Wed", time: "7:30pm" }, location: "Grant Field - Atlanta, GA",           covidLocation: "The Box Office", seatImage: require('./assets/bobby-dodd-stadium.jpg'), operation: "The Rolling Stones - No Filter Tour 2021" },
  { category: "Les Inconnus",       name: "Les Inconnus Concert",       date: { day: 17, month: "Nov", dayName: "Wed", time: "7:30pm" }, location: "Mercedes-Benz Stadium - Atlanta, GA", covidLocation: "The Box Office", seatImage: require('./assets/bobby-dodd-stadium.jpg'), operation: "Les Inconnus - Le Retour" }
];

let TICKETS = [  ];

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
            }} onPress={() => { navigation.navigate("EventConditions", { categoryID: route.params, eventID: i }) }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 17, fontWeight: "600", color: "purple" }}>{e.date.month} {e.date.day}</Text>
                  <Text style={{ paddingLeft: 10, fontSize: 17 }}>{e.date.dayName}</Text>
                  <Entypo name="dot-single" size={24} color="black" />
                  <Text style={{ fontSize: 17 }}>{e.date.time}</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: "700" }}>{e.location}</Text>
                  <Text style={{ fontSize: 17, fontWeight: "400" }}>{e.operation}</Text>
                </View>
                <View style={{ paddingTop: 10,
                               flexDirection: "row",
                               justifyContent: "center",
                               alignItems: "center"
                }}>
                  <Ionicons name="medical" size={24} color="red" />
                  <Text style={{ paddingLeft: 10 }}>This event imposes health requirements</Text>
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

function App_EventConditions({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event = EVENTS[route.params.eventID];

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ padding: 10,
                       justifyContent: "center",
                       alignItems: "center"
        }}>
          <Ionicons name="medical" size={24} color="red" />
          <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "800" }}>"{event.name}" Health Requirements</Text>
        </View>
        <View style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
          <Emoji name="wave" style={{ fontSize: 60 }} />
          <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Text>We'll guide you through the simple process of satisfying the health requirements</Text>            
          </View>
        </View>
        <Text style={{ textAlign: "center" }}>Your safety is our priority.</Text>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>Event Conditions</Text>
          <Text style={{ paddingTop: 10 }}>To attend this event, ticket holders 13 and older must:</Text>
          <View>
            <Text style={{ paddingTop: 10 }}>- Be fully vaccinated against Covid-19</Text>
            <Text style={{ paddingTop: 10 }}>- or Have taken a negative test for Covid-19, a maximum of 72h prior to the start of the event</Text>
            <Text style={{ paddingTop: 10 }}>- or Have been tested positive within less than 180 days and more than 14</Text>
            <Text style={{ paddingTop: 10 }}>- or Have this requirement waived at the discretion of the event organizers.</Text>
          </View>
        </View>
        <Button onPress={() => {navigation.navigate("ComplianceConsent", route.params)}} title="I agree to the above requirements"></Button>
        <Text>{'\n\n'}</Text>
      </View>
    </ScreenHolder>
  );
}

function App_ComplianceConsent({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event = EVENTS[route.params.eventID];

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ padding: 10,
                       justifyContent: "center",
                       alignItems: "center"
        }}>
          <Ionicons name="medical" size={24} color="red" />
          <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "800" }}>"{event.name}" Health Requirements</Text>
        </View>
        <View style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
          <Emoji name="wave" style={{ fontSize: 60 }} />
          <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Text>We'll guide you through the simple process of satisfying the health requirements</Text>            
          </View>
        </View>
        <Text style={{ textAlign: "center" }}>Your safety is our priority.</Text>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>Compliance</Text>
          <Text style={{ paddingTop: 10 }}>To show proof they fit the health requirements, each ticket holder must choose either:</Text>
          <View>
            <Text style={{ paddingTop: 10 }}>- Bring physical documentation to show prior to entry at "{event.covidLocation}"</Text>
            <Text style={{ paddingTop: 10 }}>- Use our free service "COO" embedded within this application to upload their documents. Feel free to checkout its privacy policy beforehand. A ticket master account is required for any ticket holder that chooses to use COO.</Text>
            <Text style={{ paddingTop: 20, fontWeight: "800", textAlign: "center", textDecorationLine: "underline" }}>COO's Privacy Policy</Text>
          </View>
        </View>
        <Button onPress={() => {navigation.navigate("SelectSeats", route.params)}} title="I agree to use one of these options"></Button>
        <Text>{'\n'}</Text>
        <Text style={{ textAlign: "center", padding: 10 }}>Clicking on the above button does not constitute agreeing to COO's Privacy Policy.</Text>
        <Text>{'\n\n'}</Text>
      </View>
    </ScreenHolder>
  );
}

function App_SelectSeats({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event = EVENTS[route.params.eventID];

  const [seatCount, setSeatCount] = useState(1);

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <Image style={{ width: "100%",
                      height: Dimensions.get('window').width*1609/2500,
                      resizeMode: "cover"
      }} source={event.seatImage} />
      <View style={{padding: 20}}>
        <View style={{ borderColor: "blue", borderWidth: 2, padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ fontSize: 17 }}>{seatCount} Ticket{seatCount>1 ? "s" : ""}</Text>
            <View style={{ marginHorizontal: 10 }}></View>
          </View>
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
            <Pressable style={{paddingHorizontal: 10}} onPress={() => {setSeatCount(seatCount-1 > 1 ? seatCount-1 : 1, 1)}}><Text style={{ fontWeight: "800", fontSize: 25 }}>-</Text></Pressable>
            <Pressable style={{paddingHorizontal: 10}} onPress={() => {setSeatCount(seatCount+1)}}><Text style={{ fontWeight: "800", fontSize: 25 }}>+</Text></Pressable>
          </View>
        </View>
        {[...Array(5).keys()].map((e, i) => {
          return <Pressable key={i} onPress={() => {navigation.navigate("Pay", Object.assign({}, route.params, { nTickets: seatCount }))}}>
          <TouchableOpacity>
            <View style={{ paddingVertical: 20, flexDirection: "row", alignItems: "center", borderBottomWidth: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "800" }}>Section XXX, Row YY</Text>
                <View style={{ paddingVertical: 5 }}></View>
                <Text>Standard Seating</Text>
              </View>
              <Text style={{ color: "purple", fontWeight: "800", fontSize: 18 }}>$XX.XX/ea</Text>
            </View>
          </TouchableOpacity>
        </Pressable>;
        })}
      </View>
    </ScreenHolder>
  );
}

function App_Pay({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event    = EVENTS[route.params.eventID];
  let nTickets = route.params.nTickets;

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text>{'\n'}</Text>
        <View style={{ paddingVertical: 25, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: "800", fontSize: 20, paddingVertical: 10 }}>Payment Method(s):</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingTop: 10 }}>
            <Image source={require('./assets/visa.png')} style={{ width: 130, height: 80 }} />
            <Text style={{ flex: 1, fontSize: 17, fontWeight: "600", textAlign: "center" }}>Visa *-XXX</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ flexDirection: "row", paddingVertical: 20, justifyContent: "space-around" }}>
            <Text style={{ fontWeight: "800", fontSize: 20 }}>Total:</Text>
            <Text style={{ fontWeight: "800", fontSize: 20 }}>$XX.XX</Text>
          </View>
        </View>
        <Pressable onPress={() => {navigation.navigate("GetTicketFinished", route.params)}} style={{ backgroundColor: "green", padding: 10, borderRadius: 10 }}>
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center", fontWeight: "600" }}>Place Order</Text>
          </TouchableOpacity>
        </Pressable>
        <Text style={{ paddingVertical: 2, fontWeight: "700", paddingVertical: 20 }}>*Conditions may apply, view our Terms of Use.</Text>
      </View>
    </ScreenHolder>
  );
}

function App_GetTicketFinished({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event    = EVENTS[route.params.eventID];
  let nTickets = route.params.nTickets;

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text>{'\n'}</Text>
        <AntDesign style={{ alignSelf: "center" }} name="checkcircle" size={80} color="green" />
        <Text>{'\n'}</Text>
        <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "600"}}>Congratulations, your tickets have been reserved!</Text>
        <Text>{'\n'}</Text>
        <Ionicons style={{ alignSelf: "center" }} name="medical" size={80} color="red" />
        <Text>{'\n'}</Text>
        <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "600"}}>Using COO - If you want</Text>
        <Text>{'\n'}</Text>
        <Text style={{ fontSize: 20, textAlign: "justify" }}>If a ticket holder wishes to use COO to ensure compliance with the event's health requirements, simply navigate to my "My Events" tab.</Text>
        <Text>{'\n'}</Text>
        <Pressable style={{ backgroundColor: "black", padding: 10, borderRadius: 20 }} onPress={ () => { EVENTS.push({ name: event.name, count: nTickets }); navigation.navigate("My Events") } }>
          <TouchableOpacity>
            <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>View your Ticket(s) & COO</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </ScreenHolder>
  );
}

function App_PrivacyPolicy({ navigation, route }) {
  const categoryID = route.params.categoryID;
  const eventID    = route.params.eventID;

  let event = EVENTS[route.params.eventID];

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
        <Text style={{ fontSize: 17, color: "#FFFFFF"}}>{event.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity><Entypo name="heart-outlined" size={25} color="white" /></TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}></View>
          <TouchableOpacity><Entypo name="share-alternative" size={25} color="white" /></TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "800", textAlign: "center" }}>COO Privacy Policy</Text>
      </View>
    </ScreenHolder>
  );
}

function App_MyEvents({ navigation }) {

  // TODO: USE GLOBAL STATE
  TICKETS = [ { name: "The Rolling Stones Concert", count: 2 } ]

  return (
    <ScreenHolder navigation={navigation}>
      <View style={{ height: 48,
                     width: "100%",
                     backgroundColor: "#1F262D",
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     paddingHorizontal: 10,
                     justifyContent: "center"
      }}>
        <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>My Events</Text>
      </View>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>Your Ticket(s)</Text>
        <View style={{ paddingVertical: 20 }}>
          {TICKETS.map((t, i) => {
            let event    = EVENTS.find((e) => t.name == e.name);
            let category = CATEGORIES.find((c) => c.name == event.category);

            return (
              <View key={i}>
                <Pressable style={{ paddingHorizontal: 15,
                                    width: "100%",
                                    height: 120
                }} onPress={ () => { navigation.navigate("Tickets", { event, category, ticketID: i }) } }>
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
                    }} source={category.backgroundImageRes} />
                    <View style={{ width: "60%",
                                  height: 100,
                                  justifyContent: "center"
                    }}>
                      <Text style={{ color: "#026CDF",
                                    fontSize: 20,
                                    fontWeight: "700",
                                    paddingVertical: 5,
                                    paddingLeft: 10
                      }}>{event.name}</Text>
                      <View style={{ paddingVertical: 5, paddingLeft: 10 }}>
                        <Text text50>{t.count} Ticket(s)</Text>
                        <View style={{ paddingVertical: 2 }}></View>
                        <Text text50>{ event.location }</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            )
          })}
        </View>
      </View>
    </ScreenHolder>
  );
}

function App_Tickets({ navigation, route }) {
  let tickets  = TICKETS[route.params.ticketID];
  let category = route.params.category;

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
        <Ionicons name="chevron-back-outline" size={35} color="white" />
        <Text style={{ flex: 1, textAlign: "center", color: "#FFFFFF", fontSize: 20, fontWeight: "800" }}>{route.params.event.name}</Text>
      </View>
      <View style={{ backgroundColor: "#1F262D",
                     paddingHorizontal: 20,
                     paddingVertical: 10
      }}>
        <Image style={{ width: "100%",
                        height: undefined,
                        aspectRatio: 16.0/9.0 }} source={category.backgroundImageRes} />
        <View style={{ paddingVertical: 10 }}></View>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "800" }}>{category.name}</Text>
        <View style={{ paddingVertical: 2 }}></View>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "300" }}>Tickets</Text>
        <View style={{ paddingVertical: 10 }}></View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Carousel
          data={[0, 1, 2, 3]}
          renderItem={({e, i}) => {
            return (
              <View style={{ backgroundColor: "red", width: 400, height: 400 }}>
                <Text style={{fontSize: 40}}>Communist {i}</Text>
              </View>
            )
          }}
          sliderWidth={1000}
          itemWidth={1000}
        />
      </View>
    </ScreenHolder>
  )
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