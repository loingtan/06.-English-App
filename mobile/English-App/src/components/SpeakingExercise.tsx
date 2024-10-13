import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SpeakingExercise() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [question, setQuestion] = useState("What's your favorite book and why?");
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [recording, sound]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
    setRecording(null);
    console.log('Recording saved at', uri);
  }

  async function playRecording() {
    if (!recordingUri) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        if (status.durationMillis) {
          setProgress(status.positionMillis / status.durationMillis);
        }
        if (status.durationMillis !== undefined) {
          setDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      }
    });
  }

  async function pauseRecording() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function replayRecording() {
    if (sound) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <Text className="text-xl font-bold mb-4 text-center text-gray-800">
          Speaking Exercise
        </Text>
        <Text className="text-lg mb-6 text-center text-gray-600">
          {question}
        </Text>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          className="bg-blue-500 rounded-full p-4 self-center"
        >
          {isRecording ? (
            <Icon name="stop" size={32} color="black" />
          ) : (
            <Icon name="microphone" size={32} color="black" />
          )}
        </TouchableOpacity>
        <Text className="text-sm mt-4 text-center text-gray-500">
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>

        {recordingUri && (
          <View>
            <TouchableOpacity
              onPress={isPlaying ? pauseRecording : playRecording}
              className="bg-green-500 rounded-full p-4 self-center mt-4"
            >
              {isPlaying ? (
                <Icon name="pause" size={32} color="black" />
              ) : (
                <Icon name="play" size={32} color="black" />
              )}
            </TouchableOpacity>
            {/* <Slider
              value={progress}
              onValueChange={(value: number) => {
                if (sound) {
                  sound.setPositionAsync(value * duration);
                }
              }}
              className="mt-4"
            /> */}
            <TouchableOpacity
              onPress={replayRecording}
              className="bg-red-500 rounded-full p-4 self-center mt-4"
            >
              <Icon name="repeat" size={32} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
