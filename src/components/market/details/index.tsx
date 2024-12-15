import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { MarketInfo } from "@/components/market/info";
import { styles } from "@/components/market/details/styles";
import { Text, View } from "react-native";

export type MarketDetailsProps = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type MarketDetailsComponentProps = {
  data: MarketDetailsProps;
};

export function MarketDetails({ data }: MarketDetailsComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>

      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>

        <MarketInfo
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />

        <MarketInfo
          icon={IconMapPin}
          description={data.address}
        />

        <MarketInfo
          icon={IconPhone}
          description={data.phone}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>

        {
          data.rules.map((item) => (
            <Text
              key={item.id}
              style={styles.rule}
            >
              {`\u2022 ${item.description}`}
            </Text>
          ))
        }
      </View>
    </View>
  );
}