'use client'
import Background from '../components/Backgrounds/Background'
import AppBg from '../components/Backgrounds/AppBg'
import { CloudRain, Umbrella, Wind } from '@phosphor-icons/react'
import { Montserrat, Poppins } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const montserrat300 = Montserrat({
  weight: '300',
  subsets: ['latin'],
})
type ILocation = {
  latitude: number
  longitude: number
}

type ICityClimate = {
  name: string
  main: {
    feels_like: number
    grnd_lever: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_min: number
    temp_max: number
  }
  weather: [{}]
}
export default function CityPage() {
  const API_GOOGLE_KEY = 'AIzaSyCh3c_MvX1o5H01_9NKNx54mzj0mWOp6RY'
  const API_KEY = '3a12998b5f071b3069b0754795eb401c'
  const [locationData, setLocationData] = useState()
  const [apiData, setApiData] = useState<ICityClimate>()
  const [location, setLocation] = useState<ILocation>()
  const [animar, setAnimar] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apiSuccess, setApiSuccess] = useState(false)
  function formatteTemp(str: number | undefined) {
    const nova = str?.toString().substring(0, 2)

    return nova
  }
  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
    // Getting state name from geolocation API from google
    if (loading && !apiSuccess) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${API_GOOGLE_KEY}
     `)
        .then((res) => res.json())
        // Pegar nome do estado
        .then((data) => {
          if (
            data &&
            data.results &&
            data.results[0] &&
            data.results[0].address_components
          ) {
            const locationdata =
              data.results[0].address_components[4]?.long_name
            setLocationData(locationdata)
            console.log(locationdata)
            console.log(data.results[0]?.address_components[4]?.long_name)
          }
        })
      // Get temperature data
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${API_KEY}`,
      )
        .then((res) => res.json())
        .then(async (data) => {
          setApiData(data)
          console.log(data)
          //   if (data.cod == 404 || data.cod == 400) {
          //     // ARRAY OF OBJ
          //     setShowWeather([
          //       {
          //         type: 'Not Found',
          //         img: 'https://cdn-icons-png.flaticon.com/512/4275/4275497.png',
          //       },
          //     ])
          //   }
          //   setShowWeather(
          //     WeatherTypes.filter((weather) => weather.type === data.weather[0].main),
          //   )

          setApiData(data)

          setLoading(false)
          setApiSuccess(true)
          //   setLoading(false)
        })
        .then(async () => {
          setLoading(false)
          setApiSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          //   setLoading(false)
        })
    }
  }, [loading, apiSuccess, location?.latitude, location?.longitude, apiData])
  const formattedTemp = formatteTemp(apiData?.main.temp)
  return (
    <>
      <div className="z-[-1] flex h-screen flex-row items-center justify-center">
        <div className="absolute z-10 mx-auto h-[700px] w-[300px] rounded-[30px] lg:h-[700px] lg:w-[400px]">
          <AppBg />
          <div></div>
          <div className="mx-auto flex justify-center pt-16 text-white">
            <motion.div
              className="h-[350px] w-[250px] rounded-2xl border-[0.3px] border-gray-300 p-6 backdrop-blur-[80px] lg:h-[350px] lg:w-[300px]"
              onClick={() => setAnimar(!animar)}
              animate={animar ? { height: 575 } : { scale: 1 }}
              transition={
                animar
                  ? { type: 'fade', delay: 0 }
                  : { type: 'tween', delay: 0.3 }
              }
            >
              <div className="flex flex-wrap justify-between">
                <div
                  className={`${montserrat300.className} text-sm lg:text-base`}
                >
                  <p>{apiData?.name}</p>
                  <p>{locationData}</p>
                </div>
                <div className="">
                  <CloudRain size={50} color="#fff" weight="duotone" />
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className={`${poppins.className} text-7xl lg:text-8xl`}>
                  {formattedTemp}°
                </p>
                <div className="flex w-full justify-between">
                  <div className={montserrat300.className}>
                    <div className="flex flex-row gap-3">
                      <Umbrella size={20} color="#fff" weight="duotone" />
                      <p>65%</p>
                    </div>
                    <div className="flex flex-row gap-3">
                      <Wind size={20} color="#fff" weight="duotone" />
                      <p>12 km/h</p>
                    </div>
                    <div className="flex flex-row gap-3 pl-1 pt-1">
                      <Image
                        src="/icons8-wind-64.png"
                        width={15}
                        height={15}
                        alt="wind rose icon"
                      />
                      <p>S</p>
                    </div>
                  </div>
                  <div className="flex grow" />
                  <div className="mt-2 flex flex-wrap items-end ">
                    <div className={montserrat300.className}>
                      <p>H: 16°</p>
                      <p>T: 10°</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mx-auto mt-14 text-center lg:mt-10"
                  animate={animar ? { opacity: 0 } : { opacity: 1 }}
                >
                  <p className={montserrat300.className}>
                    Click for more details
                  </p>
                  <motion.div
                    className="h-[0.8px] w-[0%] bg-white lg:h-[1px] "
                    whileInView={{
                      width: '100%',
                      transitionDuration: '0.3s',
                    }}
                  />
                </motion.div>
              </div>
              <motion.div
                animate={animar ? { opacity: 1 } : { opacity: 0 }}
                className={`${montserrat300.className}  grid grid-cols-2 items-center justify-center gap-4 pt-3 text-slate-300 opacity-0`}
              >
                <div>
                  <p className="text-[13px]">Sunrise</p>
                  <p className="text-xl text-white">09:14PM</p>
                </div>
                <div>
                  <p className="text-[13px]">Sunset</p>
                  <p className="text-xl text-white">15:39</p>
                </div>
                <div>
                  <p className="text-[13px]">Chance of rain</p>
                  <p className="text-xl text-white">75%</p>
                </div>
                <div>
                  <p className="text-[13px]">Humidity</p>
                  <p className="text-xl text-white">79%</p>
                </div>
              </motion.div>
              <motion.div
                className="pt-5 opacity-0"
                animate={animar ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  animar
                    ? { type: 'spring', delay: 0.2 }
                    : { type: 'tween', delay: 0 }
                }
              >
                <motion.div
                  className="mb-2 h-[0.8px] w-[0%] bg-slate-300 lg:h-[1px] "
                  whileInView={{
                    width: '100%',
                    transitionDuration: '0.5s',
                  }}
                />
                <p className="text-sm text-slate-300 ">
                  Today: Rain, It is now 16°. The highest temperature reported
                  today was 18°
                </p>
                <motion.div
                  className="mt-2 h-[0.8px] w-[0%] bg-slate-300 lg:h-[1px] "
                  whileInView={{
                    width: '100%',
                    transitionDuration: '0.5s',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <Background />
      </div>
    </>
  )
}
