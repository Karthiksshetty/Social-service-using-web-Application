import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
  Box,
  useToast,
  Flex,
  Heading,
} from '@chakra-ui/react';
import styled from 'styled-components';
import background from '../Assets/background.png';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { saveDonation } from '../redux/donationReducer/action';
import crying_girl from '../Assets/crying_girl.png';
import Loader from '../components/Loader';
import axios from 'axios';

const Donation = () => {
  const navigation = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const { savedData, savedId, loading } = useSelector(
    store => store.donationReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const data1 = JSON.parse(localStorage.getItem('ch-token')) || {};
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: '',
    category: '',
    country: '',
    date: '',
  });
  const currentTime = new Date();

  // Chakra UI's useDisclosure hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAmountClick = amount => {
    setSelectedAmount(amount);
    onOpen();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    setFormData({ ...formData, date: currentTime.toISOString() });
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === '' ? data1.name : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Log the form data
    const updatedFormData = {
      ...formData,
      amount: selectedAmount || formData.amount,
      name: formData.name || data1.name,
    };

    // dispatch(saveDonation(updatedFormData, data1.token));
    console.log(data1, updatedFormData);
    // onClose();

    try {
      const res = await axios.post(`http://localhost:8000/payment/pay`, {
        amount: updatedFormData.amount,
      });
      console.log(res);
      payOnline(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const payOnline = async paymentData => {
    try {
      var options = {
        key: 'rzp_test_rPihDE9McASdf1', // Enter the Key ID generated from the Dashboard
        amount: paymentData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Dash Donation', //your business name
        description: 'Order payment',
        // image: Logo,
        order_id: paymentData.id,
        callback_url: '',
        redirect: false,
        handler: function (response) {
          validatePayment(response);
        },
        prefill: {
          // name: decoded.name, //your customer's name
          // email: decoded.email,
          contact: '7894561230',
        },
        // notes: {
        //   address: "Razorpay Corporate Office",
        // },
        // timeout: 5 * 60,
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        alert('Payment failed');
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const validatePayment = async data => {
    const updatedFormData = {
      ...formData,
      amount: selectedAmount || formData.amount,
      name: formData.name || data1.name,
    };

    try {
      const res = await axios.post(
        `http://localhost:8000/payment/verify`,
        data
      );
      if (res.data.response) {
        dispatch(saveDonation(updatedFormData, data1.token));
        onClose();
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // console.log(savedId);
  //   if (savedData) {
  //     localStorage.setItem('savedId', savedId);
  //     toast({
  //       title: 'Data saved',
  //       description: 'Redirecting to Organization',
  //       status: 'success',
  //       isClosable: true,
  //       duration: 4000,
  //       position: 'top',
  //     });

  //     setTimeout(() => {
  //       // navigate('/organization');
  //       navigate('/');
  //       window.location.reload();
  //     }, 4000);
  //   }
  // }, [savedData]);

  return (
    <DIV>
      <Navbar2 />
      {loading ? (
        <Loader />
      ) : (
        <Flex
          gap={'50px'}
          p={'20px'}
          direction={{
            base: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
            '2xl': 'row',
          }}
          className="mainContainer"
          bgImage={background}
        >
          <Box
            m={'auto'}
            w={{
              base: '90%',
              sm: '90%',
              md: '75%',
              lg: '55%',
              xl: '55%',
              '2xl': '55%',
            }}
          >
            <img src={crying_girl} />
          </Box>
          <Box
            p={'20px'}
            m={'auto'}
            w={{
              base: '95%',
              sm: '95%',
              md: '75%',
              lg: '45%',
              xl: '45%',
              '2xl': '45%',
            }}
          >
            <Box textAlign={'center'} className="heading-main">
              <Heading
                m={'10px 0'}
                color={{
                  base: 'blue.500',
                  sm: 'blue.500',
                  md: 'blue.500',
                  lg: 'white',
                  xl: 'white',
                  '2xl': 'white',
                }}
                fontWeight={'bold'}
                fontSize={{
                  base: '25px',
                  sm: '25px',
                  md: '25px',
                  lg: '50px',
                  xl: '50px',
                  '2xl': '50px',
                }}
              >
                DONATE TODAY
              </Heading>
            </Box>
            <div className="donation-container">
              <button onClick={() => handleAmountClick(5)}>5 INR</button>
              <button onClick={() => handleAmountClick(25)}>25 INR</button>
              <button onClick={() => handleAmountClick(50)}>50 INR</button>
              {showMore && (
                <>
                  <button onClick={() => handleAmountClick(100)}>
                    100 INR
                  </button>
                  <button onClick={() => handleAmountClick(200)}>
                    200 INR
                  </button>
                  <button onClick={() => handleAmountClick(500)}>
                    500 INR
                  </button>
                  <button onClick={() => handleAmountClick(1000)}>
                    1000 INR
                  </button>
                </>
              )}
              <Box
                _hover={{ textDecor: 'underline' }}
                cursor={'pointer'}
                className="load-more"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'show less' : 'load more'}
              </Box>
              <button onClick={() => navigation('/donationdata')}>
                Your Donation
              </button>
            </div>
            <Box
              m={'20px 0'}
              color={'blue.500'}
              fontWeight={'bold'}
              fontSize={{
                base: '25px',
                sm: '25px',
                md: '25px',
                lg: '50px',
                xl: '50px',
                '2xl': '50px',
              }}
            >
              <h1>SAVE</h1>
              <h1>THE WORLD</h1>
              <h1>TOMORROW</h1>
            </Box>
          </Box>
        </Flex>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Donation</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Your form fields and inputs */}
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  value={data1.name}
                  placeholder="Enter your name"
                  name="name"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Amount:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter the amount"
                  name="amount"
                  value={selectedAmount}
                  readOnly
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Message:</FormLabel>
                <Input
                  value={formData.message}
                  onChange={event => handleChange(event)}
                  placeholder="Enter your message"
                  name="message"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Category:</FormLabel>
                <Select
                  placeholder="Select category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                  <option value="food">Food</option>
                  <option value="indiadonation">India Donation</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Country:</FormLabel>
                <Input
                  value={formData.country}
                  onChange={event => handleChange(event)}
                  placeholder="Enter your country"
                  name="country"
                  required
                />
              </FormControl>

              {/* <FormControl mt={4}>
                                <FormLabel>Date:</FormLabel>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(event) => handleChange(event)}
                                    name="date"
                                    required
                                />
                            </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Pay
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Footer />
    </DIV>
  );
};

const DIV = styled.div`
  .donation-container {
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0.8;
    transform: 0.5s;
    transition: 0.5s;
    /* width: 60%; */

    margin: auto;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
  .donation-container button {
    background-color: #3480ef;
    opacity: 1;
    font-size: x-large;
    font-weight: 600;
    border-radius: 20px;
  }
  .heading-main {
    font-size: 60px;

    width: fit-content;
    color: #d9d9d9;
    font-weight: 600;
  }
  .heading-last {
    color: #0057b8;
    font-size: 60px;
    width: fit-content;
    text-align: end;
    width: 100%;
    font-weight: 700;
  }
  .load-more {
    /* background-color: white; */
    color: blue;
    text-align: center;
    font-size: x-large;
  }
`;

export default Donation;
