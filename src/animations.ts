import { Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const loopingVote = {
  initial: {
    y: 0,
  },
  animate: {
    y: -4,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2,
    },
  },
};

export const MotionFlex = motion<FlexProps>(Flex);
