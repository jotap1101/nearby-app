import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { colors } from "@/styles/theme";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { styles } from "@/components/button/styles";

type ButtonProps = TouchableOpacityProps & {
	isLoading?: boolean;
};

type IconProps = TablerIconProps & {
	icon: React.ComponentType<TablerIconProps>;
};

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={isLoading}
			{...rest}
			style={[styles.container, style]}
		>
			{isLoading ? <ActivityIndicator size="small" color={colors.gray[100]} /> : children}
		</TouchableOpacity>
	);
}

function Title({ children }: TextProps) {
	return (
		<Text style={styles.title}>{children}</Text>
	);
}

function Icon({ icon: Icon }: IconProps) {
	return (
		<Icon
			size={24}
			color={colors.gray[100]}
		/>
	);
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };