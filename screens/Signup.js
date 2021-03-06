import React, { useState } from "react";

import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Button, Block, Text, Input } from "../components";
import { theme } from "../constants";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("guest@guest.com");
  const [password, setPassword] = useState("examplepassword");
  const [repeatPassword, setRepeatPassword] = useState("examplepassword");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    Keyboard.dismiss();
    setLoading(true);
    // Validation and Authentication process here
    if (!email || !password) {
      setError("Please type your email and password");
    } else {
      setError("");
    }
    setTimeout(() => {
      setLoading(false);
      if (!error) navigation.navigate("Browse");
    }, 1500);
  };
  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Text h1 bold>
          Sign Up
        </Text>
        <Block middle>
          <Input
            label="Email"
            style={styles.input}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            secure
            label="Password"
            defaultValue={password}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            secure
            label="Repeat Password"
            defaultValue={repeatPassword}
            style={styles.input}
            onChangeText={(text) => setRepeatPassword(text)}
          />
          <Text color="red" center>
            {error && error}
          </Text>
          <Button gradient onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Sign Up
              </Text>
            )}
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    padding: 8,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Signup;
