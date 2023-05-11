import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {authorize} from 'react-native-app-auth';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import {useDispatch, useSelector} from 'react-redux'
import { getToken } from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation: {navigate}, route}: any) => {
  const config = {
    clientId: '106811',
    clientSecret: '5b93f93b9536407cf88b71ccf4c9bedfaf51f710',
    redirectUrl: 'stravaapp://myapp.com',
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
      tokenEndpoint:
        `https://www.strava.com/oauth/token?client_id=106811&client_secret=5b93f93b9536407cf88b71ccf4c9bedfaf51f710`,
    },
    scopes: ["activity:read_all,activity:write",]
  };

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
    } catch (error) {
    }
  };

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleLogin]);

  const handleDeepLink = async (url: any) => {
    let code = url.url.split('=')[2].split('&')[0];
    const data = {
      client_id: '106811',
      client_secret: '5b93f93b9536407cf88b71ccf4c9bedfaf51f710',
      code,
      grant_type: 'authorization_code',
    };
    if (code) {
      axios
        .post('https://www.strava.com/oauth/token', data)
        .then((res: any) => {AsyncStorage.setItem('expiresAt', res.data.expires_at),AsyncStorage.setItem('accessToken', res.data.access_token),navigate("Activities")})
        .catch(err => console.error(err));
    }
  };
  const getAccessToken=async()=>
  {
    let access_token= await AsyncStorage.getItem("accessToken");
    let expires_at= await AsyncStorage.getItem("expires_at");
    if(access_token!==null)
    {
      setTimeout(()=>
      {
        navigate('Activities');
      },2000)
    }
    else{
      navigate('Login');
    }
  }
  useEffect(()=>
  {
    getAccessToken()
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Button
          title="Login with strava"
          color="lightblue"
          onPress={() => handleLogin()}></Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
  },
});

function handleDeepLink(arg0: {url: string}) {
  throw new Error('Function not implemented.');
}


