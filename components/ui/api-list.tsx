"use client"

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/useOrigin";
import { ApiAlert } from "@/components/ui/ApiAlert";

interface ApiLisProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiLisProps> = ({
  entityName,
  entityIdName
}) => {

  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert 
        title="GET all"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="GET unique"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      
    </>
  )
}