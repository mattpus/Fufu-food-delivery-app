import { View, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import restaurants from "../../assets/data/restaurants.json"
import Header from "./Header";
import { StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";


// const restaurant = restaurants[0];

const RestaurantDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState<any>(null)
  const [dishes, setDishes] = useState<any>([])

  const id = route.params?.id;
  console.log(id);

  useEffect(() => {
DataStore.query(Restaurant, id).then(setRestaurant)
DataStore
.query(Dish, (dish) => dish.restaurantID('eq', id))
.then(setDishes)

  },[])

  if(!restaurant) {
    return <ActivityIndicator/>
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
};

export default RestaurantDetailsPage;
const styles =  StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
 
});