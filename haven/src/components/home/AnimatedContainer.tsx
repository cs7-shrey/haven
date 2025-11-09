"use client"
import { motion } from "motion/react";

interface Props {
    className: string;
    yOffset: number;
    duration: number;
    children: React.ReactNode | string
}

const AnimatedContainer: React.FC<Props> = ({ className, yOffset, duration, children}) => {
  return (
          <motion.div className={className}
            initial={{opacity: 0, y: yOffset}}
            animate={{opacity: 1, y: 0}}
            transition={{duration, ease: "easeInOut"}}
          >
            {children}
          </motion.div>
  )
}

export default AnimatedContainer;
