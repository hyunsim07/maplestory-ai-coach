type CardProps = {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export default function Card({ title, icon, subtitle, action, children }: CardProps) {
  return (
    <section className="flex flex-col rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl">{icon}</span>
            <span>{title}</span>
          </h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
}
