
import { Wrap, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

const TagDisplay = ({ tags, onRemoveTag }) => {
  return (
    <Wrap spacing={2} mt={2}>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          size="md"
          borderRadius="full"
          variant="solid"
          colorScheme="cyan"
        >
          <TagLabel>{tag}</TagLabel>
          <TagCloseButton onClick={() => onRemoveTag(index)} />
        </Tag>
      ))}
    </Wrap>
  );
};

export default TagDisplay;
