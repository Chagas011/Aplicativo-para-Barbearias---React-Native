import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E6E6F0",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  services: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#1A1A26",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  tagText: {
    color: "#00FFC6",
    fontSize: 12,
  },

  button: {
    backgroundColor: "hsl(210 100% 15%)",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
