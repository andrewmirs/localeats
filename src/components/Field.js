import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const renderField =({ placeholder, keyboardType, meta: { error, touched }, name, value, secureTextEntry, input: { onChange, ...restInput }, autoCapitalize, customStyles}) => {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={customStyles} 
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    name={name}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor= "#555555"
                    onChangeText={onChange} 
                    autoCapitalize={autoCapitalize}
                    value={value}
                    {...restInput}
                >
                </TextInput>
            </View>
            {touched && (error && <Text style={{ color: '#ed4747' }}>{error}</Text>)}
        </View>
    );
};

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    }
});


export default renderField;