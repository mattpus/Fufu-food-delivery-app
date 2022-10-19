import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../assets/data/restaurants.json";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";

export default function HomeScreen() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
 const fetchRestaurants= async () => {
  const response = await DataStore.query(Restaurant)
  console.log("RESPONSE HOME SCREEN",response)
  setRestaurants(response)
 }
  useEffect(() => {
    fetchRestaurants()
  }, [])
  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
