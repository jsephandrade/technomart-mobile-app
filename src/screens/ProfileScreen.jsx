// screens/ProfileScreen.jsx
import React, { useEffect, useRef, useLayoutEffect } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
  Alert,
  BackHandler,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign
} from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import ConfirmLogoutModal from "../components/ConfirmLogoutModal"

const Row = ({
  iconPack = "Feather",
  icon,
  tint = "#8B8B8B",
  title,
  onPress,
  valueRight,
  accessibilityLabel
}) => {
  const IconPack = { Feather, Ionicons, MaterialCommunityIcons, AntDesign }[
    iconPack
  ]
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

  // Existing state
  const [pushEnabled, setPushEnabled] = React.useState(true)
  const creditPoints = 0.01

  // Local inline Settings state (no extra navigation)
  const [settingsExpanded, setSettingsExpanded] = React.useState(true)
  const [theme, setTheme] = React.useState("System") // "System" | "Light" | "Dark"
  const [cameraAllowed, setCameraAllowed] = React.useState(false)

  // NEW: show/hide confirm modal
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false)

  // Flag to allow leaving this screen ONLY when logging out
  const isLoggingOut = useRef(false)

  // Disable gestures & header back (prevents iOS swipe-back, etc.)
  useLayoutEffect(() => {
    navigation?.setOptions?.({
      gestureEnabled: false,
      headerBackVisible: false
    })
  }, [navigation])

  // Intercept any attempt to leave this screen (back, gesture, programmatic)
  useEffect(() => {
    const sub = navigation.addListener("beforeRemove", (e) => {
      // Allow if we are logging out (we call replace('Login'))
      if (isLoggingOut.current) return
      // Block all other attempts to leave Profile
      e.preventDefault()
    })
    return sub
  }, [navigation])

  // Block Android hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true // consume/back blocked
      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress)
      return () => sub.remove()
    }, [])
  )

  const cycleTheme = () => {
    setTheme((prev) =>
      prev === "System" ? "Light" : prev === "Light" ? "Dark" : "System"
    )
  }

  const requestOrToggleCamera = () => {
    if (!cameraAllowed) {
      Alert.alert(
        "Camera Permission",
        "Simulating a camera permission prompt here. Replace with your permission request logic.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Allow", onPress: () => setCameraAllowed(true) }
        ]
      )
    } else {
      Alert.alert(
        "Revoke Permission?",
        "This will simulate revoking camera access.",
        [
          { text: "Keep", style: "cancel" },
          { text: "Revoke", style: "destructive", onPress: () => setCameraAllowed(false) }
        ]
      )
    }
  }

  // Called only after user confirms in the modal
  const confirmLogoutAndNavigate = () => {
    isLoggingOut.current = true
    // Clear any auth/session state here if needed...
    navigation.replace?.("Login")
  }

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

      {/* Header — no back button */}
      <View className="mt-5 px-4 pb-3 relative">
        <Text className="text-center text-base font-semibold text-gray-600">
          Profile
        </Text>
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

        {/* Personal / Feedback */}
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
            icon="message-circle"
            tint="#6ED3C7"
            title="Share Feedback"
            onPress={() => navigation.navigate?.("Feedback")}
          />
        </Section>

        {/* FAQs + Inline Settings */}
        <Section>
          <Row
            iconPack="AntDesign"
            icon="questioncircleo"
            tint="#FF6F61"
            title="FAQs"
            onPress={() => navigation.navigate?.("FAQs")}
          />
          <View className="h-[1px] bg-gray-200 mx-4" />

          {/* Settings (inline, expandable) */}
          <Row
            iconPack="Feather"
            icon="settings"
            tint="#8B5CF6"
            title="Settings"
            onPress={() => setSettingsExpanded((v) => !v)}
            valueRight={
              <Feather
                name={settingsExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color="#C6C6C6"
              />
            }
          />

          {settingsExpanded && (
            <View className="pb-2">
              {/* Appearance */}
              <View className="h-[1px] bg-gray-200 mx-4" />
              <Row
                iconPack="Feather"
                icon="moon"
                tint="#7C3AED"
                title="Appearance"
                onPress={cycleTheme}
                valueRight={
                  <View className="px-2 py-1 rounded-md" style={{ backgroundColor: "#EDE9FE" }}>
                    <Text className="text-xs text-[#5B21B6]">{theme}</Text>
                  </View>
                }
              />

              {/* Notifications */}
              <View className="h-[1px] bg-gray-200 mx-4" />
              <Row
                iconPack="Feather"
                icon="bell"
                tint="#10B981"
                title="Notifications"
                onPress={() => setPushEnabled((v) => !v)}
                valueRight={
                  <Switch
                    value={pushEnabled}
                    onValueChange={setPushEnabled}
                    accessibilityLabel="Toggle push notifications"
                  />
                }
              />

              {/* Camera Permission */}
              <View className="h-[1px] bg-gray-200 mx-4" />
              <Row
                iconPack="Feather"
                icon="camera"
                tint="#F59E0B"
                title="Camera Permission"
                onPress={requestOrToggleCamera}
                valueRight={
                  <View className="flex-row items-center">
                    <View
                      className="px-2 py-[2px] rounded-md mr-2"
                      style={{ backgroundColor: cameraAllowed ? "#DCFCE7" : "#FEE2E2" }}
                    >
                      <Text
                        className="text-xs"
                        style={{ color: cameraAllowed ? "#166534" : "#991B1B" }}
                      >
                        {cameraAllowed ? "Allowed" : "Not allowed"}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={18} color="#C6C6C6" />
                  </View>
                }
              />
            </View>
          )}
        </Section>

        {/* About + Legal & Policies (before Log Out) */}
        <Section>
          <Row
            iconPack="Feather"
            icon="info"
            tint="#3B82F6"
            title="About"
            onPress={() => Linking.openURL("https://www.facebook.com/jseph.andrade")}
          />

          <View className="h-[1px] bg-gray-200 mx-4" />
          <Row
            iconPack="Feather"
            icon="file-text"
            tint="#9CA3AF"
            title="Legal & Policies"
            onPress={() => Linking.openURL("https://www.facebook.com/jseph.andrade")}
          />
        </Section>

        {/* Log Out — tap to open modal (separate component) */}
        <Section>
          <Row
            iconPack="Feather"
            icon="log-out"
            tint="#EF4444"
            title="Log Out"
            onPress={() => setShowLogoutConfirm(true)}
            accessibilityLabel="Log out"
          />
        </Section>

        <View className="h-6" />
      </ScrollView>

      {/* Confirmation Modal */}
      <ConfirmLogoutModal
        visible={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogoutAndNavigate}
      />
    </View>
  )
}
