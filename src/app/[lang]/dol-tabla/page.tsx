import { LocalizedHome } from '@/components/features/LocalizedHome';

export default async function DolTablaLocalePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <LocalizedHome lang={lang} />;
}
