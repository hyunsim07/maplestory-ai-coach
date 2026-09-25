type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="border p-4">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
