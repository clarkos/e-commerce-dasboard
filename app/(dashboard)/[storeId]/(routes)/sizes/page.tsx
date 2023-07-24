import prismadb from '@/lib/prismadb';
import { SizeClient } from './components/client';
import { SizeColumn } from './components/columns';
import { format } from "date-fns";

const SizesPage = async ({
  params
}: { params: { storeId: string}}) => {

  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const FormattedSizes: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <SizeClient data={FormattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage