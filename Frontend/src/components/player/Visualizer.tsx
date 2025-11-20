"use client"

import { motion } from "framer-motion"

export function Visualizer({ isPlaying }: { isPlaying: boolean }) {
  // Create 32 bars for the visualizer
  const bars = Array.from({ length: 32 })

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-[500px] h-[500px] rounded-full">
        {bars.map((_, i) => {
          const rotation = (i / bars.length) * 360
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 bg-white/20 rounded-full origin-bottom"
              style={{
                height: "60px",
                rotate: `${rotation}deg`,
                translateX: "-50%",
                translateY: "-50%", // Center anchor
                marginTop: "-220px", // Push out from center
              }}
              animate={
                isPlaying
                  ? {
                      height: [40, Math.random() * 100 + 40, 40],
                      opacity: [0.3, 0.8, 0.3],
                    }
                  : { height: 20, opacity: 0.1 }
              }
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Visualizer
