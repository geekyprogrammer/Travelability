import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import styles from './popularlocationcard.style'

const PopularLocationCard = ({item, selectedLocation, handleCardPress}) => {

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

  return (
    <TouchableOpacity
      style={styles.container(selectedLocation, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedLocation, item)}>
      <Image
          source={{
            uri: imageLink
          }}
          resizeMode='stretch'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item["shortName"]}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedLocation, item)} numberOfLines={1}>
          {item["name"]}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.location}> {item["muncipalityName"]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularLocationCard