import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import styles from "./nearbylocations.style";
import NearbyLocationCard from "../../common/cards/nearby/NearbylocationCard";

const Nearbylocations = () => {

  const router = useRouter();
  const { data, isLoading, error } = useFetch('Ottawa');

  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Locations</Text>
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
          data?.map((item) => (
            <NearbyLocationCard
              item={item}
              key={`nearby-job-${item["iata"]}`}
              handleNavigate={() => router.push(`/location-details/${item["iata"]}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbylocations;