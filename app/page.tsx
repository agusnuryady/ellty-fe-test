import { SelectPages } from '@/components/SelectPage';

export default function Home() {
  const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Ellty</h1>
      <p className="text-gray-600 mb-6">Here the Component</p>
      <SelectPages pages={pages} />
    </div>
  );
}
