"use client"

import * as z from "zod";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Form } from "@/components/ui/form";


interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1)
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title="Settings"
          description="Manage store preferences"
        />
        <Button 
          variant="destructive"
          size="sm"
          onClick={() => {}}
        >
          <Trash className="h4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>

      </Form>
    </>
  )
}

export default SettingsForm