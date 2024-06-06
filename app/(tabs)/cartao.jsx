import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Switch, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isDefaultPayment, setIsDefaultPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const navigation = useNavigation();

  const handleSave = () => {

    navigation.navigate('check-in');
    // Adicione a lógica para salvar os dados do cartão aqui
    Alert.alert('Dados do cartão salvos com sucesso!');
  };

  const handleCardNumberChange = (text) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    setCardNumber(cleaned);
  };

  const handleExpiryDateChange = (text) => {
    // Remove todos os caracteres não numéricos e limita a 4 caracteres
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    // Adiciona a barra (/) entre mês e ano automaticamente
    const formatted = cleaned.match(/.{1,2}/g)?.join('/') || cleaned;
    setExpiryDate(formatted);
  };

  const handleCvvChange = (text) => {
    // Remove todos os caracteres não numéricos e limita a 3 caracteres
    const cleaned = text.replace(/\D/g, '').slice(0, 3);
    setCvv(cleaned);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/tela-cartao.png')}
          style={styles.reactLogo}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Cadastre seu Cartão, Ticket!
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.titleLoc}>
            Aceitamos cartões de débito e crédito, preencha os campos abaixo!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Número do cartão"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome do titular"
            placeholderTextColor="#aaa"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
          <View style={styles.inlineInputs}>
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="Validade (MM/AA)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              maxLength={5}
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
            />
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="CVV"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={handleCvvChange}
              secureTextEntry
            />
          </View>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              Usar como forma de pagamento padrão
            </Text>
            <Switch
              value={isDefaultPayment}
              onValueChange={setIsDefaultPayment}
              trackColor={{ false: "#767577", true: "#2AE600" }}
              thumbColor={isDefaultPayment ? "#00974A" : "#f4f3f4"}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar forma de pagamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 220,
    width: '100%',
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  titleText: {
    color: '#000',
    fontSize: 22,
  },
  titleLoc: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    marginHorizontal: 25,
    backgroundColor: '#fff',
  },
  stepContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    paddingLeft: 8,
    marginBottom: 25,
    color: '#000',
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inlineInput: {
    flex: 1,
    marginRight: 10,
    left: 5,
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  confirmationText: {
    color: '#000',
    fontSize: 12,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#00974A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});