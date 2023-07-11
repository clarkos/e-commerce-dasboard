import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div>
      <p>Active Store <strong>{store?.name}</strong>
    </p></div>
  )
}

export default DashboardPage