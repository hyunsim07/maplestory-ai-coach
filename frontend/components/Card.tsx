type CardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

export default function Card({ title, icon, children }: CardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-3 text-lg font-bold">{icon} {title}</h2>
      {children}
    </section>
  );
}
