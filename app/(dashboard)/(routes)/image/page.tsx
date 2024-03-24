'use client'
import * as z from"zod"
import axios from 'axios'
import { Card,CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
import Heading from "@/components/heading";
import { ImageIcon, Download } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
const Imagepage=()=>{
  const router=useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
          amount: "1",
          resolution: "512x512"
        }
    });
    const [photos, setPhotos] = useState<string[]>([]);
    const isLoading=form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       try{ setPhotos([]);
       

        const response = await axios.post('/api/image', values);
  
        const urls = response.data.map((image: { url: string }) => image.url);
  
        setPhotos(urls);
        
       }catch(error:any)
       {
           toast.error("something went wrong");
           console.log(error);
       }finally{
            router.refresh();
       }
    }
    
    return(
        
    <div>
        <Heading title="Image generation"
        description="Turn your prompts into image"
        icon={ImageIcon}
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Hello picture of a horse in a bengal" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              {photos.length==0 && !isLoading && (
                <div>
                  <Empty label="The image is not generated  by you"/>
                  </div>
              )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
            </div>

        </div>
    </div>
    );
}

export default Imagepage