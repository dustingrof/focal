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
} from '@mantine/core';
import { MailForward } from 'tabler-icons-react';
import { useForm } from '@mantine/form';

export default function EmailForm() {
  const [mailForwardOpened, setMailForward] = useState(false);

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
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <MailForward onClick={() => setMailForward(o => !o)} />
      <Collapse in={mailForwardOpened}>
        <form onSubmit={sendEmail}>
          <TextInput
            placeholder='Your name'
            name='name'
            type='text'
            value='SETVALUE'
            required
            hidden
          />
          <TextInput
            placeholder='Your email'
            label='Email Address'
            name='email'
            type='email'
            required
          />

          <TextInput
            placeholder='What should we discuss?'
            label='Subject'
            name='subject'
            type='text'
            required
          />

          <Textarea
            placeholder='Enter a message here'
            label='Your message'
            name='message'
            type='text'
            required
          />
          <Button type='submit' className='btn btn-info' value='Send Message'>
            Submit
          </Button>
          
        </form>
      </Collapse>
    </Box>
  );
}
