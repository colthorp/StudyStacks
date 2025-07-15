import { Image, useColorScheme } from 'react-native';

//images
import DarkLogo from '../assets/img/darkBrain.png';
import LightLogo from '../assets/img/lightBrain.png';

const ThemedLogo = ({ ...props }) => {
  const colorScheme = useColorScheme();
  const logo = colorScheme === 'dark' ? LightLogo : DarkLogo;

  return (
    <Image source={logo} {...props}
    />
  );
}

export default ThemedLogo;