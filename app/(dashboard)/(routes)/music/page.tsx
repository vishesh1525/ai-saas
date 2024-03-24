'use client'
import * as z from"zod"
import axios from 'axios'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constant";
import Heading from "@/components/heading";
import { MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from "openai";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatat";
import { BotAvatar } from "@/components/bot-avatar";

const Musicpage=()=>{
  const router=useRouter();
  const [music,setmusic]=useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });

    const isLoading=form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       try{
        setmusic(undefined);

        const response=await axios.post("/api/music",values)
        setmusic(response.data.audio)

      form.reset();
       }catch(error:any)
       {
           console.log(error);
       }finally{
            router.refresh();
       }
    }
    
    return(
        
    <div>
        <Heading title="Music"
        description="Our most advanced music generation model."
        icon={Music}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"/>
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)}
                   className="rounded-lg
                   border w-full p-4 px-3 md:px-3 focus-within:shadow-sm grid grid-cols-12 gap-2">
                     <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="piano music" 
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
              {
                isLoading && (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader/>
                    </div>
                )
              }
              {!music && !isLoading && (
                <div>
                  <Empty label="No music is generated"/>
                  </div>
              )}
             {music && <audio controls
             className="w-full mt-8">
              <source src={music}></source></audio>}
            </div>

        </div>
    </div>
    );
}

export default Musicpage