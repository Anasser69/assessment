import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { API_URL } from "@env";
import i18n from "../utils/i18n";

const Second = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params;
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(i18n.locale);

  useEffect(() => {
    fetch(API_URL + "/users/" + post.userId)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(i18n.t('fetchUserError'), error));
  }, [post.userId]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    i18n.locale = newLanguage;
  }

  return (
    <View style={[styles.container, { direction: language === 'ar' ? 'rtl' : 'ltr' }]} >
      <Text style={[styles.title, { textAlign: language === 'ar' ? 'right' : 'left' }]}>{post.title}</Text>
      <Text style={[styles.body, { textAlign: language === 'ar' ? 'right' : 'left' }]}>{post.body}</Text>
      {user && (
        <View style={styles.userContainer}>
          <Text style={[styles.user, { textAlign: language === 'ar' ? 'right' : 'left' }]}>{i18n.t('user')}: {user.name}</Text>
          <Text style={[styles.user, { textAlign: language === 'ar' ? 'right' : 'left' }]}>{i18n.t('email')}: {user.email}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title={i18n.t('changeLanguage')} onPress={toggleLanguage} />
        </View>
        <View style={styles.button}>
          <Button title={i18n.t('backToPosts')} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  )
}

export default Second

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', 
    textAlign: 'center', 
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666', 
    textAlign: 'justify', 
  },
  userContainer: {
    marginBottom: 20,
    padding: 10, 
    backgroundColor: '#e6f7ff', 
    borderRadius: 10,
  },
  user: {
    fontSize: 16,
    color: '#444',
  },
  button: {
    marginTop: 20, 
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
})