import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Toast,
  Tr,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Events = () => {
  const toast = useToast();
  const [eventList, setEventList] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    eventname: '',
    description: '',
    amount: '',
    location: '',
  });

  useEffect(() => {
    fetchEventList();
  }, []);

  const fetchEventList = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/event/list`);
      if (res.data.code === 200) {
        setEventList(res.data.data);
      } else {
        toast({
          description: res.data.message,
          status: 'error',
          isClosable: true,
          duration: 4000,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        description: error,
        status: 'error',
        isClosable: true,
        duration: 4000,
        position: 'top',
      });
    }
  };

  const handleAddEventModal = () => {
    setModal(true);
  };

  const handleSubmit = async () => {
    console.log(data);

    if (
      data.eventname != '' &&
      data.description != '' &&
      data.amount != '' &&
      data.location != ''
    ) {
      // console.log('pass');
      const res = await axios.post(`http://localhost:8000/event/add`, data);
      console.log(res);
      if (res.data.code === 200) {
        fetchEventList();
        setModal(false);
      } else {
        toast({
          description: res.data.message,
          status: 'error',
          isClosable: true,
          duration: 4000,
          position: 'top',
        });
      }
    } else {
      // console.log('fail');
      alert('All fields must be filled');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleAddEventModal}
          style={{
            backgroundColor: '#0158B8',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '8px',
          }}
        >
          Add Event
        </button>
      </div>

      <TableContainer
        bg="white"
        style={{ marginTop: '15px', borderRadius: '8px' }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>Event Name</Th>
              <Th textAlign={'center'}>Description</Th>
              <Th textAlign={'center'}>Amount</Th>
              <Th textAlign={'center'}>Location</Th>
              <Th textAlign={'center'}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventList.map(el => {
              return (
                <Tr key={el._id} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                  <Td textAlign={'center'}>{el.eventname}</Td>
                  <Td textAlign={'center'}>{el.description}</Td>
                  <Td textAlign={'center'}>{el.amount}</Td>
                  <Td textAlign={'center'}>{el.location}</Td>
                  <Td textAlign={'center'}>{el.date}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={modal}
        onClose={() => setModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Event name"
                type="text"
                onChange={e => setData({ ...data, eventname: e.target.value })}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Description"
                type="text"
                onChange={e =>
                  setData({ ...data, description: e.target.value })
                }
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder="Amount"
                type="number"
                onChange={e => setData({ ...data, amount: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder="Location"
                type="text"
                onChange={e => setData({ ...data, location: e.target.value })}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Events;
