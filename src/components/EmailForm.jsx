import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Textarea,
  Collapse,
  Space
} from '@mantine/core';
import { showNotification } from '@mantine/notifications'
import { MailForward } from 'tabler-icons-react';
import { useForm } from '@mantine/form';

export default function EmailForm(props) {
  // const [mailForwardOpened, setMailForward] = useState(false);



  function sendEmail(e) {




    e.preventDefault();

    emailjs
      .sendForm(
        'service_we1l6z4',
        'template_uo04hrp',
        e.target,
        'o9qqYklc_7AmMNiC6'
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box mx='auto'>
      {/* <MailForward onClick={() => setMailForward(o => !o)} /> */}
      {/* <Collapse in={mailForwardOpened}> */}
      <form onSubmit={sendEmail}>
        {/* Hidden from front, gets current username and enters it */}
        <TextInput
          placeholder='Your name'
          name='name'
          type='text'
          value={props.currentUser}
          required
          hidden
        />
        <Space h='md' />
        <TextInput
          placeholder='Enter recipient email address'
          label='Who would you like to email?'
          name='email'
          type='email'
          required
        />
        <Space h='md' />
        <TextInput
          placeholder='What should we discuss?'
          label='Subject'
          name='subject'
          type='text'
          defaultValue={props.taskName}
          required
        />
        <Space h='md' />
        <Textarea
          placeholder='Enter a message here'
          label='Your message'
          name='message'
          type='text'
          required
        />
        <Space h='md' />
        <Button
          type='submit'
          className='btn btn-info'
          value='Send Message'
          onClick={() =>
            showNotification({
              title: 'Email sent!',
            }) }>
            Submit
        </Button>
    </form>
      {/* </Collapse> */ }
    </Box >
  );
}
