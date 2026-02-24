import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../App';
import InputField from '../components/InputField';
import AnimatedAlert from '../components/AnimatedAlert';
import { validateForm } from '../utils/validation';
import { saveUserData } from '../services/api';
import { UserFormData, ValidationErrors } from '../types';
import { Colors } from '../theme/colors';
import { spacing, borderRadius, iconSize, fontSize, buttonHeight, imageSize, containerWidth } from '../theme/spacing';
import { strings } from '../constants/strings';
import { useAlert } from '../hooks/useAlert';

const { width, height } = Dimensions.get('window');
const isTablet = width > 600;
const isSmallDevice = height < 700;

type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetail'>;

const ImageDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { image } = route.params;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { alertConfig, visible, showAlert, hideAlert } = useAlert();
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      showAlert({
        title: 'Validation Error',
        message: 'Please fix the errors in the form before submitting.',
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      const userData = {
        ...formData,
        image: {
          uri: image.xt_image || image.image_url || image.url || '',
          name: `image_${image.id}.jpg`,
          type: 'image/jpeg',
        },
      };

      console.log('Submitting user data with selected API image...');
      const result = await saveUserData(userData);

      showAlert({
        title: 'Success!',
        message: 'Your details have been saved successfully with the selected image.',
        type: 'success',
        onConfirm: () => {
          // Clear form data on success
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          });
          setErrors({});
          navigation.goBack();
        },
      });
    } catch (error: any) {
      console.error('Submit error:', error);
      
      let errorMessage = 'Failed to save your details. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }

      showAlert({
        title: 'Error',
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const aspectRatio = image.width && image.height
    ? image.width / image.height
    : 0.75; // 3:4 ratio for shoe images
  const screenWidth = Dimensions.get('window').width;
  const calculatedHeight = screenWidth / aspectRatio;
  const maxImageHeight = isSmallDevice ? 250 : 350;
  const imageHeight = Math.min(calculatedHeight, maxImageHeight);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]} edges={['bottom']}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={iconSize.lg} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{strings.imageDetails}</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={[styles.keyboardView, { backgroundColor: colors.card }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.card }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ backgroundColor: colors.card }}
        >
          <Image
            source={{ uri: image.xt_image || image.image_url || image.url }}
            style={[styles.headerImage, { height: imageHeight }]}
            resizeMode="cover"
          />

          <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.title, { color: colors.text }]}>{strings.enterYourDetails}</Text>

            <InputField
              label={strings.firstName}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
              placeholder={strings.enterFirstName}
              autoCapitalize="words"
            />

            <InputField
              label={strings.lastName}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
              placeholder={strings.enterLastName}
              autoCapitalize="words"
            />

            <InputField
              label={strings.email}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              error={errors.email}
              placeholder={strings.enterEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label={strings.phoneNumber}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              error={errors.phone}
              placeholder={strings.enterPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>{strings.submit}</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AnimatedAlert
        visible={visible}
        title={alertConfig?.title || ''}
        message={alertConfig?.message || ''}
        type={alertConfig?.type}
        confirmText={strings.ok}
        onClose={hideAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + spacing.md : spacing.massive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: containerWidth.sm,
    height: containerWidth.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: isTablet ? fontSize.xl : fontSize.lg,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: containerWidth.sm,
  },
  headerImage: {
    width: '100%',
  },
  formContainer: {
    padding: isTablet ? spacing.xxl : spacing.lg,
    marginTop: -spacing.xl,
    paddingBottom: spacing.lg,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  title: {
    fontSize: isTablet ? fontSize.xxxl : fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: isTablet ? spacing.xxl : spacing.xl,
  },
  submitButton: {
    padding: isTablet ? fontSize.lg : spacing.lg,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: isTablet ? fontSize.xl : fontSize.lg,
    fontWeight: 'bold',
  },
});

export default ImageDetailScreen;
