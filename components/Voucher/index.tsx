import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IVoucher {
  title: string;
  validity: string;
  isExpired: boolean;
}

export default function Voucher({ title, validity, isExpired }: IVoucher) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: '80%',
        height: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        opacity: isExpired ? 0.8 : 1,
      }}
    >
      <Icon
        name="confirmation-number"
        size={48}
        color={isExpired ? '#B0B0B0' : '#000'}
        style={{ marginRight: 16 }}
      />
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: isExpired ? '#B0B0B0' : '#333',
            marginBottom: 8,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ 
            height: 8,
            backgroundColor: '#B0B0B0',
            flex: 1, 
            marginRight: 8, 
            borderRadius: 8,
            opacity: isExpired ? 0.5 : 1,
          }} />
          <View style={{ 
            height: 8,
            backgroundColor: '#B0B0B0',
            flex: 1, 
            borderRadius: 8,
            opacity: isExpired ? 0.5 : 1,
          }} />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: isExpired ? '#B0B0B0' : '#666',
            marginTop: 8,
          }}
        >
          {validity}
        </Text>
      </View>
    </View>
  );
}
