import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, Dimensions, Platform, useColorScheme } from 'react-native';
import { Colors } from '../theme/colors';
import { spacing, borderRadius, fontSize, inputHeight } from '../theme/spacing';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(({ label, value, onChangeText, error, ...props }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.inputBackground,
            color: colors.text,
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholder}
        {...props}
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: isTablet ? spacing.xl : spacing.lg,
  },
  label: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: isTablet ? fontSize.sm : spacing.md,
    fontSize: isTablet ? fontSize.lg : fontSize.md,
    minHeight: Platform.OS === 'ios' ? inputHeight.md : inputHeight.lg,
  },
  errorText: {
    fontSize: isTablet ? fontSize.sm : fontSize.xs,
    marginTop: spacing.xs,
  },
});

export default InputField;
