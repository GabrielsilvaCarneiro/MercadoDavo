import React from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('bem-vindo'); // Adjust the path as necessary
  };

  return (
    <>
    <Stack.Screen style={styles.option} options={{ title: '' }} />
      <ImageBackground 
        source={require('@/assets/images/telinha-inicial.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">                                                </ThemedText>
          <TouchableOpacity onPress={handlePress} style={styles.link}>
            <ThemedText style={styles.button} type="link">Pronto para começar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option:{
    top: -20,
  },
  options:{
    top: -20,
  },
  link: {
    marginTop: 305,
    width:185,
    height:55,
    alignItems: 'center',
    backgroundColor: '#690000',
    borderRadius:10,
  },
  button:{
    fontSize:16,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#ccc',
    top:12.5,
  }
});



