type EmptyStateProps = {
  icon: React.ReactNode;
  message: string;
};

export default function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 px-6 py-10 text-center">
      <span className="text-5xl">{icon}</span>
      <p className="whitespace-pre-line text-sm text-gray-500">{message}</p>
    </div>
  );
}
