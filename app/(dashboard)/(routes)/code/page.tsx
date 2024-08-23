 'use client'
// import * as z from"zod"
// import axios from 'axios'
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { formSchema } from "./constant";
// import Heading from "@/components/heading";
// import ReactMarkdown from 'react-markdown';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import OpenAI from "openai";
// import { Empty } from "@/components/Empty";
// import { Loader } from "@/components/Loader";
// import { cn } from "@/lib/utils";
// import { UserAvatar } from "@/components/user-avatat";
// import { BotAvatar } from "@/components/bot-avatar";
// import { Code } from "lucide-react";
// import toast from "react-hot-toast";

// const Codepage=()=>{
//   const router=useRouter();
//   const [messages,setmeesages]=useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           prompt: ""
//         }
//     });

//     const isLoading=form.formState.isSubmitting;

//     const onSubmit=async(values:z.infer<typeof formSchema>)=>{
//        try{
//         const userMessage: OpenAI.Chat.ChatCompletionMessageParam = { role: "user", content: values.prompt };
//         const newMessages = [...messages, userMessage];

//         const response=await axios.post("/api/code",
//         {
//            messages:newMessages
//         })
//         setmeesages((current) => [...current,userMessage,response.data]);

//       form.reset();
//        }catch(error:any)
//        {
//            toast.error("something went wrong")
//            console.log(error);
//        }finally{
//             router.refresh();
//        }
//     }
    
//     return(
        
//     <div>
//         <Heading title="Code Generation"
//         description="Our most advanced code genearation model."
//         icon={Code}
//         iconColor="text-green-500"
//         bgColor="bg-green-700/10"/>
//         <div className="px-4 lg:px-8">
//             <div>
//                 <Form {...form}>
//                    <form onSubmit={form.handleSubmit(onSubmit)}
//                    className="rounded-lg
//                    border w-full p-4 px-3 md:px-3 focus-within:shadow-sm grid grid-cols-12 gap-2">
//                      <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading} 
//                         placeholder="Simple Toggle Button in react js" 
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
//                 Generate
//               </Button>
//                    </form>
//                 </Form>
//             </div>
//             <div className="space-y-4 mt-4">
//               {
//                 isLoading && (
//                   <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//                     <Loader/>
//                     </div>
//                 )
//               }
//               {messages.length==0 && !isLoading && (
//                 <div>
//                   <Empty label="The chat is not yet started by you"/>
//                   </div>
//               )}
//              <div className="flex flex-col-reverse gap-y-4">
//               {messages.map((message)=>(
//                  <div className= {cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role=="user"?"bg-white borderblack/10":"bg-muted")}key={typeof message.content === "string" ? message.content : "Unsupported message format"}>
//                   {message.role=="user"?<UserAvatar/>:<BotAvatar/>}
                  
//                   <ReactMarkdown components={{
//                   pre: ({ node, ...props }) => (
//                     <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
//                       <pre {...props} />
//                     </div>
//                   ),
//                   code: ({ node, ...props }) => (
//                     <code className="bg-black/10 rounded-lg p-1" {...props} />
//                   )
//                 }} className="text-sm overflow-hidden leading-7">
//                  {typeof message.content === "string" ? message.content : "Unsupported message format"}
//                 </ReactMarkdown>
                  
                    
                    
//                   </div>

//               ))}
//              </div>
//             </div>

//         </div>
//     </div>
//     );
// }

// export default Codepage

import React, { useState } from 'react';
import * as z from "zod";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constant";
import Heading from "@/components/heading";
import ReactMarkdown from 'react-markdown';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatat";
import { BotAvatar } from "@/components/bot-avatar";
import { Code } from "lucide-react";
import toast from "react-hot-toast";

// Define a type for messages compatible with the Gemini API
interface GeminiMessage {
  role: 'user' | 'assistant'; // Assuming Gemini uses similar roles
  content: string;
}

const Codepage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: GeminiMessage = { role: 'user', content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages
      });

      // Assume the response from API follows the same message structure
      setMessages([...newMessages, { role: 'assistant', content: response.data.code }]);

      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our most advanced code generation model."
        icon={Code}
        iconColor="text-green-500"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-3 focus-within:shadow-sm grid grid-cols-12 gap-2">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Simple Toggle Button in react js"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="The chat is not yet started by you" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white borderblack/10" : "bg-muted")} key={index}>
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  )
                }} className="text-sm overflow-hidden leading-7">
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Codepage;
