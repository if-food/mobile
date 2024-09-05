import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina a interface para o item do carrinho
interface CartItem {
  productName: string;
  quantity: number;
}

// Defina a interface para o contexto do carrinho
interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
}

// Crie o contexto do carrinho com um valor padrão de undefined
export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para salvar o carrinho no AsyncStorage
  const saveCartToAsyncStorage = async (cart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  // Função para carregar o carrinho do AsyncStorage
  const loadCartFromAsyncStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        return JSON.parse(cartData) as CartItem[];
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
      return [];
    }
  };

  // Carrega o carrinho quando o componente for montado
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await loadCartFromAsyncStorage();
      setCart(savedCart);
    };

    loadCart();
  }, []);

  // Função para atualizar o carrinho e o AsyncStorage
  const saveCart = async (newCart: CartItem[]) => {
    setCart(newCart);
    await saveCartToAsyncStorage(newCart);
  };

  // Função para adicionar um item ao carrinho
  const addItem = (item: CartItem) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((i) => i.productName === item.productName);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      updatedCart.push(item);
    }

    saveCart(updatedCart);
  };

  // Função para remover um item do carrinho
  const removeItem = (productName: string) => {
    const updatedCart = cart.filter((item) => item.productName !== productName);
    saveCart(updatedCart);
  };

  // Função para atualizar a quantidade de um item no carrinho
  const updateQuantity = (productName: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.productName === productName ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
