import React from 'react';
import { Dimensions, Picker, StyleSheet } from 'react-native';

const renderPicker = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    <Picker
      selectedValue={ value }
      onValueChange={ value => onChange(value) }
      { ...inputProps }
      { ...pickerProps }
      style={pickerStyles.input}
    >
        { children }
    </Picker>
);


const { height, width } = Dimensions.get('window');
const pickerStyles = StyleSheet.create({
    input: {
        borderBottomColor: 'rgba(191, 191, 191, 1)',
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
    },
});

export default renderPicker;