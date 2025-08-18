// screens/ProfileScreen.jsx
import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign
} from "@expo/vector-icons"

const Row = ({ iconPack = "Feather", icon, tint = "#8B8B8B", title, onPress, valueRight, accessibilityLabel }) => {
  const IconPack = { Feather, Ionicons, MaterialCommunityIcons, AntDesign }[iconPack]
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-4"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      <View className="flex-row items-center">
        <View
          className="mr-3 h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#F5F6FA" }}
          accessible={false}
        >
          <IconPack name={icon} size={18} color={tint} />
        </View>
        <Text className="text-[15px] text-text">{title}</Text>
      </View>

      {valueRight ?? (
        <Feather name="chevron-right" size={18} color="#C6C6C6" />
      )}
    </TouchableOpacity>
  )
}

const Section = ({ children }) => (
  <View className="mt-4 rounded-2xl bg-[#f5f5f5]">{children}</View>
)

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets()

  const [pushEnabled, setPushEnabled] = React.useState(true)
  const creditPoints = 0.01

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom }}
    >
      {/* Decorative background icons (like in SignUpScreen) */}
      <View
        className="absolute inset-0"
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        <MaterialCommunityIcons
          name="pizza"
          size={96}
          color="#FFC999"
          style={{ position: "absolute", top: 40, left: 20, opacity: 0.15 }}
        />
        <MaterialCommunityIcons
          name="french-fries"
          size={96}
          color="#FFC999"
          style={{ position: "absolute", top: 120, right: 20, opacity: 0.15 }}
        />
        <MaterialCommunityIcons
          name="cup"
          size={96}
          color="#FFC999"
          style={{ position: "absolute", top: 220, left: 80, opacity: 0.15 }}
        />
      </View>

      {/* Header */}
      <View className="mt-5 px-4 pb-3 relative">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack?.()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="chevron-left" size={22} color="#9AA3AF" />
          </TouchableOpacity>

          {/* Centered Title */}
          <Text className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-gray-600">
            Profile
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top: Avatar + name */}
        <View className="mt-5 flex-row items-center px-2">
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/2014684899/vector/placeholder-avatar-female-person-default-woman-avatar-image-gray-profile-anonymous-face.jpg?s=612x612&w=0&k=20&c=D-dk9ek0_jb19TiMVNVmlpvYVrQiFiJmgGmiLB5yE4w="
            }}
            className="h-14 w-14 rounded-full"
            accessibilityIgnoresInvertColors
          />
          <View className="ml-3">
            <Text className="text-lg font-semibold text-text">
              Joseph Andrade
            </Text>
          </View>
        </View>

        {/* Credit Points */}
        <TouchableOpacity
          className="pt-5 pb-5 mt-4 rounded-2xl px-5 py-4"
          style={{ backgroundColor: "#F07F13" }}
          accessibilityRole="button"
          accessibilityLabel="Credit points"
          onPress={() => navigation.navigate?.("Credits")}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="star-circle"
                size={24}
                color="#FFF"
              />
              <Text className="ml-2 text-base font-semibold text-white">
                Credit Points
              </Text>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-extrabold text-white">
                {creditPoints}
              </Text>
              <Text className="ml-1 text-white/90">pts</Text>
              <Feather
                name="chevron-right"
                size={18}
                color="#FFF"
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>
          <Text className="mt-1 text-[12px] text-white/85">
            Use points at checkout to save on
          </Text>
          <Text className="text-[12px] text-white/85">your next order.</Text>
        </TouchableOpacity>

        {/* Sections */}
        <Section>
          <Row
            iconPack="Feather"
            icon="user"
            tint="#F07F13"
            title="Personal Info"
            onPress={() => navigation.navigate?.("PersonalInfo")}
          />
        </Section>

        <Section>
          <Row
            iconPack="Feather"
            icon="bell"
            tint="#F5B942"
            title="Notifications"
            valueRight={
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                accessibilityLabel="Notification toggle"
              />
            }
          />
          <View className="h-[1px] bg-gray-200 mx-4" />
          <Row  
            iconPack="Feather"
            icon="message-circle"
            tint="#6ED3C7"
            title="Share Feedback"
            onPress={() => navigation.navigate?.("Feedback")}
          />
        </Section>

        <Section>
          <Row
            iconPack="AntDesign"
            icon="questioncircleo"
            tint="#FF6F61"
            title="FAQs"
            onPress={() => navigation.navigate?.("FAQs")}
          />
          <View className="h-[1px] bg-gray-200 mx-4" />
          <Row
            iconPack="Feather"
            icon="settings"
            tint="#8B5CF6"
            title="Settings"
            onPress={() => navigation.navigate?.("Settings")}
          />
        </Section>

        <Section>
          <Row
            iconPack="Feather"
            icon="log-out"
            tint="#EF4444"
            title="Log Out"
            onPress={() => navigation.replace?.("Login")}
            accessibilityLabel="Log out"
          />
        </Section>

        <View className="h-6" />
      </ScrollView>
    </View>
  )
}
