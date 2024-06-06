import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const menuItems = [
  { icon: 'cart-outline', title: 'Retire na loja', screen: 'localizacao' },
  { icon: 'location-outline', title: 'Peça entrega', screen: 'localizacao' },
  { icon: 'card-outline', title: 'Forma de Pagamento', screen: 'cartao' },
  { icon: 'pricetags-outline', title: 'Cupons Davó', screen: 'check-in' },
];

export default function UserAccountScreen() {
  const navigation = useNavigation();

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleGoBack = () => {
    navigation.navigate('carrinho');
  };

  const handleSave = () => {
    navigation.navigate('compras');
    alert('Calma La amigão, o app ainda não é oficial 😁 ')
  };

  const totalPrice = 120.00; // Example total price

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <BlurView intensity={100} style={styles.blurContainer}>
        <Image
          source={require('@/assets/images/check.jpeg')}
          style={styles.image}
        />
      </BlurView>
      <View style={styles.menuContainer}>
        <Text style={styles.title}>Check in</Text>
        <View style={styles.separatorLarge} />
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleMenuPress(item.screen)}>
            <View style={styles.itemContainer}>
              <Ionicons name={item.icon} size={24} style={styles.icon} />
              <Text style={styles.itemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} style={styles.chevronIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSave} >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceText}>R$ {totalPrice.toFixed(2)}</Text>
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
  backButton: {
    position: 'absolute',
    top: 41,
    left: 20,
    zIndex: 4,
  },
  blurContainer: {
    width: '100%',
    height: '40%',
  },
  image: {
    width: '100%',
    height: '100%',
    top:20,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    top: 55,
    left: 25,
  },
  separatorLarge: {
    height: 1,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 5,
    marginVertical: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    color: '#000',
    marginRight: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 15,
  },
});
