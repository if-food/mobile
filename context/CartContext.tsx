import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  updateQuantity: (productName: string, quantity: number) => void;
  removeItem: (productName: string) => void;
  applyCoupon: (couponCode: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('cartItems');
        if (storedItems) {
          setCartItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load cart items from AsyncStorage', error);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart items to AsyncStorage', error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  const updateQuantity = (productName: string, quantity: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.productName === productName);

      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        if (quantity <= 1) {
          updatedItems.splice(itemIndex, 1);
        } else {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: quantity,
          };
        }
        return updatedItems;
      } else {
        return [...prevItems, {
          productName,
          productImage: '', 
          productPrice: 0, 
          quantity: 1,
        }];
      }
    });
  };

  const removeItem = (productName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productName !== productName));
  };

  const applyCoupon = (couponCode: string): number => {
    let discountAmount = 0;
    if (couponCode === 'PROMO10') {
      discountAmount = 10; 
    } else {
      discountAmount = 0;
    }
    setDiscount(discountAmount);
    return discountAmount;
  };

  return (
    <CartContext.Provider value={{ cartItems, updateQuantity, removeItem, applyCoupon }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
