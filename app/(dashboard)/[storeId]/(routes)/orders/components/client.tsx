"use client";

import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";

import { OrderColumn, columns } from "./columns";

interface OrderClietProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClietProps> = ({ data }) => {

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data}  />
    </>
  );
};
