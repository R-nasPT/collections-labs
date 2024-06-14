export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
      {children}
    </button>
  );
}
