"use client"
import App from '@/app/components/App'
import AudioListProvider from './contexts/AudioListProvider'
import CurrentAudioProvider from './contexts/CurrentAudioProvider'

export default function Home() {
  return (
    <AudioListProvider>
        <CurrentAudioProvider>
          <App /> 
        </CurrentAudioProvider>
    </AudioListProvider>
  )
}
