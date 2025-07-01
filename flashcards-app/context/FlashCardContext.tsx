import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { defaultCards } from "../data/defaultCard";
import { Flashcard } from "../types";

interface FlashcardContextType {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
}

export const FlashcardContext = createContext<FlashcardContextType>({
  cards: [],
  addCard: () => {},
});

export const FlashcardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await AsyncStorage.getItem("@flashcards");

        let savedCards: Flashcard[] = [];

        if (data) {
          savedCards = JSON.parse(data);

          // Merge defaultCards if not already present
          const hasDefault = (id: string) =>
            savedCards.some((card) => card.id === id);
          const newDefaults = defaultCards.filter(
            (card) => !hasDefault(card.id)
          );

          if (newDefaults.length > 0) {
            savedCards = [...savedCards, ...newDefaults];
            await AsyncStorage.setItem(
              "@flashcards",
              JSON.stringify(savedCards)
            );
          }
        } else {
          // First time use
          savedCards = defaultCards;
          await AsyncStorage.setItem(
            "@flashcards",
            JSON.stringify(defaultCards)
          );
        }

        setCards(savedCards);
      } catch (error) {
        console.error("Failed to load cards", error);
      }
    };

    loadCards();
  }, []);

  const addCard = (card: Flashcard) => {
    const updated = [...cards, card];
    setCards(updated);
    AsyncStorage.setItem("@flashcards", JSON.stringify(updated));
  };

  return (
    <FlashcardContext.Provider value={{ cards, addCard }}>
      {children}
    </FlashcardContext.Provider>
  );
};
