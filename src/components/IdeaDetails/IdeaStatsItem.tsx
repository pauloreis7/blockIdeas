import { Flex, Icon, Text } from "@chakra-ui/react";
import { ElementType } from "react";

type IdeaStatsItemProps = {
  icon: ElementType;
  title: string;
  value: string;
  color: string;
  onClick?: () => void
};

export function IdeaStatsItem({
  icon,
  title,
  value,
  color,
  onClick
}: IdeaStatsItemProps) {
  return (
    <Flex w="100%" alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Icon as={icon} mr="2" fontSize="2xl" color={color} onClick={onClick} />

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
