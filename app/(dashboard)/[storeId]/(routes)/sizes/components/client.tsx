"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { ApiList } from "@/components/ui/api-list";

import { SizeColumn, columns } from "./columns";

interface SizeClietProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClietProps> = ({
  data
}) => {

  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />
    
      <Heading title="API" description="API endpoints for sizes" />
      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
