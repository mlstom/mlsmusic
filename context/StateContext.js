import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [songData, setSongData] = useState([]);
  const [activeSong, setActiveSong] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [is, setIs] = useState(false);

  const addToFavorites = (song) => {
    setFavorites([song, ...favorites]);
  };

  const removeFromFavorites = (songId) => {
    const updatedFavorites = favorites.filter((song) => song.id !== songId);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    // Save favorites to AsyncStorage whenever the favorites state changes
    saveFavoritesToStorage();
  }, [favorites]);

  useEffect(() => {
    // Load favorites from AsyncStorage when the app starts
    loadFavoritesFromStorage();
  }, []);

  const saveFavoritesToStorage = async () => {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage: ', error);
    }
  };

  const loadFavoritesFromStorage = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('@favorites');
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage: ', error);
    }
  };

  return (
    <Context.Provider
      value={{
        songData,
        setSongData,
        activeSong,
        setActiveSong,
        addToFavorites,
        removeFromFavorites,
        favorites,
        is,
        setIs,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
