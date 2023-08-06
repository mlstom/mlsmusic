import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStateContext } from '../context/StateContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SongCard = ({ song,data }) => {
  const {  setActiveSong, addToFavorites, removeFromFavorites } = useStateContext();
  const navigation = useNavigation();
  const { title, artist, album } = song;

  const handlePlay = () => {
    setActiveSong({ song, isActive: true });
    
    navigation.navigate('Music',data);
  };

  const handleHeartPress = () => {
    if (song.isFavorite) {
      song.isFavorite=false;
      removeFromFavorites(song.id);
    } else {
      song.isFavorite=true
      addToFavorites(song);
    }
  };

  return (
    <TouchableOpacity onPress={handlePlay} style={styles.container}>
      <Image source={{ uri: album.cover_xl }} style={styles.cover} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist.name}</Text>
        <Text style={styles.album}>{album.title}</Text>
      </View>
      <TouchableOpacity onPress={handleHeartPress} style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={song.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={song.isFavorite ? '#19A7CE' : '#19A7CE'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    marginLeft: 8,
  },
  cover: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  album: {
    fontSize: 12,
    color: '#888',
  },
});

export default SongCard;
