import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Linking from "expo-linking";

const Footer = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={tw`w-full bg-yellow-400 p-4 text-center absolute bottom-0`}>
      <Text style={tw`text-black font-extrabold text-base text-center`}>
        Found this helpful?
      </Text>
      <Text style={tw`text-xs text-center`}>
        This app was made as a hobby project. If you'd like to do one of the
        following I'd be super grateful
      </Text>
      <View style={tw`flex flex-row justify-around items-center mt-2 pb-8`}>
        <TouchableOpacity
          style={tw`rounded bg-black text-yellow-400 w-5/12 p-2 font-extrabold uppercase text-sm`}
          onPress={() => handlePress("https://www.buymeacoffee.com/marktiddy")}
        >
          <Text style={tw`text-white font-extrabold text-center capitalize`}>
            Buy me a Beer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handlePress("https://open.spotify.com/album/264XBsnQOBv1DXA75CXIQE")
          }
          style={tw`rounded w-6/12 bg-black text-yellow-400 p-2 font-extrabold uppercase text-sm`}
        >
          <Text style={tw`text-white font-extrabold text-center capitalize`}>
            {" "}
            Listen to my band
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
