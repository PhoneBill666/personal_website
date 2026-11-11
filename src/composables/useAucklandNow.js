import { ref, onMounted, onBeforeUnmount } from 'vue'

// Open-Meteo weather codes grouped into friendly labels.
const WEATHER = [
  [[0], 'Clear', '☀️'],
  [[1, 2], 'Partly cloudy', '⛅'],
  [[3], 'Overcast', '☁️'],
  [[45, 48], 'Foggy', '🌫️'],
  [[51, 53, 55, 56, 57], 'Drizzle', '🌦️'],
  [[61, 63, 65, 66, 67, 80, 81, 82], 'Rain', '🌧️'],
  [[71, 73, 75, 77, 85, 86], 'Snow', '🌨️'],
  [[95, 96, 99], 'Thunderstorm', '⛈️'],
]

// Local time and weather for a fixed place, so visitors are never asked for their location.
export function useAucklandNow({ timeZone, latitude, longitude }) {
  const time = ref('')
  const date = ref('')
  const weather = ref(null)
  let timer = null

  const timeFormat = new Intl.DateTimeFormat('en-NZ', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
  const dateFormat = new Intl.DateTimeFormat('en-NZ', { timeZone, weekday: 'short', day: 'numeric', month: 'short' })

  const tick = () => {
    const now = new Date()
    time.value = timeFormat.format(now)
    date.value = dateFormat.format(now)
  }

  const loadWeather = async () => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + latitude +
      '&longitude=' + longitude +
      '&current=temperature_2m,weather_code,is_day&timezone=' + encodeURIComponent(timeZone)
    try {
      const response = await fetch(url)
      if (!response.ok) return
      const { current } = await response.json()
      const match = WEATHER.find(([codes]) => codes.includes(current.weather_code))
      let icon = match ? match[2] : '🌤️'
      if (current.is_day === 0 && current.weather_code <= 2) icon = '🌙'
      weather.value = {
        temp: Math.round(current.temperature_2m),
        label: match ? match[1] : 'Auckland',
        icon,
      }
    } catch {
      // Weather is decorative; leave the placeholder if the request fails.
    }
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 15000)
    loadWeather()
  })

  onBeforeUnmount(() => clearInterval(timer))

  return { time, date, weather }
}
