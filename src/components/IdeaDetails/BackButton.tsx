import { Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const BACK_LINK_HREF = "/";

export function BackButton() {
  return (
    <Link href={BACK_LINK_HREF} passHref>
      <Button
        leftIcon={<Icon as={FiArrowLeft} color="gray.300" />}
        maxW="4xl"
        mr="auto"
        color="gray.200"
        backgroundColor="transparent"
        fontWeight="400"
        _hover={{
          backgroundColor: "whiteAlpha.100",
          filter: "brightness(0.9)",
        }}
        _focus={{
          outlineColor: "gray.600",
        }}
      >
        Back to board
      </Button>
    </Link>
  );
}
