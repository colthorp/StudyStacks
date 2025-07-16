import { View, useColorScheme, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const ThemedFlipCard = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.primary,
        },
        styles.card,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ThemedFlipCard;
