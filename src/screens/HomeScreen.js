import React from "react";

import { ActivityIndicator, View, Image, StatusBar, StyleSheet, FlatList } from "react-native";
import { Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";

import { Meal } from "../components/Meal";
import { getMeal } from "../api/meal";

import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen (){

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["MilFolhas"],
    queryFn: getMeal,
  });

  const navigation = useNavigation();

  const handleCardPress = (breakfast) => {
    navigation.navigate('Breakfast', { breakfastId: breakfast.objectId });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {isFetching && <Text>IS FETCHING</Text>}

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />

      <View style={styles.navbarContainer}>
        <Icon
          name="arrow-back"
          size={25}
          color="#fff"
          style={styles.arrowIconContainer}
          onPress={handleGoBack}
        />
        <Text style={styles.pageTitle}>Refeições Principais</Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Meal meal={item} onPress={handleCardPress} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fcfcfc',
  },
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'center',
    width: '100%',
    height: 80,
    backgroundColor: "#C0AA4D"
  },
  pageTitle: {
    fontSize: 18,
    left: 150,
    color: '#fff',
    fontWeight: "bold",
  },
  arrowIconContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    padding: 5,
    left: 30,
  }
});

export default HomeScreen;