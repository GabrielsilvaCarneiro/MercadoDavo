import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TextInput, View, Switch, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada', 'Permita o acesso à localização para continuar.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;

      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        let { city, district, street, postalCode } = reverseGeocode[0];
        setCity(city);
        setNeighborhood(district);
        setAddress(street);
        setZipCode(postalCode);
      }
    })();
  }, []);

  const handleSaveLocation = () => {
    Alert.alert('Localização salva!');
    navigation.navigate('check-in');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('@/assets/images/localiza-map.jpg')}
          style={styles.reactLogo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Selecione a sua localização!
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.titleLoc}>
            Ative a localização do seu smartphone e preencha os campos abaixo!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#aaa"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor="#aaa"
            value={address}
            onChangeText={setAddress}
          />
          <View style={styles.inlineInputs}>
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="Nº do Endr"
              placeholderTextColor="#aaa"
              value={houseNumber}
              onChangeText={setHouseNumber}
            />
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="CEP"
              placeholderTextColor="#aaa"
              value={zipCode}
              onChangeText={setZipCode}
            />
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="Referência"
              placeholderTextColor="#aaa"
              value={complement}
              onChangeText={setComplement}
            />
          </View>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              Usar como endereço padrão
            </Text>
            <Switch
              value={isDefaultAddress}
              onValueChange={setIsDefaultAddress}
              trackColor={{ false: "#767577", true: "#2AE600" }}
              thumbColor={isDefaultAddress ? "#00974A" : "#f4f3f4"}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
            <Text style={styles.saveButtonText}>Salvar localização</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  scrollContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo branca
  },
  titleText: {
    color: '#000', // Cor do texto preta
    fontSize: 24, // Diminuir tamanho da fonte
    marginVertical:-50,
  },
  titleLoc: {
    textAlign: 'center', // Centralizar o texto
    alignSelf: 'center', // Centralizar o texto
    color: '#000', // Cor do texto preta
    fontSize: 14, // Tamanho da fonte do subtítulo
    marginBottom: 12, // Adiciona um gap abaixo do subtítulo
    paddingHorizontal:40,
    marginVertical:-10,

  },
  stepContainer: {
    gap: 5,
    marginBottom: 10,
    alignItems: 'center', // Garantir que o contêiner centralize os itens
  },
  inputContainer: {
    padding: 30,
    backgroundColor: '#fff',

  
  },
  input: {
    height: 40,
    borderBottomColor: '#000', // Cor da borda inferior preta
    borderBottomWidth: 1.5, // Largura da borda inferior
    paddingLeft: 8,
    marginBottom: 18,
    color: '#000', // Cor do texto dos inputs
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    flex: 1,
    marginRight: 6,
    left:3,
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  confirmationText: {
    color: '#000', // Cor do texto preta
    fontSize: 14, // Diminuir tamanho da fonte do texto
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#00974A', // Cor do botão
    borderRadius: 10, // Border radius do botão
    padding: 10,
    alignItems: 'center', // Centralizar o texto do botão
  },
  saveButtonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 16, // Tamanho do texto do botão
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
  },
});