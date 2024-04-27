import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
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
      }, 100);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const Loader = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading === true && isConnected === false ? (
        <Loader />
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
