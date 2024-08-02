'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import useConversations from '@/hooks/useConversations'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonal } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'
import { toast } from 'sonner'
import { z } from 'zod'

const messageSchema = z.object({
  message: z.string().min(1, {message: "This field can't be empty"})
})
const ConversationInput = () => {
    const {conversationId} = useConversations()
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const {data:session} = useSession()
    const userId = session?.user.id

    const form = useForm<z.infer<typeof messageSchema>>({
      resolver: zodResolver(messageSchema),
      defaultValues:{
        message: ""
      }
    })

    const onSubmit = async (values: z.infer<typeof messageSchema>) => {

      const data = {...values, conversationId, userId}
      try{
          await fetch("/api/messages", {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          },
          
        )
        .then((response) => {
          if(!response.ok){
            toast.error(response.statusText)
            return
          }
          return response.json()
        })
        .then((value)=> {
          form.reset()
          console.log("value", value)
        })
      }catch(error){
        console.error("Error", error)
      }
    }

    const onChange = (event: any) => {
      const {value, selectionStart} = event.target

      if(!selectionStart !== null){
        form.setValue("message", value)
      }
    }
  return (
    <Card className=' bg-gray-200 dark:bg-black p-2 w-[calc(100%_-_6rem)] ml-16 lg:!ml-[24rem] lg:w-[calc(100%_-_25rem)] rounded-lg flex gap-2 fixed bottom-0'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center w-full justify-between'>
          <FormField
            control={form.control}
            name='message'
            render={({field}) => (
              <FormItem>
                <FormControl>
                <TextareaAutosize {...field} onKeyDown={async (event) => {if( event.key === "Enter" && !event.shiftKey){ event.preventDefault(); await form.handleSubmit(onSubmit)()}}} onChange={onChange} onClick={onChange} rows={1} maxRows={4} placeholder='Type your message..' className='outline-none no-scrollbar border-0 bg-transparent dark:bg-black p-1 text-black dark:text-white resize-none w-full'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          
          <div className='flex items-end'>
              <Button size={'icon'} type='submit' className='bottom-0 right-0 ' disabled={form.formState.isSubmitting}><SendHorizonal color='white'/></Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ConversationInput