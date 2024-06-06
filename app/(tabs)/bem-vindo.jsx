import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const BemVindoScreen = () => {
  const navigation = useNavigation();

  const goToIndexScreen = () => {
    navigation.navigate('login');
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/bemvindo.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Seja Bem-vindo{"\n"}ao App D'Avó</Text>
        </View>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.button} onPress={goToIndexScreen}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 275,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  textContainer: {
    justifyContent: 'center',
    marginVertical:50,
  },
  text: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1d9d00',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default BemVindoScreen;
