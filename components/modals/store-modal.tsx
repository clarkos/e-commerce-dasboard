"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "The Store Name must be at least 2 characters.",
  }),
});

export const StoreModal = () => {

  const [loading, setLoading] = useState(false)
  
  const storeModal= useStoreModal();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal 
      title="Store Form" 
      description="A future create store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={loading}
                          placeholder="E-commerce" 
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="py-6 space-x-2 flex items-center justify-end">
                  <Button 
                    disabled={loading}
                    variant="outline" 
                    onClick={storeModal.onClose}>
                      Cancel
                  </Button>
                  <Button 
                    disabled={loading}
                    type="submit">
                      Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
    </Modal>
  )
};
