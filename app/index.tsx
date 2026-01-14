import { View, Text, Button, Alert, Image } from "react-native"
import React, { useRef, useState } from "react"
import "../global.css"
import {
  CameraView,
  useCameraPermissions,
  CameraType,
  BarcodeScanningResult
} from "expo-camera"

// <Index r></Index>

const index = () => {
  const [permissions, requestPermissions] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>("back")
  const [photo, setPhoto] = useState<string | null>(null)

  const cameraRef = useRef<CameraView>(null)

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return
    }
    const result = await cameraRef.current.takePictureAsync()
    setPhoto(result.uri)

    // 
  }

  if (!permissions?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Camera permission is required</Text>
        <Text onPress={requestPermissions}>Grant permission</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-red-50">
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: "200" }}
        />
      )}
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={(result: BarcodeScanningResult) => {
          console.log(result.data)
          Alert.alert(result.data)
        }}
      />
      <View className="absolute bottom-14 w-full flex-row justify-around px-5">
        <Button
          title="Flip Camera"
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        />
        <Button title="Take photo" onPress={takePhoto} />
      </View>
    </View>
  )
}

export default index
