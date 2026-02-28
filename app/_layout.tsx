import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
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
          orientation: 'landscape'
        }}
      />
      <Stack.Screen
        name="CourseSelect"
        options={{
          title: 'Course Select',
          orientation: 'landscape'
        }}
      />
      <Stack.Screen
        name="GameScreen"
        options={{
          title: 'Game',
          orientation: 'landscape'
        }}
      />
      <Stack.Screen
        name="Result"
        options={{
          title: 'Result',
          orientation: 'landscape'
        }}
      />
    </Stack>
  );
}
