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
import * as ImagePicker from 'expo-image-picker';
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
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showAlert({
        title: strings.permissionRequired,
        message: strings.permissionMessage,
        type: 'error',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages(result.assets);
    }
  };

  const handleSubmit = async () => {
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (selectedImages.length === 0) {
      showAlert({
        title: strings.imageRequired,
        message: strings.imageRequiredMessage,
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      const userData = {
        ...formData,
        image: selectedImages[0], // Send first image for now, or modify API to handle multiple
      };

      await saveUserData(userData);

      showAlert({
        title: strings.success,
        message: strings.successMessage,
        type: 'success',
        onConfirm: () => navigation.goBack(),
      });
    } catch (error) {
      showAlert({
        title: strings.error,
        message: strings.errorMessage,
        type: 'error',
      });
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const aspectRatio = image.width && image.height
    ? image.width / image.height
    : 1;
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
            source={{ uri: image.image_url || image.url }}
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

            <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: colors.secondaryBackground, borderColor: colors.border }]} onPress={pickImage}>
              <Text style={[styles.imagePickerText, { color: colors.primary }]}>
                {selectedImages.length > 0 ? strings.imagesSelected(selectedImages.length) : strings.selectImages}
              </Text>
            </TouchableOpacity>

            {selectedImages.length > 0 && (
              <View style={styles.selectedImagesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedImages.map((img, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image
                        source={{ uri: img.uri }}
                        style={styles.selectedImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                      >
                        <Text style={styles.removeButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

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
  imagePickerButton: {
    padding: isTablet ? spacing.lg : spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
  },
  imagePickerText: {
    fontSize: isTablet ? fontSize.lg : fontSize.md,
    fontWeight: '600',
  },
  selectedImage: {
    width: isTablet ? imageSize.large : imageSize.medium,
    height: isTablet ? imageSize.large : imageSize.medium,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  selectedImagesContainer: {
    marginBottom: spacing.lg,
  },
  imageWrapper: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.lg,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    lineHeight: spacing.xl,
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
