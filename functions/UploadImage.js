import axios from "react-native-axios";
import { API_URL_IMGUPLOAD, API_PRESET } from "@env";

export const uploadCloud = async (image) => {
  const formData = new FormData();
  const uriArr = image.uri.split(".");
  const fileType = uriArr[uriArr.length - 1];
  const file = `data:${fileType};base64,${image.base64}`;
  formData.append("file", file);
  formData.append("upload_preset", API_PRESET);

  const response = await axios({
    method: "post",
    url: API_URL_IMGUPLOAD,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};
