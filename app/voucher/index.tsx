import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { View, Text } from "react-native";
import ButtonCustom from "components/ButtonCustom";
import CustomInput from "components/customInput";
import Footer from "components/Footer";
import Voucher from "components/Voucher";
import voucherSchema from "schemas/Voucher";

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([
    { title: "Desconto de 15%", validity: "Válido até 31/08/2024", isExpired: false },
    { title: "Frete grátis", validity: "Válido até 30/07/2024", isExpired: true },
  ]);

  const validVouchers = {
    'DESCONTO15': { title: "Desconto de 15%", validity: "Válido até 31/08/2024" },
    'DESCONTO10': { title: "Desconto de 10%", validity: "Válido até 31/12/2024" },
    'FRETEGRATIS': { title: "Frete grátis", validity: "Válido até 30/07/2024" },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(voucherSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    if (!data.voucherCode) {
      setError('voucherCode', {
        type: 'manual',
        message: 'Por favor, insira um código de cupom.',
      });
      return;
    }

    const voucher = validVouchers[data.voucherCode];
    if (!voucher) {
      setError('voucherCode', {
        type: 'manual',
        message: 'Cupom inválido',
      });
      return;
    }

    if (vouchers.some(v => v.title === voucher.title)) {
      setError('voucherCode', {
        type: 'manual',
        message: 'Cupom já foi utilizado.',
      });
      return;
    }

    setVouchers(prevVouchers => [voucher, ...prevVouchers]);
  };

  return (
    <View className="flex-1 items-center bg-[#2c2d33] pt-6 justify-between">
      <View>
        <Controller
          control={control}
          name="voucherCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <CustomInput
                titleInput="Salvar novo cupom"
                placeholder="Insira o código do cupom"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {errors.voucherCode && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {errors.voucherCode.message}
                </Text>
              )}
            </>
          )}
        />
        <ButtonCustom
          texto="Inserir cupom"
          style={{ marginTop: 24 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={{ marginBottom: 60 }}>
        {vouchers.map((voucher, index) => (
          <Voucher
            key={index}
            title={voucher.title}
            validity={voucher.validity}
            isExpired={voucher.isExpired}
          />
        ))}
      </View>
      <Footer />
    </View>
  );
}
