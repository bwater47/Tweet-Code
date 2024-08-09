import { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphQL/mutations";

export const UpdateProfile = ({ isOpen, onClose, user, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Here you would typically upload the image file to your server or a cloud storage service
      // and get back a URL to store in the database. For this example, we'll assume a direct update.
      const result = await updateUser({
        variables: {
          username: editedUser.username,
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          avatar: editedUser.avatar, // This should be the URL of the uploaded image
        },
      });
      onClose();
      refetch();
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                display="none"
              />
              <Button onClick={() => fileInputRef.current.click()}>
                Choose File
              </Button>
              {editedUser.avatar && (
                <Image
                  src={editedUser.avatar}
                  alt="Avatar preview"
                  boxSize="100px"
                  mt={2}
                />
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={editedUser.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={editedUser.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

UpdateProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};