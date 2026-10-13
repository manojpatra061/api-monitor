import { MonitorDetail } from "./MonitorDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MonitorDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <MonitorDetail id={id} />
    </>
  );
}
