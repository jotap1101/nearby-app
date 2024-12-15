import { colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styles } from "@/components/market/info/styles";

type MarketInfoProps = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function MarketInfo({ icon: Icon, description }: MarketInfoProps) {
  return (
    <View style={styles.container}>
      <Icon
        size={16}
        color={colors.gray[400]}
      />

      <Text style={styles.text}>{description}</Text>
    </View>
  );
}