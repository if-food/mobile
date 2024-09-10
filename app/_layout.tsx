import '../tamagui-web.css';

import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from './Provider';
import { CartProvider } from 'context/Provider';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="cadastro/index"
              options={{
                headerTitle: 'Cadastro',
                headerShown: true,
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="login/index"
              options={{
                headerTitle: 'Login',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
                headerBackVisible: false,
              }}
            />

            <Stack.Screen
              name="forgotMyPassword/index"
              options={{
                headerShown: true,
                headerTitle: 'Recuperar senha',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="forgotMyPassword/newPassword"
              options={{
                headerShown: true,
                headerTitle: 'Recuperar senha',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="introduction/index"
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen
              name="home/index"
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen
              name="registroPedidos/index"
              options={{
                headerShown: true,
                headerTitle: 'Pedidos',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="pesquisa/index"
              options={{
                headerShown: true,
                headerTitle: 'Pesquisa',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="profile/index"
              options={{
                headerShown: true,
                headerTitle: 'Perfil',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="personalData/index"
              options={{
                headerShown: true,
                headerTitle: 'Perfil',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="voucher/index"
              options={{
                headerShown: true,
                headerTitle: 'Cupons',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="addresses/index"
              options={{
                headerShown: true,
                headerTitle: 'Endereços',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="checkout/index"
              options={{
                headerShown: true,
                headerTitle: 'Eco Bag',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="addresses/address"
              options={{
                headerShown: true,
                headerTitle: 'Novo Endereço',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="restaurantes/[id]"
              options={({ route }) => ({
                headerShown: true,
                headerTitle: (route.params as { nomeFantasia?: string })?.nomeFantasia || 'Carregando...',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              })}
            />

            <Stack.Screen
              name="verifyEmail/allright"
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen
              name="orderRestaurant/[id]"
              options={({ route }) => ({
                headerShown: true,
                headerTitle: (route.params as { productName?: string })?.productName || 'Carregando...',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              })}
            />

            <Stack.Screen
              name="orderReview/index"
              options={{
                headerTitle: 'Review',
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: '#24A645',
                },
                headerTintColor: '#fff',
              }}
            />
          </Stack>
        </ThemeProvider>
      </CartProvider>
    </Provider>
  );
}
