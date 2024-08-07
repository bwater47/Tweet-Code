import React from "react";
import { VStack, Flex, Checkbox, Heading } from "@chakra-ui/react";

const TagFilter = ({ tags, selectedTags, onTagChange }) => {
  return (
    <VStack align="stretch" spacing={2} mb={1}>
      <Heading size="md" color='palette.white'>Filter by Tags</Heading>
      <Flex direction={"row"} wrap='wrap'>
      {tags.map((tag) => (
        <Checkbox
        key={tag}
        isChecked={selectedTags.includes(tag)}
        onChange={() => onTagChange(tag)}
        color='palette.white'
        mr={1}
        >
          {tag}
        </Checkbox>
      ))}
      </Flex>
    </VStack>
  );
};

export default TagFilter;
