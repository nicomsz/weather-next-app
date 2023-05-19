'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Test() {
  const [alturadiv, setAlturadiv] = useState(0)
  const [vai, setVai] = useState(true)
  const animatedDiv = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.innerWidth < 1000) {
      setAlturadiv(500)
    } else if (window.innerWidth > 1000) {
      setAlturadiv(1500)    }
    // const width = window.innerHeight
    // function responsiveHeight() {
    //   if (width < 796) {
    //     setAlturadiv(20)
    //   } else if (width < 1280) {
    //     setAlturadiv(2000)
    //   }
    // }
    // responsiveHeight()
  }, [])
  function vainvai() {
    if (vai) {
      const a = animatedDiv.current?.offsetHeight
    } else {
      setAlturadiv(2000)
      setVai(true)
    }
  }
  const [animar, setAnimar] = useState(false)
  return (
    <motion.div
      className={`h-[270px] w-full rounded-2xl border-[0.3px] border-gray-300 bg-red-500 p-4 backdrop-blur-[80px] lg:h-[420px] lg:w-[350px] lg:p-6`}
      onClick={() => setAnimar(!animar)}
      ref={animatedDiv}
      animate={
        animar
          ? { height: alturadiv + 200 }
          : {
              scale: 1,
              height: alturadiv,
            }
      }
    ></motion.div>
  )
}
