import React, { useEffect, useState } from 'react';
import {
  Box,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Heading,
  Table,
  Button,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import Loader from './Loader';

import { getOrganizations } from '../redux/AdminReducer/action';
import axios from 'axios';

const AdminOrganization = () => {
  const dispatch = useDispatch();
  const { orgs, isError, isLoading } = useSelector(store => store.adminReducer);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // dispatch(getOrganizations());
    fetchListDonors();
  }, []);

  const fetchListDonors = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/donar/list`);
      setDonors(res.data);
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      p="20px 60px 20px 20px"
      > */}
      <Box w="95%" borderRadius="10px" m="40px auto" p="20px" bg="white">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" size="sm">
            All Donors
          </Heading>
          {/* <Heading as="h3" size="md">
            ...
          </Heading> */}
        </Flex>

        {/* <Table></Table> */}
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Name</Th>
                <Th textAlign={'center'}>Amount</Th>
                <Th textAlign={'center'}>Category</Th>

                <Th textAlign={'center'}>Message</Th>
                <Th textAlign={'center'}>Country</Th>
              </Tr>
            </Thead>
            <Tbody>
              {donors
                .map((el, i) => {
                  return (
                    <Tr key={i} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                      <Td textAlign={'center'}>{el.name}</Td>
                      <Td textAlign={'center'}>{el.amount}</Td>
                      <Td textAlign={'center'}>{el.category}</Td>
                      <Td textAlign={'center'}>{el.message}</Td>
                      <Td textAlign={'center'}>{el.country}</Td>
                      {/* <Td textAlign={'center'}>
                        <Button>Delete</Button>
                      </Td> */}
                    </Tr>
                  );
                })
                .reverse()}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default AdminOrganization;
