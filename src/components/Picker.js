import React from 'react';
import { Dimensions, Picker, StyleSheet } from 'react-native';

const renderPicker = ({ input: { onChange, placeholder, value, ...inputProps }, children, ...pickerProps }) => (
    <Picker
      selectedValue={ value }
      onValueChange={ value => onChange(value) }
      { ...inputProps }
      { ...pickerProps }
      style={pickerStyles.input}
      placeholder="Select One.."
    >
        { children }
    </Picker>
);


const { height, width } = Dimensions.get('window');
const pickerStyles = StyleSheet.create({
    input: {
        borderColor: 'rgba(191, 191, 191, 1)',
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
        marginTop: 15,
    },
});

export default renderPicker;