import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateActivity = ({navigation: {navigate}}: any) => {
  const [open, setOpen] = useState(false);
  const {accessToken} = useSelector((state: any) => state);
  const [name, setname] = useState('');
  const [type, settype] = useState('');
  const [sport_type, setsport_type] = useState('');
  const [start_date_local, setstart_date_local] = useState(new Date());
  const [elapsed_time, setelapsed_time] = useState(0);
  const [description, setdescription] = useState('');
  const [distance, setdistance] = useState(0);
  const [trainer, settrainer] = useState(0);
  const [commute, setcommute] = useState(0);

  const handleCreate = async () => {
    let access_token = await AsyncStorage.getItem('accessToken');

    axios
      .post(
        `https://www.strava.com/api/v3/activities?access_token=${access_token}&name=${name}&sport_type=${type}&start_date_local=${start_date_local}&elapsed_time=${elapsed_time}&trainer=${trainer}&description=${description}&commute=${commute}&distance=${distance}`,
      )
      .then(res => navigate('Activities'))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          style={styles.input1}
          placeholderTextColor="lightblue"
          onChangeText={setname}></TextInput>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Type"
            style={styles.input}
            placeholderTextColor="lightblue"
            onChangeText={settype}></TextInput>
          <TextInput
            placeholder="Sport"
            style={styles.input}
            placeholderTextColor="lightblue"
            onChangeText={setsport_type}></TextInput>
        </View>
        <View style={styles.inputcontainer}>
          <Button
            title="Start date local"
            onPress={() => setOpen(true)}
            color="lightblue"
          />
          <TextInput
            placeholder="Elapsed time"
            style={styles.input}
            placeholderTextColor="lightblue"
            onChangeText={(e: any) => setelapsed_time(e)}></TextInput>
        </View>
        <TextInput
          placeholder="Description"
          style={styles.input1}
          placeholderTextColor="lightblue"
          onChangeText={setdescription}></TextInput>
        <TextInput
          placeholder="Distance"
          style={styles.input1}
          placeholderTextColor="lightblue"
          onChangeText={(e: any) => setdistance(e)}></TextInput>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Trainer"
            style={styles.input}
            placeholderTextColor="lightblue"
            onChangeText={(e: any) => settrainer(e)}></TextInput>
          <TextInput
            placeholder="Commute"
            style={styles.input}
            placeholderTextColor="lightblue"
            onChangeText={(e: any) => setcommute(e)}></TextInput>
        </View>
        <Button
          title="Create"
          color="lightblue"
          onPress={() => handleCreate()}
          disabled={
            name === '' ||
            type === '' ||
            sport_type === '' ||
            elapsed_time === 0
          }></Button>
      </View>
      <DatePicker
        modal
        open={open}
        date={start_date_local}
        onConfirm={date => {
          setOpen(false);
          setstart_date_local(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
    backgroundColor: 'transparent',
    width: 330,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'yellow',
    gap: 10,
  },
  inputcontainer: {
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    borderWidth: 1,
    width: '49%',
    padding: 5,
    borderColor: 'yellow',
    borderRadius: 5,
    color: 'lightcoral',
  },
  input1: {
    borderWidth: 1,
    width: '100%',
    padding: 5,
    borderColor: 'yellow',
    borderRadius: 5,
    color: 'lightcoral',
  },
});
