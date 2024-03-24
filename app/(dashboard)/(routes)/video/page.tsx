'use client'
import * as z from"zod"
import axios from 'axios'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constant";
import Heading from "@/components/heading";
import { MessageSquare, Music, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from "openai";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";


const Videopage=()=>{
  const router=useRouter();
  const [video,setvideo]=useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });

    const isLoading=form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       try{
        setvideo(undefined);

        const response=await axios.post("/api/video",values)
        setvideo(response.data[0])

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
        <Heading title="Video generation"
        description="Our most advanced video generation model."
        icon={Video}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"/>
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
                        placeholder="lion hunting video" 
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
              {!video && !isLoading && (
                <div>
                  <Empty label="No music is generated"/>
                  </div>
              )}
             {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}
            </div>

        </div>
    </div>
    );
}

export default Videopage