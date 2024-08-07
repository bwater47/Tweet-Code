import React from "react";
import { VStack, Checkbox, Heading } from "@chakra-ui/react";

const TagFilter = ({ tags, selectedTags, onTagChange }) => {
  return (
    <VStack align="stretch" spacing={2}>
      <Heading size="md" color='palette.white'>Filter by Tags</Heading>
      {tags.map((tag) => (
        <Checkbox
          key={tag}
          isChecked={selectedTags.includes(tag)}
          onChange={() => onTagChange(tag)}
          color='palette.white'
        >
          {tag}
        </Checkbox>
      ))}
    </VStack>
  );
};

export default TagFilter;
