import Text from "@/components/Text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, ViewProps } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CustomFonts = {
  Roboto: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
  InterBlack: require("../assets/fonts/Inter/static/Inter-Black.ttf"),
  InterBold: require("../assets/fonts/Inter/static/Inter-Bold.ttf"),
  InterExtraBold: require("../assets/fonts/Inter/static/Inter-ExtraBold.ttf"),
  InterExtraLight: require("../assets/fonts/Inter/static/Inter-ExtraLight.ttf"),
  InterLight: require("../assets/fonts/Inter/static/Inter-Light.ttf"),
  InterMedium: require("../assets/fonts/Inter/static/Inter-Medium.ttf"),
  InterRegular: require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
  InterSemiBold: require("../assets/fonts/Inter/static/Inter-SemiBold.ttf"),
  InterThin: require("../assets/fonts/Inter/static/Inter-Thin.ttf"),
};

export type FontFamily = keyof typeof CustomFonts;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...CustomFonts,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "#632C46",
    background: "#632C46",
    card: "white",
    text: "white",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

interface HeaderProps extends ViewProps {
  onBackPress?: () => void;
  label?: string;
  headerRight?: React.ReactNode;
}

export const Header = ({
  headerRight,
  style,
  label,
  onBackPress,
  ...otherProps
}: HeaderProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        style,
      ]}
      {...otherProps}
    >
      <FontAwesome
        onPress={onBackPress ? onBackPress : router.back}
        name="angle-left"
        size={40}
        color={"white"}
      />
      {label && (
        <Text font="InterBold" size={20} color="white">
          {label}
        </Text>
      )}
      {headerRight && headerRight}
    </View>
  );
};

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="home" />
    </ThemeProvider>
  );
}
