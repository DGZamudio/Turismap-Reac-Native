import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

const TermsAndConditions = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.text}>
          Welcome to Turismap! These terms and conditions outline the rules and regulations for the use of our mobile application.
          {"\n\n"} 
          - By accessing and using this app, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use the app.
          {"\n\n"} 
          - The content provided through this app is for general informational purposes only. We reserve the right to make updates and changes to the content at any time without notice.
          {"\n\n"}
          - Your use of any information or materials on this app is entirely at your own risk, for which we shall not be liable.
          {"\n\n"} 
          - The app may include links to external websites. We do not endorse or take responsibility for the content of such external sites.
          {"\n\n"} 
          - You agree not to use the app for any unlawful purpose or to violate any local, national, or international law or regulation.
          {"\n\n"}
          - Users are responsible for ensuring that the information they provide during registration is accurate and up to date.
          {"\n\n"}
          - We reserve the right to update these terms at any time without prior notice. Continued use of the app following any changes constitutes acceptance of the updated terms.
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff', 
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#007bff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;
