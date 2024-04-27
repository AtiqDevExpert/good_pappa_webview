import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {WebView} from 'react-native-webview';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = NetInfo.addEventListener(state => {
      setTimeout(() => {
        setIsConnected(state?.isConnected);
        setLoading(false);
      }, 1000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const Splash = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          resizeMode="contain"
          source={require('./splash.png')}
          style={{flex: 1, justifyContent: 'center'}}></ImageBackground>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading === true && isConnected === false ? (
        <Splash />
      ) : isConnected === true ? (
        <WebView
          originWhitelist={['*']}
          source={{uri: 'https://Goodpappa.com'}}
          ignoreSslError={true}
          cacheEnabled={false}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text>No Internet Available</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
