import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const SiteSelector = ({ step, setStep, setSite }) => {
  const makeSelection = (site) => {
    setStep(step + 1);
    setSite(site);
  };

  return (
    <ScrollView>
      <View>
        <Text style={tw`text-red-600 font-extrabold my-4 text-center text-lg`}>
          Which Slam Dunk are you attending?
        </Text>
        <TouchableOpacity
          onPress={() => makeSelection("north")}
          style={tw`bg-blue-600 rounded p-4 m-4 mb-6 text-center shadow-xl`}
        >
          <Text
            style={tw`text-white font-extrabold uppercase text-2xl mb-1 text-center`}
          >
            Slam Dunk North
          </Text>
          <Text style={tw`text-white text-xl font-light text-center`}>
            Saturday 4th September 2021
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => makeSelection("south")}
          style={tw`bg-red-600 rounded p-4 m-4 mb-6 text-center shadow-xl`}
        >
          <Text
            style={tw`text-white font-extrabold uppercase text-2xl mb-1 text-center`}
          >
            Slam Dunk South
          </Text>
          <Text style={tw`text-white text-xl font-light text-center`}>
            Sunday 5th September 2021
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SiteSelector;
