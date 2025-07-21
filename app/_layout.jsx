import { useEffect, useState, useRef } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av";

SplashScreen.preventAutoHideAsync();

const musicTracks = [
  require("../assets/music/jazz-1.mp3"),
  require("../assets/music/jazz-2.mp3"),
  require("../assets/music/jazz-3.mp3"),
  require("../assets/music/jazz-4.mp3"),
];

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  const soundRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const playRandomTrack = async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const randomIndex = Math.floor(Math.random() * musicTracks.length);

      if (!isMounted) return;

      const { sound } = await Audio.Sound.createAsync(
        musicTracks[randomIndex],
        { shouldPlay: true, isLooping: false }
      );

      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish && !status.isLooping) {
          if (isMounted) {
            playRandomTrack();
          }
        }
      });

      await sound.playAsync();
    };

    playRandomTrack();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  return <Slot />;
}
