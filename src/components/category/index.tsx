import { categoriesIcons } from "@/utils/categories-icons";
import { colors } from "@/styles/theme";
import { styles } from "@/components/category/styles";
import { Text, Pressable, PressableProps } from "react-native";

type CategoryProps = PressableProps & {
  iconId: string;
  name: string;
  isSelected?: boolean;
};

export function Category({ iconId, name, isSelected = false, ...rest }: CategoryProps) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Icon
        size={16}
        color={colors.gray[isSelected ? 100 : 400]}
      />

      <Text style={[styles.name, isSelected && styles.nameSelected]}>{name}</Text>
    </Pressable>
  );
}
