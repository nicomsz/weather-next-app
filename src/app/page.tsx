'use client'
import Background from './components/Backgrounds/Background'
import AppBg from './components/Backgrounds/AppBg'
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
export default function Home() {
  const [location, setLocation] = useState({})
  const [animar, setAnimar] = useState(false)
  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])
  console.log(location)
  return (
    <>
      <div className="z-[-1] flex h-screen flex-row items-center justify-center">
        <div className="absolute z-10 mx-auto h-[700px] w-[300px] rounded-[30px] lg:h-[700px] lg:w-[400px]">
          <AppBg />

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
                  <p>Oslo</p>
                  <p>Norway</p>
                </div>
                <div className="">
                  <CloudRain size={50} color="#fff" weight="duotone" />
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className={`${poppins.className} text-7xl lg:text-8xl`}>
                  16°
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
