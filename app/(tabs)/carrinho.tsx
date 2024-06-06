import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Importe todas as imagens necessárias
import bananaImage from '@/assets/images/banana-nanica.png';
import spriteImage from '@/assets/images/sprite.png';
import cafeImage from '@/assets/images/cafe.png';
import acucarImage from '@/assets/images/acucar-cristal 1.png';
import salgadinhoImage from '@/assets/images/arroz.png';
import arrozImage from '@/assets/images/torcida.png';
import queijoImage from '@/assets/images/queijo.png';
import paoImage from '@/assets/images/pao.png';
import leiteImage from '@/assets/images/bobesponja-suco.png';
import contraFileImage from '@/assets/images/carne-500g.png';

interface Product {
  id: number;
  name: string;
  price: number;
  image: any; // Adicione uma propriedade para a imagem
}

interface CartItem {
  product: Product;
  quantity: number;
}

const ShoppingCartApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products] = useState<Product[]>([
    { id: 1, name: 'Banana Nanica 5 Unidades', price: 5.99, image: bananaImage },
    { id: 2, name: 'Sprite 350ml 1 Unidade', price: 3.99, image: spriteImage },
    { id: 3, name: 'Café Pilão torrado', price: 18.89, image: cafeImage },
    { id: 4, name: 'Açúcar Cristal Orgânico 1Kg', price: 6.49, image: acucarImage },
    { id: 5, name: 'Salgadinho Churrasco Torcida 100g', price: 1.99, image: salgadinhoImage },
    { id: 6, name: 'Arroz Camil tipo 1 1Kg', price: 18.89, image: arrozImage },
    { id: 7, name: 'Queijo Vigor Parmesao Fatia 200G', price: 29.90, image: queijoImage },
    { id: 8, name: 'Pão Do Forno Wickbold Aus. 500G', price: 18.89, image: paoImage },
    { id: 9, name: 'Leite Fermentado Elegê 160G', price: 1.99, image: leiteImage },
    { id: 10, name: 'Contra Filé Bovino 500G', price: 11.95, image: contraFileImage },
  ]);
  const [cartVisible, setCartVisible] = useState<boolean>(true);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('compras');
  };

  const handleToggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const handleFinalizePurchase = () => {
    navigation.navigate('check-in');
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart
        .map(item => item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
        )
        .filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.product.id === product.id);
      if (productInCart) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };
  
  const handleClearCart = () => {
    setCart([]);
  };

  

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo-davo.png')}
          style={styles.logo}
        />
        <View style={styles.cartInfo}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <Text style={styles.cartText}>Seu Carrinho de Compras</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Pesquise o produto"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <ScrollView>
        {searchTerm !== '' && (
          <>
            <Text style={styles.sectionHeader}>Produtos</Text>
            {products
              .filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(product => (
                <View key={product.id} style={styles.productContainer}>
                  <Image
                    source={product.image}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(product)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </>
        )}
      </ScrollView>

      {cartVisible && (
        <View>
          <ScrollView>
            {cart.map(item => (
              <View key={item.product.id} style={styles.cartItem}>
                <View style={styles.cartItemDetails}>
                  <Text>{item.product.name}</Text>
                  <Text style={styles.itemPrice}>
                    Preço: R${(item.product.price * item.quantity).toFixed(2)} ({item.quantity})
                  </Text>
                </View>
                <View style={styles.cartItemButtons}>
                  <TouchableOpacity onPress={() => handleRemoveFromCart(item.product.id)}>
                    <Text style={styles.menos}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleAddToCart(item.product)}>
                    <Text style={styles.cartButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.toggleButton} onPress={handleToggleCartVisibility}>
            <Text style={styles.ocultar}>
              {cartVisible ? 'Ocultar Carrinho' : 'Ver Carrinho'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finalizar} onPress={handleFinalizePurchase}>
            <Text style={styles.buttonText}>Check in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.buttonText}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {calculateTotalPrice()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
    top:30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    top:10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    marginLeft: 5,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingHorizontal: 20,
    margin: 10,
    top:10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    top:0,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
    top:6,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#1d9d00',
    borderRadius: 5,
    height: 25,
    padding: 8,
    width: 25,
    paddingTop: 1,
    marginVertical: 0,
    marginHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cartItemDetails: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  cartItemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    color: '#fff',
    backgroundColor: '#1d9d00',
    borderRadius: 5,
    height: 25,
    padding: 9,
    width: 25,
    paddingTop: 2,
    marginHorizontal: 10,
    marginVertical: 0,
    fontWeight: 'bold',
  },
  menos: {
    color: '#fff',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    height: 25,
    padding: 10,
    width: 25,
    paddingTop: 2,
    marginHorizontal: 10,
    marginVertical: 0,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  footerButtons: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  toggleButton: {
    color: '#fff',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 12,
    height: 40,
    width: 150,
    top: 10,
    left:15,
  },
  ocultar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  finalizar: {
    color: '#fff',
    backgroundColor: '#1d9d00',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 12,
    height: 40,
    width: 150,
    top: 10,
    left:15,
  },
  clearButton: {
    color: '#fff',
    backgroundColor: '#ff0000',
    alignItems: 'center',
    padding: 10,
    position:'absolute',
    margin: 5,
    borderRadius: 12,
    height: 40,
    width: 150,
    top: 10,
    left:205,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    alignItems: 'flex-end',
    marginRight: 45,
    top: 33,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingCartApp;