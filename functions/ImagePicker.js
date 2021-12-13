import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.5,
    base64: true,
  });
  console.log(result);
  if (!result.cancelled) {
    return {
      uri: result.uri,
      base64: result.base64,
    };
  }
  return;
};
export default pickImage;
