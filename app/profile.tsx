import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import Screen from "@/components/Screen";
import Icon from "@expo/vector-icons/Ionicons";
import profilePic from "@/assets/images/profile_pic.png";
import playingTile from "@/assets/images/playing_tile.png";
import MIcon from "@expo/vector-icons/MaterialCommunityIcons";

import { Header } from "./_layout";
import Text from "@/components/Text";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  const params = useLocalSearchParams() as any;
  const curPlaying = params.music && JSON.parse(params.music);

  return (
    <>
      <Screen>
        <StatusBar style="light" />
        <Header
          label="Profile"
          headerRight={
            <Icon
              onPress={() => router.push("/settings")}
              size={30}
              name="settings-outline"
              color={"white"}
            />
          }
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Image
            source={profilePic}
            resizeMode="contain"
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />

          <Text font="InterBold" size={24}>
            Samuel Lawal
          </Text>
          <Text size={16} style={{ opacity: 0.6 }}>
            @Psalmwise Boss
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
            marginBottom: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text font="InterExtraBold">250</Text>
            <Text size={16} style={{ opacity: 0.6 }}>
              Songs
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text font="InterExtraBold">40</Text>
            <Text size={16} style={{ opacity: 0.6 }}>
              Saves
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text font="InterExtraBold">30</Text>
            <Text size={16} style={{ opacity: 0.6 }}>
              Followers
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text font="InterExtraBold">27</Text>
            <Text size={16} style={{ opacity: 0.6 }}>
              Following
            </Text>
          </View>
        </View>

        <Text
          font="InterSemiBold"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "white",
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          Notfications
        </Text>
        <Text
          font="InterSemiBold"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "white",
            paddingBottom: 10,

            paddingTop: 20,
          }}
        >
          Connected Services
        </Text>
        <Text
          font="InterSemiBold"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "white",
            paddingBottom: 10,

            paddingTop: 20,
          }}
        >
          About
        </Text>
        <Text
          font="InterSemiBold"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "white",
            paddingBottom: 10,

            paddingTop: 20,
          }}
        >
          Logout
        </Text>
      </Screen>
      {curPlaying && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/music",
              params: { music: JSON.stringify(curPlaying) },
            })
          }
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#aaac",
              height: 5,
            }}
          >
            <View
              style={{ backgroundColor: "#FF00F5", height: 5, width: "70%" }}
            />
          </View>
          <ImageBackground
            source={playingTile}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Meta Data */}
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 0.72 }}
            >
              <Image source={curPlaying.coverImg} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  font="InterBold"
                  textBreakStrategy="balanced"
                  lineBreakMode="clip"
                >
                  {curPlaying.name}
                </Text>
                <Text font="InterRegular" size={16}>
                  {curPlaying.artist}
                </Text>
              </View>
            </View>

            {/* Control */}
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 0.28 }}
            >
              <FontAwesome color={"white"} name="step-backward" size={40} />
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/music",
                    params: { music: JSON.stringify(curPlaying) },
                  })
                }
                activeOpacity={0.6}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 75,
                  height: 75,
                  backgroundColor: "white",
                  borderRadius: 999,
                  borderCurve: "circular",
                  marginHorizontal: 15,
                }}
              >
                <MIcon name="play" color={"black"} size={50} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </>
  );
}
