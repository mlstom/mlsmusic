import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import SongCard from '../components/SongCard';
import { fetchDeezerData, fetchRandomSongs} from '../api';
import { useStateContext } from '../context/StateContext';

const HomeScreen = () => {
  const { songData, setSongData,setIs } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchRandomSongsData();
    setIs(false)
    return () => setIs(false);
  }, []);

  
  const fetchDataBySearchTerm = async (searchTerm) => {
    if(searchTerm=='') fetchRandomSongsData()
    const result = await fetchDeezerData(`search?q=${searchTerm}&type=track`);
    setSongData(result?.data || []);
  };
  const fetchRandomSongsData = async () => {
    const randomSongs = await fetchRandomSongs(20); // Dohvatamo 20 nasumičnih pesama
    setSongData(randomSongs);
  };
  

  const renderSongCard = ({ item }) => (
    <SongCard
      key={item.id}
      song={item}
      data={songData}
    />
  );

  const handleSearch = () => {
    Keyboard.dismiss(); // Sklanjamo tastaturu prilikom klika na "Search" dugme
    fetchDataBySearchTerm(searchTerm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for music..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={songData}
        renderItem={renderSongCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.songList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#19A7CE',
    textAlign: 'left',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom:10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#19A7CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  songList: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
