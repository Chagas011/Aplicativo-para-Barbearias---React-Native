import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { MyDarkTheme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/auth";

export default function RootLayout() {
  const { signedIn, role } = useAuthStore();
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme === "dark" ? MyDarkTheme : DefaultTheme}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!signedIn}>
            <Stack.Screen name="(public)" />
          </Stack.Protected>

          <Stack.Protected guard={signedIn}>
            <Stack.Protected guard={role === "client"}>
              <Stack.Screen name="(client)" />
            </Stack.Protected>

            <Stack.Protected guard={role === "admin"}>
              <Stack.Screen name="(admin)" />
            </Stack.Protected>
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
