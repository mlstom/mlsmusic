import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { genres } from '../constants';
const CustomPicker = ({ selectedValue, onValueChange, data }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleItemPress = (itemValue,itemTitle) => {
        onValueChange(genres.find((genre) => genre.title === itemTitle))
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectedItem} onPress={() => setModalVisible(true)}>
                <Text style={styles.selectedItemText}>{selectedValue.title}</Text>
                <AntDesign name="caretdown" size={16} color="#19A7CE" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.value}
                            style={styles.modalItem}
                            onPress={() => handleItemPress(item.value,item.title)}
                        >
                            <Text style={styles.modalItemText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    selectedItemText: {
        marginRight: 8,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalItem: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalItemText: {
        fontSize: 16,
    },
});

export default CustomPicker;