import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { bgcols } from "./cols";
import tw from "tailwind-react-native-classnames";

const BandSelector = ({ site, bands, step, setStep, setBands }) => {
  const [chosenBands, setChosenBands] = useState([]);
  const [error, setError] = useState(false);
  let siteBands;

  if (site === "north") {
    siteBands = bands[0].north;
  } else {
    siteBands = bands[1].south;
  }

  if (!siteBands) {
    return <Text>Loading</Text>;
  }

  const chooseBand = (band) => {
    if (chosenBands) {
      //Check if band is already there
      if (chosenBands.filter((e) => e.name === band.name).length > 0) {
        //Need to remove
        const newBandSelection = chosenBands.filter((e) => {
          return e.name !== band.name && e;
        });
        if (newBandSelection.length > 0) {
          setChosenBands(newBandSelection);
        } else {
          setChosenBands([]);
        }
      } else {
        //Add band
        setChosenBands([...chosenBands, band]);
      }
    } else {
      setChosenBands([band]);
    }
  };
  const finishSelection = () => {
    if (chosenBands.length < 1) {
      setError(true);
    } else {
      setError(false);
      setBands(chosenBands);
      setStep(step + 1);
    }
  };

  return (
    <ScrollView>
      <View style={tw`px-4 py-2`}>
        <Text
          style={tw`text-red-600 font-extrabold my-4 text-center capitalize text-lg`}
        >
          Choose which bands you want to see at Slam Dunk {site}
        </Text>
      </View>
      <View style={tw`px-2 py-2 flex flex-row flex-wrap justify-around`}>
        {siteBands.map((band, index) => {
          return (
            <TouchableOpacity
              style={tw`rounded w-1/2 my-2 text-center shadow-xl `}
              key={index}
              onPress={() => chooseBand(band)}
            >
              <View
                style={tw`mr-2 h-40 p-4 flex justify-center items-center flex-col rounded ${
                  chosenBands.filter((e) => e.name === band.name).length > 0
                    ? bgcols[index]
                    : "bg-gray-600"
                }`}
              >
                <Text
                  style={tw`text-white font-extrabold uppercase text-xl mb-1 text-center`}
                >
                  {band.name}
                </Text>
                <Text style={tw`text-white text-lg font-light text-center`}>
                  {band.stage}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && (
        <View>
          <Text
            style={tw`rounded border-4 border-red-600 shadow-xl my-4 p-4 font-extrabold text-red-600 text-center uppercase`}
          >
            Looks like you haven't chosen any bands! Pick some bands...there's
            an awesome line-up
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => finishSelection()}
        style={tw`px-4 py-2 mb-8 rounded bg-red-600 shadow-xl mx-4`}
      >
        <Text
          style={tw`font-extrabold text-white text-center uppercase text-lg`}
        >
          Finished? Click here to create your custom plan
        </Text>
      </TouchableOpacity>
      {/* <View style="bg-black"></View> */}
    </ScrollView>
  );
};
export default BandSelector;
