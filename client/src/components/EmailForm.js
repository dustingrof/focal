import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function EmailForm() {
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
    <div>
      <div className='container'>
        <form onSubmit={sendEmail}>
          <div className='row pt-5 mx-auto'>
            <div className='col-8 form-group mx-auto'>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                name='name'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <input
                type='email'
                className='form-control'
                placeholder='Email Address'
                name='email'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <input
                type='text'
                className='form-control'
                placeholder='Subject'
                name='subject'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <textarea
                className='form-control'
                id=''
                cols='30'
                rows='8'
                placeholder='Your message'
                name='message'></textarea>
            </div>
            <div className='col-8 pt-3 mx-auto'>
              <input
                type='submit'
                className='btn btn-info'
                value='Send Message'></input>
            </div>
          </div>
        </form>
      </div>

      <Box sx={{ maxWidth: 300 }} mx='auto'>
        <form onSubmit={form.onSubmit(values => console.log(values))}>
          <TextInput
            required
            label='Email'
            placeholder='your@email.com'
            name={'testname'}
            {...form.getInputProps('email')}
          />

          <Checkbox
            mt='md'
            label='I agree to sell my privacy'
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group position='right' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
