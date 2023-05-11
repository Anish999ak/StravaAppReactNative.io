import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Activities = ({navigation:{navigate}}:any) => {
  
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const getActivities = async() => {
    let access_token= await AsyncStorage.getItem("accessToken");

    if(access_token!==null)
    {
      axios
      .get('https://www.strava.com/api/v3/athlete/activities', {
        headers: {Authorization: `Bearer ${access_token}`},
      })
      .then(res => {
        setdata(res.data), setloading(false);
      })
      .catch(err => {
        seterror(true), console.error(err);
      });
    }
    else{
      navigate("Login");
    }
    
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Athlete Activity</Text>
      {loading ? (
        <View>
          <Text style={styles.title}>Loading...</Text>
        </View>
      ) : (
        <ScrollView>
          {Array.from(data).map((el: any,index:number) => {
            return (
              <View key={index} style={styles.box}>
                <Text style={styles.text}>Name: {el.name}</Text>
                <Text style={styles.text}>Sport type: {el.sport_type}</Text>
                <Text style={styles.text}>Distance: {el.distance}</Text>
                <Text style={styles.text}>Average Speed: {el.average_speed}</Text>
                <Text style={styles.text}>Max Speed: {el.max_speed}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color:'black'
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
  box:
  {
    backgroundColor:'lightblue',
    borderRadius:5,
    marginTop:10,
    width:300,
    flex: 1,
    padding:20 
  }
});
