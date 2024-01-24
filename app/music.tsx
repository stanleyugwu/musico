import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Screen from "@/components/Screen";
import Text from "@/components/Text";
import MIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "@expo/vector-icons/Ionicons";
import FAwesome from "@expo/vector-icons/FontAwesome";

import { router, useLocalSearchParams } from "expo-router";
import { Music } from "./index";

// music cover images
import organizeImg from "@/assets/images/cover_full/organize.jpg";
import bandanaImg from "@/assets/images/cover_full/bandana.jpg";
import neighbourhoodImg from "@/assets/images/cover_full/neighbourhood.jpg";

import { Header } from "./_layout";

interface Song extends Music {
  duration: string;
}

export default function MusicScreen() {
  const params = useLocalSearchParams() as any;
  const { width } = useWindowDimensions();
  const MUSIC_WIDTH = width * 0.8;
  const playing = params.music && JSON.parse(params.music);

  const songs: Song[] = [
    playing,
    {
      artist: "Asake",
      coverImg: organizeImg,
      name: "Organise",
      duration: "3:20",
    },
    {
      artist: "Fireboy",
      coverImg: bandanaImg,
      name: "Bandana",
      duration: "5:40",
    },
    {
      artist: "Troye Sivan",
      coverImg: neighbourhoodImg,
      name: "Neighbourhood",
      duration: "2:50",
    },
  ];

  const renderSongs: ListRenderItem<Song> = ({ item }) => (
    <View
      style={{
        width: MUSIC_WIDTH,
        height: "100%",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <Image
        source={item.coverImg}
        style={{ width: MUSIC_WIDTH, height: 300, marginBottom: 20 }}
      />
      <Text font="InterExtraBold" size={22}>
        {item.name}
      </Text>
      <Text font="InterRegular" size={16}>
        {item.artist}
      </Text>
    </View>
  );
  return (
    <Screen style={{ padding: 0 }}>
      <StatusBar style="light" />
      <Header
        onBackPress={() =>
          router.replace({
            pathname: "/",
            params: { music: JSON.stringify(playing) },
          })
        }
        style={{ paddingHorizontal: 20, marginBottom: 60 }}
        headerRight={<MIcon size={40} color={"white"} name="dots-horizontal" />}
      />
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
          snapToInterval={MUSIC_WIDTH}
          pagingEnabled
          data={songs}
          renderItem={renderSongs}
        />
      </View>

      <View
        style={{
          marginTop: 60,
          height: 5,
          backgroundColor: "#aaa9",
          marginHorizontal: 60,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "40%", backgroundColor: "white", height: 5 }} />
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: "white",
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 60,
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text size={16}>1:06</Text>
        <Text size={16}>3:20</Text>
      </View>

      <View
        style={{
          marginHorizontal: 60,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon name="shuffle" size={30} color={"white"} />
        <FAwesome name="step-backward" size={30} color={"white"} />
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 75,
            height: 75,
            backgroundColor: "white",
            borderRadius: 999,
            borderCurve: "circular",
          }}
        >
          <MIcon name="play" color={"black"} size={50} />
        </TouchableOpacity>
        <FAwesome name="step-forward" size={30} color={"white"} />
        <Icon name="sync" size={30} color={"white"} />
      </View>
    </Screen>
  );
}
