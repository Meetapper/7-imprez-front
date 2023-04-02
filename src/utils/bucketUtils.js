import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';

const accessKeyId = "GPM8FSBKJOFZQCXY5HYZ";
const secretAccessKey = "1swbJwGOE9BGSD0GDE4NOiL2sp8d2wcp7TGufBmQ";

export const getImageUrl = async (username) => {
    const AWS = require('aws-sdk')
    const s3 = new AWS.S3()
    AWS.config.update({
        region: "eu-central-1",
        accessKeyId,
        secretAccessKey,
        endpoint: "https://eu-central-1.linodeobjects.com",
    })

    const url = s3.getSignedUrl('getObject', {
      Bucket: "shareem-photos",
      Key: username,
      Expires: 3600
    })
    
    return url;
}

export const uploadImage = async (username) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    const file = {
        uri: result.uri,
        name: username,
        type: "image/png",
      }
  
      const options = {
        bucket: "shareem-photos",
        region: "eu-central-1",
        accessKey: accessKeyId,
        secretKey: secretAccessKey,
        awsUrl: "eu-central-1.linodeobjects.com"
      }
    
      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
      });
}

export const checkImage = async (username) => {
    const AWS = require('aws-sdk')
    AWS.config.update({
      region: "eu-central-1",
        accessKeyId,
        secretAccessKey,
        endpoint: "https://eu-central-1.linodeobjects.com",
      })
    const s3 = new AWS.S3()

    try {
    await s3.headObject({
        Bucket: "shareem-photos",
        Key: username,
    }).promise();
    return true;
    } catch (error) {
        return false;
    }
}