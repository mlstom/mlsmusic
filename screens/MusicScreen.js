import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStateContext } from '../context/StateContext';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';

const MusicScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dataReceived = route.params;
    const { activeSong, songData, setActiveSong, addToFavorites, removeFromFavorites, favorites, is, setIs } = useStateContext();
    const [isPlaying, setIsPlaying] = useState(true);
    const [paused, setPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const videoRef = useRef(null);
    const isUnmounted = useRef(false);

    const handleBackPress = () => {
        navigation.goBack();
    };
    let data = dataReceived


    useEffect(() => {
        
        console.log(dataReceived)
        
        const initialIndex = findCurrentIndex();
        const initialSong = data[initialIndex];

        setActiveSong({ song: initialSong, isActive: true });
        playAudio();
        videoRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate); 
        setIs(false); // Dodajte ovu liniju da resetujete is flag na false
        return () => {
            stopAudio();
        };

    }, []);


    const findCurrentIndex = () => {
        const activeSongPreviewUrl = activeSong?.song?.preview;
        if (!activeSongPreviewUrl) return -1;

        return data.findIndex(song => song.preview === activeSongPreviewUrl);
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            playNextSong();
        }
    };

    const handlePlayPause = async () => {
        setPaused(!paused)
        if (isPlaying) {
            await pauseAudio();
        } else {
            await playAudio();
        }
    };

    const playAudio = async () => {
        try {
            await videoRef.current.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error('Greška pri reprodukciji pesme: ', error);
        }
    };

    const pauseAudio = async () => {
        try {
            await videoRef.current.pauseAsync();
            setIsPlaying(false);
        } catch (error) {
            console.error('Greška pri pauziranju pesme: ', error);
        }
    };

    const stopAudio = async () => {
        try {
            if (videoRef.current) {
                await videoRef.current.stopAsync();
                setIsPlaying(false);
            }
        } catch (error) {
            if (!isUnmounted.current) {
                console.error('Greška pri zaustavljanju pesme: ', error);
            }
        }
    };
    const playNextSong = async () => {
        try {
            const currentIndex = data.findIndex((song) => song.id === activeSong.song.id);
            const nextIndex = (currentIndex + 1) % data.length;
            setActiveSong({ song: data[nextIndex], isActive: true });
            playAudio();
            setPaused(false)
            setIsPlaying(true)
        } catch (error) {
            console.error('Greška pri sledecoj pesmi: ', error);
        }
    };
    const playPreviousSong = async () => {
        try {
            const currentIndex = data.findIndex((song) => song.id === activeSong.song.id);
            const nextIndex = (currentIndex - 1) % data.length;
            setActiveSong({ song: data[nextIndex], isActive: true });
            playAudio();
            setPaused(false)
            setIsPlaying(true)
        } catch (error) {
            console.error('Greška pri sledecoj pesmi: ', error);
        }
    };
    const playRandomSong = () => {
        try {
            const randomIndex = Math.floor(Math.random() * data.length);

            const randomSong = data[randomIndex];
            setActiveSong({ song: randomSong, isActive: true });
            playAudio();
            setPaused(false)
            setIsPlaying(true)
        } catch (error) {
            console.error('Greška pri puštanju nasumične pesme: ', error);
        }
    };


    const handleHeartPress = () => {
        if (activeSong.song.isFavorite) {
            activeSong.song.isFavorite = false
            removeFromFavorites(activeSong.song.id);
        } else {
            activeSong.song.isFavorite = true
            addToFavorites(activeSong.song);
        }
    };

    return (
        <View style={styles.container}>
            {/* Strelica nazad */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.imageWrapper}>
                {/* Prikaz slike */}
                <Image source={{ uri: activeSong.song.album.cover_big }} style={styles.musicImage} />

                {/* Informacije o pesmi */}
                <View style={styles.songInfoContainer}>
                    <Text style={styles.songTitle}>{activeSong.song.title}</Text>
                    <Text style={styles.songArtist}>{activeSong.song.artist.name}</Text>
                </View>

                {/* Dugmad za reprodukciju/pauziranje i favorite */}
                <View style={styles.controlsContainer}>
                    <TouchableOpacity style={styles.previousButton} onPress={playPreviousSong}>
                        <FontAwesome name="step-backward" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
                        {paused ? (
                            <Ionicons name="play-circle" size={80} color="white" />
                        ) : (
                            <Ionicons name="pause-circle" size={80} color="white" />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nextButton} onPress={playNextSong}>
                        <FontAwesome name="step-forward" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Dugmad za favorite i nasumično pustanje */}
                <View style={styles.extraControlsContainer}>
                    <TouchableOpacity style={styles.favoriteButton} onPress={handleHeartPress}>
                        {activeSong.song.isFavorite ? <FontAwesome name="heart" size={30} color="white" /> : <FontAwesome name="heart-o" size={30} color="white" />}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shuffleButton} onPress={playRandomSong}>
                        <Ionicons name="shuffle" size={30} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
            <Video
                ref={videoRef}
                source={{ uri: activeSong.song.preview }}
                shouldPlay={false}
                isLooping={false}
                resizeMode="cover"
                style={{ width: 0, height: 0 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#19A7CE', // Plava boja pozadine
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100, // Podesite ovu vrednost prema vašim potrebama
    },
    musicImage: {
        width: 300,
        height: 300,
        borderRadius: 150, // Da dobijemo okruglu sliku
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    songInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    songTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    songArtist: {
        color: 'white',
        fontSize: 18,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    previousButton: {
        marginHorizontal: 20,
    },
    playPauseButton: {
        marginHorizontal: 20,
    },
    nextButton: {
        marginHorizontal: 20,
    },
    extraControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    favoriteButton: {
        marginHorizontal: 20,
    },
    shuffleButton: {
        marginHorizontal: 20,
    },
});

export default MusicScreen;
