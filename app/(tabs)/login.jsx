import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BemVindoScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const goToIndexScreen = () => {
    if (!validateEmail(email)) {
      Alert.alert('Email inválido', 'Por favor, insira um email válido.');
      return;
    }

    if (!validatesenha(password)) {
      Alert.alert('Erro', 'Preencha a senha corretamente.');
      return; 
    }
    Alert.alert('Você está de volta!!', 'Bem-vindo(a)!!');
    navigation.navigate('compras');

  };

  const goTogoogle = () => {{
    navigation.navigate('compras');
    Alert.alert('Você foi cadastrado com o Google', 'Bem-vindo Marcos!!');
    return;
  }
  };

  const botaoentrar = () => {
    navigation.navigate('registro');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatesenha = (Password) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(Password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.circle}>
          <Image source={require('@/assets/images/user2.png')} style={styles.avatar} />
          <Text style={styles.nome}>Entre na sua conta</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Pronto para explorar?</Text>
          <Text style={styles.subtitle}>Faça login para uma melhor experiência</Text>
          <TextInput
            style={styles.input}
            placeholder="Entre com seu email:"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Entre com a sua senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.togglePassword}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={goToIndexScreen}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OU</Text>
          <TouchableOpacity style={styles.googleButton} onPress={goTogoogle} >
            <Image source={require('@/assets/images/google-icon.png')} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continue com o Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={botaoentrar}>
            <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.registerLink}>Registrar-se</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default BemVindoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    top: -175,
    width: 450,
    height: 450,
    borderRadius: 250,
    backgroundColor: '#00974A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
    marginTop: 180,
  },
  nome: {
    fontSize: 20,
    color: '#fff',
    top: -20,
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 220, // Moved slightly higher
  },
  title: {
    fontSize: 24,
    marginVertical: 70,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#000', // Black bottom border
    borderBottomWidth: 1, // Only bottom border
    marginBottom: 25, // Increased spacing between inputs
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  togglePassword: {
    padding: 10,
    color: '#1d9d00',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1d9d00',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  orText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginVertical: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
  },
  registerLink: {
    color: '#1d9d00',
    fontWeight: 'bold',
  },
});
