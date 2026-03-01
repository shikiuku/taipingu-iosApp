import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

// スプラッシュ画面を自動的に隠さないように設定
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'TamanegiKaisho': require('../assets/fonts/tamanegi-kaisho.ttf'),
    'KleeOneSemiBold': require('../assets/fonts/KleeOne-SemiBold.ttf'),
  });

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          interruptionModeIOS: (Audio as any).INTERRUPTION_MODE_IOS_DO_NOT_MIX || 1,
          interruptionModeAndroid: (Audio as any).INTERRUPTION_MODE_ANDROID_DO_NOT_MIX || 1,
        });
      } catch (e) {
        console.warn('Audio setup error', e);
      }
    };
    setupAudio();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Title',
            orientation: 'landscape',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="CourseSelect"
          options={{
            title: 'Course Select',
            orientation: 'landscape',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="GameScreen"
          options={{
            title: 'Game',
            orientation: 'landscape',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="Result"
          options={{
            title: 'Result',
            orientation: 'landscape',
            animation: 'slide_from_bottom'
          }}
        />
      </Stack>
    </>
  );
}
