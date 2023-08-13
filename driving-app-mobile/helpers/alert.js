import { Alert } from 'react-native';

export default function getAlert(title, message, buttonText, buttonStyle) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: buttonText,
        style: buttonStyle,
      },
    ]
  );
}