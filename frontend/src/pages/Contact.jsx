import React, { useState } from 'react';
import { styled } from 'styled-components';
import background from '../Assets/background.png';
import { Box, Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import axios from 'axios';

function Contact() {
  const [fieldData, setFieldData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/contact/admin`,
        fieldData
      );
      setFieldData({
        ...fieldData,
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DIV>
      <h1 className="fHead">CONTACT US</h1>
      <Box
        className="contact-form"
        bgImage={background}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
      >
        <form onSubmit={handleSubmit}>
          <div className="nameEmail">
            <Input
              color={'black.300'}
              className="inputBox"
              placeholder="Name"
              onChange={e =>
                setFieldData({ ...fieldData, name: e.target.value })
              }
              value={fieldData.name}
              required
            />
            <Input
              className="inputBox"
              placeholder="Email"
              onChange={e =>
                setFieldData({ ...fieldData, email: e.target.value })
              }
              value={fieldData.email}
              required
            />
          </div>
          <Input
            className="inputBox"
            placeholder="Subject"
            onChange={e =>
              setFieldData({ ...fieldData, subject: e.target.value })
            }
            value={fieldData.subject}
            required
          />
          <Input
            fontSize={'30px'}
            color="black"
            height={'400px'}
            className="msg"
            placeholder="Message"
            onChange={e =>
              setFieldData({ ...fieldData, message: e.target.value })
            }
            value={fieldData.message}
            required
          />
          <Button className="btnSend" type="submit">
            SEND
          </Button>
        </form>
      </Box>
    </DIV>
  );
}

const DIV = styled.div`
  width: 90%;
  margin: auto;
  /* border: grey solid 2px; */
  .nameEmail {
    display: flex;
    gap: 40px;
  }
  .fHead {
    font-size: 40px;
    font-weight: 700;
  }
  .btnSend {
    background-color: #3574e2;
    color: white;
    margin: 30px 0;
    display: flex;
    padding: 30px;
    font-size: larger;
    /* justify-content: end; */
  }
  .inputBox {
    margin: 20px 0;
    height: 80px;
    font-size: 30px;
    /* color: black; */
  }
  .contact-form {
    padding: 50px;
    border: white solid 1px;
    border-radius: 40px;
  }
  @media only screen and (max-width: 1024px) {
    .fHead {
      font-size: 30px;
      font-weight: 500;
      margin-left: 10px;
    }
    .contact-form {
      border-radius: 20px;

      padding: 20px;
    }
    .nameEmail {
      flex-direction: column;
      gap: 10px;
    }
    .inputBox {
      font-size: medium;
      height: 40px;
    }
    .msg {
      height: 150px;
      font-size: medium;
    }
    .btnSend {
      background-color: #3574e2;
      color: white;
      margin: 10px 0;
      display: flex;
      padding: 10px;
      font-size: medium;
      /* justify-content: end; */
    }
    /* background-color: #3574e2; */
  }
`;

export default Contact;
