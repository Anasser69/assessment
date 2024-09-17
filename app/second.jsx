import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { API_URL } from "@env";

const Second = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(API_URL + "users/" + post.userId)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Failed to fetch user", error));
  }, [post.userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      {user && (
        <View style={styles.userContainer}>
          <Text style={styles.user}>User: {user.name}</Text>
          <Text style={styles.user}>Email: {user.email}</Text>
        </View>
      )}
      <Button title="Back to Posts" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default Second

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker text color
    textAlign: 'center', // Center text
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666', // Lighter text color
    textAlign: 'justify', // Justify text
  },
  userContainer: {
    marginBottom: 20,
    padding: 10, // Add padding
    backgroundColor: '#e6f7ff', // Light blue background
    borderRadius: 10, // Rounded corners
  },
  user: {
    fontSize: 16,
    color: '#444', // Darker text color
  },
  button: {
    marginTop: 20, // Add margin to the top
  },
})