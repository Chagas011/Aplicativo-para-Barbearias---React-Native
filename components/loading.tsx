import { MotiView } from "moti";
import { Text, View } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

export default function LoadingPulse() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* BARBER POLE */}
      <MotiView
        from={{
          rotate: "0deg",
          opacity: 0.5,
          scale: 0.9,
        }}
        animate={{
          rotate: "360deg",
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "timing",
          duration: 2500,
          loop: true,
        }}
        style={{
          width: 80,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg width={80} height={80} viewBox="0 0 80 80">
          {/* topo */}
          <Circle cx="40" cy="10" r="8" fill="#d9d9d9" />

          {/* base */}
          <Circle cx="40" cy="70" r="8" fill="#d9d9d9" />

          {/* corpo */}
          <Rect x="25" y="15" width="30" height="50" rx="15" fill="#ffffff" />

          {/* listras */}
          <Rect
            x="20"
            y="18"
            width="3"
            height="40"
            fill="#ff2d55"
            transform="rotate(45 40 40)"
          />

          <Rect
            x="35"
            y="18"
            width="3"
            height="40"
            fill="#3b82f6"
            transform="rotate(45 40 40)"
          />

          <Rect
            x="50"
            y="18"
            width="3"
            height="40"
            fill="#ff2d55"
            transform="rotate(45 40 40)"
          />
        </Svg>
      </MotiView>

      {/* TEXTO */}
      <MotiView
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "timing",
          duration: 800,
          loop: true,
        }}
      >
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Carregando...
          </Text>
        </View>
      </MotiView>
    </View>
  );
}
