'use client'
import AppBg from '../Backgrounds/AppBg'
import { CloudRain, Umbrella, Wind } from '@phosphor-icons/react'
import { Montserrat, Poppins } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const montserrat300 = Montserrat({
  weight: '300',
  subsets: ['latin'],
})
type IForecast = [
  {
    date: string
    day: {
      maxtemp_c: number
      mintemp_c: number
      avgtemp_c: number
      daily_chance_of_rain: number
      condition: {
        icon: string
        text: string
      }
    }
    astro: {
      sunrise: string
      sunset: string
    }
  },
]

type ICityClimate = {
  forecast: {
    forecastday: [
      {
        date: string
        day: {
          maxtemp_c: number
          mintemp_c: number
          avgtemp_c: number
          daily_chance_of_rain: number
          condition: {
            icon: string
            text: string
          }
        }
        astro: {
          sunrise: string
          sunset: string
        }
      },
    ]
  }
  location: {
    name: string
    region: string
  }
  current: {
    humidity: number
    temp_c: number
    is_day: number
    wind_kph: number
    wind_dir: string
    condition: {
      icon: string
      text: string
    }
  }
}

export default function CityPage({ data }: any) {
  const API_KEY = '51e19f3c646a42b48f0193741231505'
  const [apiData, setApiData] = useState<ICityClimate>()
  const [forecastData, setForecastData] = useState<IForecast>()
  const [animar, setAnimar] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apiSuccess, setApiSuccess] = useState(false)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        if (loading && !apiSuccess) {
          fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=no`,
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              setForecastData(data.forecast.forecastday.slice(1, 7))
              console.log(forecastData)
              setApiData(data)
              setLoading(false)
              setApiSuccess(true)
            })
            .catch((err) => {
              console.log('Erro captado:' + err)
              setLoading(false)
            })
        }
      })
    }
  }, [loading, apiSuccess, forecastData])
  const [height, setHeight] = useState(0)
  const [size, setSize] = useState(0)
  const width = window.innerWidth
  const animatedDiv = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    function responsiveHeight() {
      if (width < 796) {
        setHeight(animatedDiv.current.offsetHeight)
        setSize(height)
      } else if (width < 1280) {
        setHeight(animatedDiv.current.offsetHeight)
        setSize(height)
      }
    }
    responsiveHeight()
  }, [height, width])
  console.log(height)
  return (
    <>
      <div className="z-[-1] flex h-screen flex-row items-center justify-center">
        <AppBg />
        <div className="absolute z-10 mx-auto  rounded-[30px] lg:h-[800px] lg:w-[450px]">
          <div className="mx-auto flex w-fit items-center justify-center p-2 ">
            <div className="mx-auto flex flex-col justify-center gap-10 rounded-[30px] text-white lg:pt-16">
              <motion.div
                className={`h-[270px] w-[250px] rounded-2xl border-[0.3px] border-gray-300 p-4 backdrop-blur-[80px] lg:h-[420px] lg:w-[350px] lg:p-6`}
                onClick={() => setAnimar(!animar)}
                ref={animatedDiv}
                animate={
                  animar
                    ? { height: size + 200 }
                    : {
                        scale: 1,
                        height: size,
                      }
                }
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
                    {/* Localização */}
                    <p>{apiData?.location?.name}</p>
                    <p>{apiData?.location?.region}</p>
                  </div>
                  <div className="">
                    <CloudRain
                      color="#fff"
                      weight="duotone"
                      className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px] "
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <p className={`${poppins.className} text-5xl lg:text-8xl`}>
                    {apiData?.current?.temp_c}°
                  </p>
                  <div className="flex w-full justify-between pt-2">
                    <div className={montserrat300.className}>
                      <div className="flex flex-row gap-3">
                        <Umbrella
                          className="h-[20px] w-[20px] lg:h-[40px] lg:w-[40px]"
                          color="#fff"
                          weight="duotone"
                        />
                        <p className="text-sm lg:text-2xl">
                          {forecastData?.[0].day.avgtemp_c}%
                        </p>
                      </div>
                      <div className="flex flex-row gap-3">
                        <Wind
                          className="h-[20px] w-[20px] lg:h-[40px] lg:w-[40px]"
                          color="#fff"
                          weight="duotone"
                        />
                        <p className="text-sm lg:text-2xl">
                          {apiData?.current?.wind_kph} km/h
                        </p>
                      </div>
                      <div className="flex flex-row gap-3 pl-1 pt-1 ">
                        <div className="absolute h-[20px] w-[15px] lg:h-[40px] lg:w-[35px]">
                          <Image
                            src="/icons8-wind-64.png"
                            fill
                            alt="wind rose icon"
                          />
                        </div>

                        <div>
                          <p className=" ml-7 text-sm lg:ml-12 lg:text-2xl">
                            {apiData?.current?.wind_dir}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="mx-auto mt-10  text-center lg:mt-5"
                    animate={animar ? { opacity: 0 } : { opacity: 1 }}
                  >
                    <p
                      className={`${montserrat300.className} text-base lg:text-2xl`}
                    >
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
                <div>
                  <motion.div
                    className=" opacity-0"
                    animate={animar ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      animar
                        ? { type: 'spring', delay: 0.2 }
                        : { type: 'tween', delay: 0 }
                    }
                  >
                    <motion.div
                      className="mb-2 h-[0.8px] w-[0%] bg-slate-300 lg:mt-8 lg:h-[1px] lg:opacity-100"
                      whileInView={{
                        width: '100%',
                        transitionDuration: '0.5s',
                      }}
                    />
                    <p className="text-center text-[12px] text-slate-300 lg:text-[15px] lg:opacity-100">
                      Today: {apiData?.current?.condition.text}, It is now{' '}
                      {apiData?.current?.temp_c}°. The highest temperature
                      reported today was {forecastData?.[0].day.maxtemp_c}°
                    </p>
                    <motion.div
                      className="mt-2 h-[0.8px] w-[0%] bg-slate-300  lg:h-[1px] lg:opacity-100"
                      whileInView={{
                        width: '100%',
                        transitionDuration: '0.5s',
                      }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  animate={animar ? { opacity: 1 } : { opacity: 0 }}
                  className={`${montserrat300.className}  grid grid-cols-2 items-center justify-center gap-4 pt-4  text-center text-slate-300 opacity-0 lg:pt-3`}
                >
                  <div>
                    <p className="text-[16.3px] lg:text-[13px]">Sunrise</p>
                    <p className="text-[14px] text-white lg:text-xl">
                      {forecastData?.[0].astro.sunrise}
                    </p>
                  </div>
                  <div>
                    <p className="text-[16.3px] lg:text-[13px]">Sunset</p>
                    <p className="text-[14px] text-white lg:text-xl">
                      {' '}
                      {forecastData?.[0].astro.sunset}
                    </p>
                  </div>
                  <div>
                    <p className="text-[16.3px] lg:text-[13px]">Rain chance</p>
                    <p className="text-[14px] text-white lg:text-xl">
                      {forecastData?.[0].day.daily_chance_of_rain}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[16.3px] lg:text-[13px]">Humidity</p>
                    <p className="text-[14px] text-white lg:text-xl">
                      {apiData?.current?.humidity}%
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                animate={animar ? { opacity: 0 } : { opacity: 100 }}
                transition={
                  animar
                    ? { type: 'tween', delay: 0 }
                    : { type: 'tween', delay: 0.7 }
                }
                className={
                  animar
                    ? `${montserrat300.className} text-black opacity-0`
                    : `relative text-white `
                }
              >
                <p
                  className={`${montserrat300.className} relative -mb-6 text-lg text-white`}
                >
                  Next 6 days:
                </p>
              </motion.div>
              <motion.div
                animate={animar ? { opacity: 0 } : { opacity: 100 }}
                transition={
                  animar
                    ? { type: 'tween', delay: 0 }
                    : { type: 'tween', delay: 0.5 }
                }
                className={
                  animar
                    ? `${montserrat300.className} opacity-0 backdrop-blur-[80px]`
                    : `${montserrat300.className} mx-auto flex h-[100px] flex-wrap content-center items-center justify-center gap-0 rounded-2xl
                     border-[0.3px] border-gray-300 p-6  text-white opacity-100 backdrop-blur-[80px]`
                }
              >
                <ul className="flex flex-wrap content-center items-center justify-center gap-6  text-center">
                  {forecastData?.map((day) => (
                    <li key={day.date}>
                      {day.date.substring(8, 10)}
                      <Image
                        src={`https:${day.day.condition.icon}`}
                        alt="Icon"
                        width={30}
                        height={30}
                      />
                      {day.day.avgtemp_c}°
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}
