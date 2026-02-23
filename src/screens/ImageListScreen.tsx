import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  useColorScheme,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { RootStackParamList } from '../../App';
import { getImages } from '../services/api';
import ImageCard from '../components/ImageCard';
import { ImageItem } from '../types';
import { Colors } from '../theme/colors';
import { strings } from '../constants/strings';
import { containerWidth, spacing, borderRadius, fontSize } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageList'>;

const ImageListScreen: React.FC<Props> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showLottie, setShowLottie] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade in immediately when component mounts
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    loadImages();

    // Hide Lottie animation after 2 seconds
    const lottieTimer = setTimeout(() => {
      setShowLottie(false);
    }, 2000);

    return () => clearTimeout(lottieTimer);
  }, []);

  const loadImages = async (isLoadMore = false) => {
    if (loading || loadingMore) return;

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const currentOffset = isLoadMore ? offset : 0;
      const response = await getImages(currentOffset);

      if (response && response.images && Array.isArray(response.images)) {
        const newImages = response.images;

        if (isLoadMore) {
          setImages((prev) => [...prev, ...newImages]);
        } else {
          setImages(newImages);
        }

        setOffset(currentOffset + newImages.length);
        setHasMore(newImages.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      Alert.alert(strings.error, strings.loadImagesError);
      console.error('Load images error:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadImages(true);
    }
  }, [hasMore, loadingMore]);

  const renderItem = useCallback(({ item }: { item: ImageItem }) => (
    <ImageCard item={item} onPress={(image) => navigation.navigate('ImageDetail', { image })} />
  ), [navigation]);

  const keyExtractor = useCallback((item: ImageItem, index: number) => `image-${index}-${item.id || index}`, []);

  const renderFooter = () => {
    if (!hasMore && images.length > 0) {
      return (
        <View style={styles.footerText}>
          <Text style={[styles.noMoreText, { color: colors.secondaryText }]}>{strings.noMoreImages}</Text>
        </View>
      );
    }

    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.loadMoreButton, { backgroundColor: colors.primary }, loadingMore && styles.loadMoreButtonDisabled]}
          onPress={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loadMoreText}>{strings.loadMore}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (loading || showLottie) {
    return (
      <Animated.View style={[styles.fullScreen, { opacity: fadeAnim, backgroundColor: colors.background }]}>
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <Text style={styles.headerTitle}>{strings.machineTest}</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
            <LottieView
              source={require('../../assets/loading.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.fullScreen, { opacity: fadeAnim, backgroundColor: colors.background }]}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerTitle}>{strings.machineTest}</Text>
        </View>
        <FlatList
          data={images}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
        />
      </SafeAreaView>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');
const isTablet = width > 600;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + spacing.md : spacing.massive,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: isTablet ? fontSize.xxl : fontSize.xl,
    fontWeight: 'bold',
  },
  placeholder: {
    width: containerWidth.sm,
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  loadMoreButton: {
    paddingVertical: isTablet ? spacing.lg : fontSize.sm,
    paddingHorizontal: isTablet ? spacing.huge : spacing.xxxl,
    borderRadius: borderRadius.sm,
    minWidth: isTablet ? 240 : 200,
    alignItems: 'center',
  },
  loadMoreButtonDisabled: {
    opacity: 0.6,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: isTablet ? fontSize.lg : fontSize.md,
    fontWeight: '600',
  },
  footerText: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: isTablet ? fontSize.md : fontSize.sm,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default ImageListScreen;
