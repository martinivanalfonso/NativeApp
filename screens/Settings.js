import React, { useState } from "react";

import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";
import { Button, Block, Text, Divider, SwitchInput } from "../components";
import { theme, mocks } from "../constants";

const Settings = ({ profile: user = mocks.profile }) => {
  const [profile, setProfile] = useState(user);
  const [budget, setBudget] = useState(profile.budget);
  const [monthlyCap, setMonthlyCap] = useState(profile.monthlyCap);
  const [newsletter, setNewsletter] = useState(profile.newsletter);
  const [notifications, setNotifications] = useState(profile.notifications);
  const [editing, setEditing] = useState(null);

  const toggleEdit = (name) => {
    setEditing(!editing ? name : null);
  };

  const renderEdit = (name) => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          autoFocus={true}
          onChangeText={(text) => handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  };

  const handleEdit = (name, text) => {
    setProfile(prev => ({ ...prev, [name]: text}))
  }

  return (
    <Block style={styles.header} >
      <Block flex={false} row center space="between" >
        <Text h1 light>
          Settings
        </Text>
        <Button color='transparent'>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block styles={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2>Username</Text>
              {renderEdit("username")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("username")}>
              {editing === "username" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2>Location</Text>
              {renderEdit("location")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("location")}>
              {editing === "location" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2>E-mail</Text>
              {renderEdit("email")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("email")}>
              {editing === "email" ? "Save" : "Edit"}
            </Text>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base * 2, 0]} />

        <Block style={styles.slider}>
          <Block>
            <Text gray2 style={{ marginBottom: 10 }}>
              Budget
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={budget}
              step={1}
              onValueChange={(val) => setBudget(val)}
            />
            <Text caption gray2 right>
              ${budget}
            </Text>
          </Block>
          <Block>
            <Text gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={monthlyCap}
              step={1}
              onValueChange={(val) => setMonthlyCap(val)}
            />
            <Text caption gray2 right>
              ${monthlyCap}
            </Text>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base * 2, 0]} />

        <Block>
          <Block row space="between" center style={styles.toggle}>
            <Text gray2>Notifications</Text>
            <SwitchInput
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
            />
          </Block>
          <Block row space="between" center style={styles.toggle}>
            <Text gray2>Newsletter</Text>
            <SwitchInput
              value={newsletter}
              onValueChange={() => setNewsletter(!newsletter)}
            />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  slider: {
    marginTop: theme.sizes.base,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggle: {
    marginBottom: theme.sizes.base,
  }
});
export default Settings;
