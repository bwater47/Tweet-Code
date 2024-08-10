import { useState, useRef, useEffect } from "react";
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

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection and set the preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setEditedUser((prev) => ({ ...prev, avatar: previewUrl }));
    }
  };

  // Clean up the object URL when the component unmounts or the avatar changes
  useEffect(() => {
    return () => {
      if (editedUser.avatar && avatarFile) {
        URL.revokeObjectURL(editedUser.avatar);
      }
    };
  }, [avatarFile, editedUser.avatar]);

  // Handle form submission and mutation
  const handleSave = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          username: editedUser.username,
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          avatar: avatarFile, // Pass the File object directly
        },
      });

      if (data?.updateUser) {
        onClose();
        refetch();
        toast({
          title: "Profile updated",
          description:
            "Your profile information has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("No data returned from mutation");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description:
          err.message || "Failed to update profile. Please try again.",
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
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input
                id="avatar"
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
