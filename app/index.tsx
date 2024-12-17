import React, { useState, useContext } from "react";
import { 
  Text, 
  TextInput,
  KeyboardAvoidingView,
  View,
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
const favicon = ('../assets/images/favicon.png');
import { useAuth } from "../context/AuthContext.tsx.bak";

const SignPage = () => {
  const [username, setUsername] = useState('admin'); //for testing purposes remove and replace with beelow
  const [password, setPassword] = useState('admin');//for testing purposes remove and replace with beelow
  const { onLogin } = useAuth();

  const { width } = useWindowDimensions();

  const onSignInPress = async () => {
    onLogin!(username, password);
  };

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          
            <View style={styles.logoContainer}>

              <Image
                source={require('../assets/images/favicon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Welcome Back</Text>
            </View>

            <View style={styles.inputField}>
              <TextInput 
                style={styles.input}
                autoCapitalize="none"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                secureTextEntry
              
              />
              <TextInput 
                style={styles.input}
                autoCapitalize="none"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              onPress={onSignInPress} 
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: '30%',
    height: '30%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputField: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignPage;
    
    