import { Alert, Clipboard, Modal, ScrollView, StatusBar, View } from "react-native";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MarketCoupon } from "@/components/market/coupon";
import { MarketCover } from "@/components/market/cover";
import { MarketDetails, MarketDetailsProps } from "@/components/market/details";
import { Loading } from "@/components/loading";
import { Redirect, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";

type DataProps = MarketDetailsProps & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [_, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);

      // console.log(data);

      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      Alert.alert("Local", "Não foi possível carregar o local.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Câmera", "Você precisa permitir o acesso à câmera.");
      }

      qrLock.current = false;

      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      
      Alert.alert("Câmera", "Não foi possível abrir a câmera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch(`/coupons/${id}`);

      setCoupon(data.coupon);

      Alert.alert("Cupom", data.coupon);
    } catch (error) {
      console.error(error);

      Alert.alert("Cupom", "Não foi possível utilizar o cupom.");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert("Cupom", "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [
      { style: "cancel", text: "Cancelar" },
      { text: "Resgatar", onPress: () => getCoupon(id) }
    ]);
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        hidden={isVisibleCameraModal}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <MarketCover uri={data.cover} />

        <MarketDetails data={data} />

        {coupon && <MarketCoupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal
        style={{ flex: 1 }}
        visible={isVisibleCameraModal}
      >
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;

              // console.log("QR Code data:", data);

              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}