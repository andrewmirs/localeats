import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const renderField =({ placeholder, keyboardType, meta: { error, touched }, name, secureTextEntry, input: { onChange, ...restInput }, autoCapitalize }) => {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    name={name}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor= "rgba(189, 195, 199, 0.7)"
                    onChangeText={onChange} 
                    autoCapitalize={autoCapitalize}
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
    input: {
        borderBottomColor: 'rgba(191, 191, 191, 1)',
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    }
});


export default renderField;