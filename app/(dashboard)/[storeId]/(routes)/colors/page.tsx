import prismadb from '@/lib/prismadb';
import { ColorClient } from './components/client';
import { ColorColumn } from './components/columns';
import { format } from "date-fns";

const ColorsPage = async ({
  params
}: { params: { storeId: string}}) => {

  const color = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const FormattedColors: ColorColumn[] = color.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ColorClient data={FormattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage