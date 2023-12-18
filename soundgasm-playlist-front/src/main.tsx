import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AudioListProvider from './contexts/AudioListProvider.tsx'
import CurrentAudioProvider from './contexts/CurrentAudioProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioListProvider>
        <CurrentAudioProvider>
          <App /> 
        </CurrentAudioProvider>
    </AudioListProvider>
  </React.StrictMode>,
)
