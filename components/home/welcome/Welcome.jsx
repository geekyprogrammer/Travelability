import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import {useState} from 'react'
import styles from './welcome.style'
import {useRouter} from 'expo-router'
import {icons, SIZES} from '../../../constants'

const tabs = ["Airports", "Shopping Malls", "Campuses"]
const Welcome = () => {
  const router = useRouter();
  const [activeTab, setactiveTab] = useState('Airports')
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}> Hello Mahmoud </Text>
        <Text style={styles.welcomeMessage}> Find your accessibility location</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value="" onChange={()=>{}} placeholder="Enter a location" />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
        </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <FlatList 
            data={tabs}
            renderItem={({item}) => 
            (
              <TouchableOpacity style={styles.tab(activeTab, item)} 
                onPress={()=>{setactiveTab(item);
                router.push(`/search/${item}`)
              }}>
                <Text style={styles.tabText(activeTab, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item=>item}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
        </View>
    </View>
  )
}

export default Welcome