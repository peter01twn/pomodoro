import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WORK_TIMESUP, REST_TIMESUP } from 'features/clock/clockSlice'
import getFromLocalStorage from 'utils/getFromLocalStorage'
import AudioPlayer from 'utils/audioPlayer'

let audioPlayer = null
export const play = createAsyncThunk(
  'ring/play',
  async (rId, thunkAPI) => {
    try {
      const { getState } = thunkAPI
      const ringFile = getState().ring.rings[rId]
      if (audioPlayer !== null) {
        audioPlayer.pause()
      }
      audioPlayer = new AudioPlayer(process.env.PUBLIC_URL + '/audios/' + ringFile)
      return audioPlayer.play().pauseAfterTimes(2500)
    } catch (error) {
      console.log(error)
    }
  }
)

const ringSlice = createSlice({
  name: 'ring',
  initialState: {
    rings: {
      Bugle_Tune: 'Bugle_Tune.mp3',
      "Deep-Church-Bell-02": 'Deep-Church-Bell-02.wav',
      "High-Metal-Bell-02": 'High-Metal-Bell-02.wav',
      "Low-Metal-Bell-02": 'Low-Metal-Bell-02.wav',
      "Odd-Metal-Chime": 'Odd-Metal-Chime.wav',
      "Tibetian-Bells-02": 'Tibetian-Bells-02.wav',
      "Clear-Long-Bell-02": 'Clear-Long-Bell-02.wav',
      "Digital_Watch_Alarm_Long": 'Digital_Watch_Alarm_Long.mp3',
      "High-Pitch-Bell-Slide-Up": 'High-Pitch-Bell-Slide-Up.wav',
      "Mechanical_Clock_Ring": 'Mechanical_Clock_Ring.mp3',
      "Radiation_Meter": 'Radiation_Meter.mp3',
      "Timer-Bell": 'Timer-Bell.wav',
    },
    restRing: getFromLocalStorage('rings')?.restRing || 'Deep-Church-Bell-02',
    workRing: getFromLocalStorage('rings')?.workRing || 'Bugle_Tune',
    isPlaying: false, // playing or stop
    playingRing: '',
  },
  reducers: {
    setRestRing(state, action) {
      state.restRing = action.payload
    },
    setWorkRing(state, action) {
      state.workRing = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(play.pending, (state, action) => {
      state.isPlaying = true
      state.playingRing = action.meta.arg
    })
    builder.addCase(play.fulfilled, (state, action) => {
      state.isPlaying = false
      state.playingRing = ''
    })
  }
})

export const { setRestRing, setWorkRing } = ringSlice.actions
export default ringSlice.reducer