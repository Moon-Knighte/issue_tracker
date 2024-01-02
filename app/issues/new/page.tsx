"use client"

import  { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
const [error, setError ] = useState('');

interface IssueForm{
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = 
  useForm<IssueForm>();
 
  return (
    <div className='max-w-xl'>
      { error && (
        <Callout.Root color='red' className='mb-6'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    <form 
    className=' space-y-4' 
    onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
       setError('Unexpected error occured.')
        
      }
    })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <Controller
        name='description'
        control={control}
        render={( field ) => <SimpleMDE 
          placeholder='Description' {...field}/> }
        />
       
        <Button>Submit New Issue</Button>
    </form></div>
  )
}

export default NewIssuePage