"use client"

import  { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { Button, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface IssueForm{
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = 
  useForm<IssueForm>();
 
  return (
    <form 
    className='max-w-xl space-y-4' 
    onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if(error.response){
          // The server responded with an error status
          console.error('Response data:', error.response.data);
          // Handle validation errors or other specific errors
        }  else {
          console.error('Error message:', error.message);
        }}
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
    </form>
  )
}

export default NewIssuePage