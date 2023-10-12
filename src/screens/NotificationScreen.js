import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image,FlatList } from 'react-native'
import CustomHeader from '../components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { userPhoto } from '../utils/Images'
import PushController from '../utils/PushController';

let pushData = [
  {
    title: "First push",
    message: "First push message"
  },
  {
    title: "Second push",
    message: "Second push message"
  }
]

_renderItem = ({ item }) => (
  <View key={item.title}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
  </View>
);

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.Container}>
      <CustomHeader commingFrom={'Notification'} onPress={() => navigation.goBack()} title={'Notification'} />
      <ScrollView style={styles.wrapper}>
        <TouchableOpacity style={{ marginBottom: 5 }} onPress={null}>
          <Text style={styles.clearNotitext}>Clear Notification</Text>
        </TouchableOpacity>
        {/* <View style={styles.notifictionContainer}>
          <View style={styles.singlenotificationView}>
            <Image
              source={userPhoto}
              style={styles.imageView}
            />
            <View style={styles.notificationTextView}>
              <Text style={styles.notificationTextOne}>+911 656325698 sent a request as an user</Text>
              <Text style={styles.notificationTextTwo}>Yesterday at 11:48 PM</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.notifictionContainer}>
          <View style={styles.singlenotificationView}>
            <Image
              source={userPhoto}
              style={styles.imageView}
            />
            <View style={styles.notificationTextView}>
              <Text style={styles.notificationTextOne}>+911 656325698 sent a request as an user</Text>
              <Text style={styles.notificationTextTwo}>Yesterday at 11:48 PM</Text>
            </View>
          </View>
        </View> */}
        <FlatList
              data={pushData}
              renderItem={(item ) => this._renderItem(item)}
              keyExtractor={(item ) => item.title}
            />
      </ScrollView>
    </SafeAreaView>
  )
}


export default NotificationScreen


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    padding: 20,
    marginBottom: responsiveHeight(1)
  },
  clearNotitext: {
    alignSelf: 'flex-end',
    color: '#310499',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular'
  },
  imageView: {
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(4),

  },
  notifictionContainer: {
    paddingVertical: 5,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  singlenotificationView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationTextView: {
    flexDirection: 'column',
    width: responsiveWidth(70),
    padding: 10
  },
  notificationTextOne: {
    color: '#2F2F2F',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.8)
  },
  notificationTextTwo: {
    color: '#9C9C9C',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.6)
  }
});