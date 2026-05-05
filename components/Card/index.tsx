import { View } from "react-native";
import { styles } from "./styles";

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

type CardHeaderProps = {
  children: React.ReactNode;
};
export function CardHeader({ children }: CardHeaderProps) {
  return <View style={styles.header}>{children}</View>;
}

type CardContentProps = {
  children: React.ReactNode;
};
export function CardContent({ children }: CardContentProps) {
  return <View style={styles.content}>{children}</View>;
}
