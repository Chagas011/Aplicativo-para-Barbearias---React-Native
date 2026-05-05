import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { SignInForm } from "../screens/SignInForm";
export default function Login() {
  return (
    <ImageBackground
      source={require("@/assets/images/barbershop.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ alignItems: "center", padding: 30 }}>
          <ThemedText type="subtitle">Faça login para continuar</ThemedText>
        </View>
        <SignInForm />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
