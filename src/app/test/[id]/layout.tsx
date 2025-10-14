export default async function TestLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Test Layout</h1>
      <p>ID: {id}</p>
      {children}
    </div>
  );
}
