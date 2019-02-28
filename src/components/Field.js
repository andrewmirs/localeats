import React from 'react';
import { Text, TextInput, View } from 'react-native';

const renderField =({ label, keyboardType, name }) => {
    return (
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
            <TextInput 
                style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }} 
                keyboardType={keyboardType}
            >
            </TextInput>
        </View>
    );
};

export default renderField;