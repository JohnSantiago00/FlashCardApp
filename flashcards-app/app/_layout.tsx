import MyCardsScreen from "@/screens/MyCardsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FlashcardProvider } from "../context/FlashCardContext";
import AddCardScreen from "../screens/AddCardScreen";
import HomeScreen from "../screens/HomeScreen";
import StudyScreen from "../screens/StudyScreen";

export type RootStackParamList = {
  Flashcards: undefined;
  "Add Card": undefined;
  Study: undefined;
  "My Cards": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FlashcardProvider>
      <Stack.Navigator>
        <Stack.Screen name="Flashcards" component={HomeScreen} />
        <Stack.Screen name="Add Card" component={AddCardScreen} />
        <Stack.Screen name="Study" component={StudyScreen} />
        <Stack.Screen name="My Cards" component={MyCardsScreen} />
      </Stack.Navigator>
    </FlashcardProvider>
  );
}
