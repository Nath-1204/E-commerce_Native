import React, { useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../../assets/styles/signup.styles'
import COLORS from '../../constants/colors'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore'


function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { user, isLoading, register, token  } = useAuthStore();

  console.log("User is here: ", user)

  const router = useRouter()

  const handleSignup = async() => {
    const result = await register(username, email, password);
    console.log(result);

    if(!result.success) 
      Alert.alert("Error", result.error);
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      /* behavior={Platform.OS === "ios" ? "padding" : "height"} */
    >
      <View style={styles.container}>
        <View style={styles.card}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subtitle}>Partagez votre lecture favori</Text>
          </View>

          <View style={styles.formContainer}>

            {/* USERNAME INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>UserName</Text>
              <View style={styles.inputContainer}>
                <Ionicons 
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput 
                  style={styles.input}
                  placeholder='Your Name'
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize='none'
                />
              </View>
            </View>

            {/* EMAIL INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons 
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter your email'
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons 
                  name='lock-closed-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput 
                  style={styles.input}
                  placeholder='Enter your password'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}       
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

              </View>

            </View>

            {/* SIGNUP BUTTON */}
            <TouchableOpacity 
              onPress={handleSignup}
              style={styles.button}
              disabled={isLoading}
            >
              {
                isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )
              }
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup

