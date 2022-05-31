import { Flex, Icon, Text } from "@chakra-ui/react";
import { ElementType } from "react";

type IdeaStatsItemProps = {
  icon: ElementType;
  title: string;
  value: number | string;
  color: string;
  onClick?: () => void;
  cursor?: boolean;
  hover?: boolean;
};

export function IdeaStatsItem({
  icon,
  title,
  value,
  color,
  onClick,
  cursor,
  hover,
}: IdeaStatsItemProps) {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
    >
      <Flex alignItems="center">
        <Icon
          as={icon}
          mr="2"
          cursor={(cursor && "pointer") || "auto"}
          fontSize="2xl"
          color={color}
          onClick={onClick}
          borderRadius="md"
          transition='background 200ms ease'
          _hover={{
            bgColor: hover ? "gray.700" : "transparent",
          }}
        />

        <Text fontSize="lg" color="gray.400" textTransform="capitalize">
          {title}
        </Text>
      </Flex>

      <Text w="100%" maxWidth="12rem" textAlign="left" color="gray.100">
        {value}
      </Text>
    </Flex>
  );
}
