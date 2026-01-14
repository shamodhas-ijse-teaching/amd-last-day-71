import { View, Text } from "react-native"
import React from "react"
import "../global.css"
import { CameraView, useCameraPermissions } from "expo-camera"

const index = () => {
  const [permissions, requestPermissions] = useCameraPermissions()

  if (!permissions?.granted) {
    return (
      <View className="flex-1 items-center justify-center ">
        <Text>Camera permission is required</Text>
        <Text onPress={requestPermissions}>Grant permission</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-red-50">
      <CameraView style={{ flex: 1 }} facing="back" />
    </View>
  )
}

export default index
