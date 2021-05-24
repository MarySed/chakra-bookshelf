import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { Bookshelf } from '.prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addBookToShelf } from 'utilities/utils';

const AddBookToShelfModal = ({
  isOpen,
  onClose,
  bookshelves,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookshelves: Bookshelf[];
}) => {
  const [selectedShelf, setSelectedShelf] = useState<string | undefined>(undefined);

  const router = useRouter();

  const { id } = router.query;

  const handleSubmit = async () => {
    await addBookToShelf({ bookId: id, shelfId: selectedShelf });

    return onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setSelectedShelf} value={selectedShelf}>
            <Stack>
              {bookshelves &&
                bookshelves.map((shelf) => {
                  return (
                    <Radio key={shelf.id} value={`${shelf.id}`}>
                      {shelf.name}
                    </Radio>
                  );
                })}
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit} isDisabled={!selectedShelf}>
            Add to bookshelf
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookToShelfModal;
