import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Screen from "@/components/Screen";
import Icon from "@expo/vector-icons/Ionicons";

import { Header } from "./_layout";
import Text from "@/components/Text";

interface SettingProps {
  label: string;
  toggleOn?: boolean;
  right?: "toggle" | "text";
  subLabel?: string;
  rightText?: string;
}
const Setting = ({
  label,
  right = "toggle",
  subLabel,
  rightText,
  toggleOn = false,
}: SettingProps) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text font="InterSemiBold" size={20}>
          {label}
        </Text>
        {right === "text" ? (
          <Text font="InterRegular" style={{ opacity: 0.6 }}>
            {rightText}
          </Text>
        ) : (
          <View
            style={{
              backgroundColor: "#BD1E74",
              borderRadius: 999,
              flexDirection: toggleOn ? "row-reverse" : "row",
            }}
          >
            <Text size={12} style={{ padding: 5 }}>
              {toggleOn ? "On" : "Off"}
            </Text>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: "white",
                borderRadius: 999,
                alignSelf: "center",
              }}
            />
          </View>
        )}
      </View>
      {subLabel && (
        <Text size={16} style={{ opacity: 0.6, marginTop: 10 }}>
          {subLabel}
        </Text>
      )}
    </>
  );
};

export default function Settings() {
  return (
    <Screen>
      <StatusBar style="light" />
      <Header
        label="Settings"
        headerRight={<Icon size={30} name="settings-outline" color={"white"} />}
      />
      <Setting label="Dark Mode" />
      <Setting label="Equalizer" right="text" rightText="Default" />
      <Setting label="Show long tracks" />
      <Setting label="Smart Volume" subLabel="Equal volume for all tracks" />
      <Setting label="Stop music when phone locks" toggleOn />
      <Setting
        label="Stop music when phone locks"
        subLabel="Display at the navigation bar"
      />
    </Screen>
  );
}
