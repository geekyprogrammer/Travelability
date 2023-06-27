import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import styles from "./nearbylocationcard.style";

const NearbyLocationCard = ({ item, handleNavigate }) => {

  const [imageLink, setImageLink] = useState("")
  const options = {
    method: 'GET',
    url: 'https://bing-image-search1.p.rapidapi.com/images/search',
    params: {q: item["name"]},
    headers: {
      'X-RapidAPI-Key': '08f7df0a65msh526b60d2eabfff7p14dcf5jsn9b101cdaf434',
      'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
    }
  };


  const getImageURL = async () => { 
    try {
      const response = await axios.request(options);
      console.log("getImageURL")
      console.log(response.data["relatedSearches"][1]["thumbnail"]["thumbnailUrl"])
      setImageLink(response.data["relatedSearches"][1]["thumbnail"]["thumbnailUrl"])
    } catch (error) {
      console.error(error);
    }
  }
  
  getImageURL()
  console.log(item+ " this is imageLink " + imageLink)

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: imageLink,
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item["shortName"]}
        </Text>

        <Text style={styles.location}>{item["name"]}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyLocationCard;