import Feather from "@expo/vector-icons/Feather";
import { TextInput, TextInputProps, View } from "react-native";

import { inputStyles } from "./styles";

type BaseTextInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  "readOnly"
>;
export interface IInputProps extends BaseTextInputProps {
  InputCommand?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
  formatter?: (value: string) => string;
}
export default function Search({
  style,

  InputCommand = TextInput,
  onChangeText,
  formatter,
  ...props
}: IInputProps) {
  function handleChangeText(value: string) {
    const formattedValue = formatter?.(value) ?? value;
    onChangeText?.(formattedValue);
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Feather name="search" size={24} color="hsl(210 100% 15%)" />
      <TextInput
        style={inputStyles.input}
        onChangeText={handleChangeText}
        {...props}
      />
    </View>
  );
}
