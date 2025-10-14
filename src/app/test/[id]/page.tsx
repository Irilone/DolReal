export default function TestPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2>Test Page</h2>
      <p>ID: {params.id}</p>
    </div>
  );
}
