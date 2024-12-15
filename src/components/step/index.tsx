import { colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { styles } from "@/components/step/styles";
import { Text, View } from "react-native";

interface StepProps {
	title: string;
	description: string;
	icon: React.ComponentType<IconProps>;
};

export function Step({ icon: Icon, title, description }: StepProps) {
	return (
		<View style={styles.container}>
			{Icon && <Icon size={32} color={colors.red.base} />}
			
			<View style={styles.details}>
				<Text style={styles.title}>{title}</Text>
				
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	);
}