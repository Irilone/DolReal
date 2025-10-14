export default function TestLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <h1>Test Layout</h1>
      <p>ID: {params.id}</p>
      {children}
    </div>
  );
}
