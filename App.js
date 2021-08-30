import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import logo from "./assets/logo.png";
import SiteSelector from "./SiteSelector";
import BandSelector from "./BandSelector";
import DayPlan from "./DayPlan";
import Footer from "./Footer";

const App = () => {
  const [step, setStep] = useState(0);
  const [site, setSite] = useState();
  const [bands, setBands] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBandsList = () => {
      const headers = new Headers();
      headers.append("pragma", "no-cache");
      headers.append("cache-control", "no-cache");

      fetch("https://marktiddy.co.uk/hosting/bandsList.json", { headers })
        .then((res) => res.json())
        .then((res) => {
          setBands(res);
          setLoading(false);
        })
        .catch((e) => console.log(e));

      //setBands(JSON.parse(data));
    };

    const loadLocalBands = async () => {
      const localStoredBands = await SecureStore.getItemAsync("slamDunkBands");
      const localSite = await SecureStore.getItemAsync("slamDunkSite");

      if (localStoredBands) {
        if (localSite) {
          setSite(localSite);
          setLoading(false);
        }
        setBands(JSON.parse(localStoredBands));
        setStep(2);
      } else {
        loadBandsList();
      }
    };

    loadLocalBands();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={tw`h-full flex justify-center items-center`}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={tw`mt-4`}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={tw`h-full flex p-4 text-center w-full border-2 border-black`}
    >
      <Image source={logo} style={tw`h-24 w-3/4 mx-auto`} />
      {step == 0 && (
        <View style={tw`p-4 bg-blue-600 m-4 rounded shadow-xl`}>
          <Text style={tw`text-white font-extrabold text-center text-base`}>
            Welcome to the unofficial Slam Dunk Day planner for 2021. This app
            let's you create your perfect Slam Dunk day!
          </Text>
        </View>
      )}
      {step == 0 && (
        <SiteSelector step={step} setStep={setStep} setSite={setSite} />
      )}
      {step == 1 && (
        <BandSelector
          step={step}
          setStep={setStep}
          site={site}
          bands={bands}
          setBands={setBands}
        />
      )}
      {step === 2 && (
        <DayPlan
          bands={bands}
          site={site}
          setStep={setStep}
          setBands={setBands}
          setSite={setSite}
          setLoading={setLoading}
        />
      )}
      <StatusBar style="dark" />
      <Footer />
    </SafeAreaView>
  );
};

export default App;
