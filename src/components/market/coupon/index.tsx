import { colors } from "@/styles/theme";
import { IconTicket } from "@tabler/icons-react-native";
import { styles } from "@/components/market/coupon/styles";
import { Text, View } from "react-native";

type MarketCouponProps = {
  code: string;
};

export function MarketCoupon({ code }: MarketCouponProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilize esse cupom</Text>

      <View style={styles.content}>
        <IconTicket
          size={24}
          color={colors.green.light}
        />

        <Text style={styles.code}>{code}</Text>
      </View>
    </View>
  );
}