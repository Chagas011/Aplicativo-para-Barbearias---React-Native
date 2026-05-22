import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

interface ICardTime {
  time: string;
  selected: boolean;
}

export default function CardTime({ time, selected }: ICardTime) {
  return (
    <View
      style={{
        backgroundColor: selected ? "#00d5ff30" : "#423d3da2",
        borderWidth: selected ? 2 : 0,
        borderColor: "#00d5ff",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: 60,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText>{time}</ThemedText>
      </View>
    </View>
  );
}
