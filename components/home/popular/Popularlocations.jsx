import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import styles from "./popularlocations.style";
import { COLORS, SIZES } from "../../../constants";
import PopularLocationCard from "../../common/cards/popular/Popularlocationcard";
import useFetch from "../../../hooks/useFetch";

const Popularlocations = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('Toronto');

  const [selectedLocation, setSelectedLocation] = useState();

  const handleCardPress = (item) => {
    router.push(`/location-details/${item["iata"]}`);
    setSelectedLocation(item["iata"]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Locations</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularLocationCard 
                item={item}
                selectedLocation={selectedLocation}
                handleCardPress={handleCardPress} />
            )}
            keyExtractor={(item) => item["iata"]}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularlocations;