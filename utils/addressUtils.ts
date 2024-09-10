import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadSavedAddress = async (setSavedAddress: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const storedData = await AsyncStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      const clienteId = userData.id;
      const savedAddressString = await AsyncStorage.getItem(
        `favoriteAddress_${clienteId}`
      );
      if (savedAddressString) {
        const savedAddress = JSON.parse(savedAddressString);
        if (typeof savedAddress === 'object' && savedAddress !== null && 'rua' in savedAddress) {
          setSavedAddress(savedAddress.rua);
        } else {
          setSavedAddress(null);
        }
      } else {
        setSavedAddress(null);
      }
    } else {
      setSavedAddress(null);
    }
  } catch (error) {
    console.error("Erro ao carregar o endereço:", error);
    setSavedAddress(null);
  }
};

export const abbreviateAddress = (address: string | null): string => {
    if (!address) return '';
  
    return address.length > 25 ? `${address.substring(0, 25)}...` : address;
  };
