import moment from "moment";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { stagecols } from "./cols";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";

const DayPlan = ({ bands, setBands, setSite, site, setStep, setLoading }) => {
  const minutesOfDate = (time) => {
    const splitTime = time.split(":");
    const minutes = parseInt(splitTime[0] * 60) + parseInt(splitTime[1]);
    return minutes;
  };

  const sortedBands = bands.sort(
    (a, b) => minutesOfDate(a.start) - minutesOfDate(b.start)
  );

  useEffect(() => {
    const saveChoices = (async) => {
      SecureStore.setItemAsync("slamDunkBands", JSON.stringify(sortedBands));
      SecureStore.setItemAsync("slamDunkSite", site);
    };
    saveChoices();
  }, [sortedBands, site]);

  const createAlert = () => {
    Alert.alert("Are you sure?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      {
        text: "Start Over",
        onPress: () => reset(),
        style: "destructive",
      },
    ]);
  };

  const reset = async () => {
    setLoading(true);
    SecureStore.deleteItemAsync("slamDunkBands");
    SecureStore.deleteItemAsync("slamDunkSite");

    fetch("https://marktiddy.co.uk/hosting/bandsList.json")
      .then((res) => res.json())
      .then((res) => {
        setBands(res);
        setSite();
        setStep(0);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView style={tw`px-4 text-center`}>
      <Text
        style={tw`text-red-600 font-extrabold my-2 text-center capitalize text-lg`}
      >
        Here's your day plan for Slam Dunk {site}
      </Text>
      <Text style={tw`text-base text-center mb-6`}>
        Your personal plan is saved to your phone so you can just reload the app
        to view it.
      </Text>

      <TouchableOpacity
        onPress={() => createAlert()}
        style={tw`bg-yellow-400 rounded m-auto py-2 px-2 text-center`}
      >
        <Text style={tw`text-black text-center text-sm font-extrabold `}>
          Want to pick again? Click here to start over
        </Text>
      </TouchableOpacity>
      <View style={tw`p-1 mt-4`}>
        {sortedBands.map((b, i) => {
          return (
            <View
              style={tw`${
                stagecols.background[b.stage]
              } rounded my-2 shadow-xl`}
              key={i}
            >
              <Text
                style={tw`${
                  stagecols.text[b.stage]
                } font-extrabold uppercase text-xl mb-1 px-2 pt-2 text-center`}
              >
                {b.name}
              </Text>
              <Text
                style={tw`${
                  stagecols.text[b.stage]
                } text-lg font-light px-2 text-center mb-1`}
              >
                {b.stage}
              </Text>
              <Text
                style={tw`${
                  stagecols.text[b.stage]
                } font-extrabold uppercase text-sm mb-1 px-2 pb-1 text-center`}
              >
                Starts: {b.start} (
                {moment("08/04/2021 " + b.start).format("h:mm a")})
              </Text>
              <Text
                style={tw`${
                  stagecols.text[b.stage]
                } font-extrabold uppercase text-sm mb-1 px-2 pb-1 text-center`}
              >
                Ends: {b.end} ({moment("08/04/2021 " + b.end).format("h:mm a")})
              </Text>
              {i < bands.length - 1 &&
                minutesOfDate(b.end) > minutesOfDate(bands[i + 1].start) && (
                  <View style={tw`bg-yellow-400 text-black p-2`}>
                    <Text style={tw`text-sm font-extrabold text-center`}>
                      CLASH ALERT
                    </Text>
                    <Text style={tw`text-sm font-extrabold text-center`}>
                      The end of this set is after your next band starts
                    </Text>
                  </View>
                )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default DayPlan;
