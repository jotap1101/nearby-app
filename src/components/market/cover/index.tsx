import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { styles } from "@/components/market/cover/styles";

type MarketCoverProps = {
  uri: string;
};

export function MarketCover({ uri }: MarketCoverProps) {
  return (
    <ImageBackground
      source={{ uri }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Button
          style={{ width: 40, height: 40 }}
          onPress={() => router.back()}
        >
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}