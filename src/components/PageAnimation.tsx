import { motion } from 'framer-motion';

export const blur = (delay: number = 0, enabled: boolean = true) => {

  if (!enabled) {
    return {}
  }

  return {
    initial: {
      opacity: 0,
      filter: `blur(50rem)`,
    },
    enter: {
      opacity: 1,
      filter: `blur(0)`,
      transition: {
        filter: {
          delay,
          duration: .1 * 2.5
        },
        opacity: {
          delay,
          duration: .15 * 2.5
        }
      }
    },
    exit: {
      opacity: 0,
      filter: `blur(1rem)`,
      transition: {
        filter: {
          duration: .1 * 2.5
        },
        opacity: {
          duration: .15 * 2.5
        }
      }
    }
  }
}


export const start = .4;
export const delay = 0.1;
export const getTime = (i: number) => {
  return start + i * delay;
}

export const anim = (variants: any) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants
  }
}

export function PageAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...anim(blur())} >
      {children}
    </motion.div>
  )
}
