import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, Platform, useColorScheme } from 'react-native';
import { ImageItem } from '../types';
import { Colors } from '../theme/colors';
import { spacing as spacingTheme, borderRadius } from '../theme/spacing';

const { width } = Dimensions.get('window');
const numColumns = width > 600 ? 2 : 1;
const CARD_WIDTH = (width - spacingTheme.lg * (numColumns + 1)) / numColumns;

interface ImageCardProps {
  item: ImageItem;
  onPress: (item: ImageItem) => void;
}

const ImageCard: React.FC<ImageCardProps> = React.memo(({ item, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const aspectRatio = item.width && item.height ? item.width / item.height : 1;
  const imageHeight = CARD_WIDTH / aspectRatio;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card },
        Platform.select({
          ios: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            elevation: 3,
          },
        }),
      ]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image_url || item.url }}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginHorizontal: spacingTheme.lg / 2,
    marginVertical: spacingTheme.sm,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});

export default ImageCard;
