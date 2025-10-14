export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h2>Test Page</h2>
      <p>ID: {id}</p>
    </div>
  );
}
