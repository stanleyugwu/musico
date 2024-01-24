import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "@/components/Screen";
import Text from "@/components/Text";
import { useState } from "react";
import MIcon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import playingTile from "@/assets/images/playing_tile.png";
import profilePic from "@/assets/images/profile_pic.png";
import yogaPic from "@/assets/images/yoga.png";
import cardProfilePic from "@/assets/images/card_profile_pic.png";

// music cover images
import organizeImg from "@/assets/images/music_covers/organize.png";
import bandanaImg from "@/assets/images/music_covers/bandana.png";
import neighbourhoodImg from "@/assets/images/music_covers/neighbourhood.png";
import { router } from "expo-router";

interface Category {
  label: string;
  id: string;
}

export interface Music {
  name: string;
  artist: string;
  coverImg: number;
}

const categories: Category[] = [
  { label: "Yoga", id: "1" },
  { label: "Fitness", id: "2" },
  { label: "Education", id: "3" },
  { label: "Design", id: "4" },
];

const recentlyPlayedMusics: Music[] = [
  { artist: "Asake", coverImg: organizeImg, name: "Organise" },
  { artist: "Fireboy", coverImg: bandanaImg, name: "Bandana" },
  {
    artist: "Troye Sivan",
    coverImg: neighbourhoodImg,
    name: "Neighbourhood",
  },
];

export default function HomeScreen() {
  const [activeCatId, setActiveCatId] = useState("1");
  const [curPlaying, setCurPlaying] = useState<Music>({
    artist: "Asake",
    coverImg: organizeImg,
    name: "Organise",
  });

  const renderCategories: ListRenderItem<Category> = ({ item }) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setActiveCatId(item.id)}
        style={{
          backgroundColor: activeCatId === item.id ? "#BD1E74" : "transparent",
          borderRadius: 40,
          padding: 8,
          marginRight: 20,
        }}
      >
        <Text font="Roboto" size={20}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Screen style={{ paddingBottom: 0 }}>
        <StatusBar style="light" />
        {/* Profile Section */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/profile",
              params: { music: JSON.stringify(curPlaying) },
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text size={22}>Hi Samuel,</Text>
            <Text font="InterExtraBold" size={30}>
              Explore Musico
            </Text>
          </View>
          <Image
            source={profilePic}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>

        {/* Categories */}
        <View style={{ marginTop: 40, marginBottom: 5, marginHorizontal: -5 }}>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategories}
          />
        </View>
        <ScrollView
          nestedScrollEnabled
          style={{
            paddingHorizontal: 15,
            paddingTop: 30,
          }}
        >
          {/* Card */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#C8C0F4",
              borderRadius: 30,
              borderCurve: "continuous",
              padding: 15,
              width: "100%",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flex: 0.6,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text color="#632C46" size={26} font="InterSemiBold">
                  Make your day productive
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image source={cardProfilePic} style={{ marginRight: 4 }} />
                <Text color="#632C46" font="InterSemiBold">
                  Psalmwise
                </Text>
              </View>
            </View>
            <Image
              source={yogaPic}
              style={{
                flex: 0.5,
                width: 160,
                height: 160,
              }}
            />
          </View>

          {/* Recently Played */}
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text font="InterBlack">Recently Played</Text>
              <Text font="InterMedium" size={16}>
                view all
              </Text>
            </View>
            <View style={{ paddingBottom: 30 }}>
              {/* Music Cards */}
              {recentlyPlayedMusics.map((music) => (
                <TouchableOpacity
                  key={music.name}
                  onPress={() => setCurPlaying(music)}
                  activeOpacity={0.6}
                  style={{
                    marginVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={music.coverImg} />
                    <View style={{ marginLeft: 20 }}>
                      <Text font="InterBold">{music.name}</Text>
                      <Text font="InterRegular" size={16}>
                        {music.artist}
                      </Text>
                    </View>
                  </View>
                  <MIcon name="dots-vertical" color={"white"} size={28} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </Screen>
      {/* Currently Playing */}
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
