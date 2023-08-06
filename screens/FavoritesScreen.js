import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet,SafeAreaView } from 'react-native';
import { useStateContext } from '../context/StateContext';
import SongCard from '../components/SongCard';

const FavoritesScreen = () => {
    const { favorites, setIs } = useStateContext();
    
    const handlePlaySong = (song) => {
        // Implementirati logiku za reprodukciju pesme
    };

    useEffect(() => {
      setIs(true);
      return () => setIs(false);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePlaySong(item)}>
                        <SongCard song={item} data={favorites} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nemate omiljenih pesama</Text>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoritesScreen;
