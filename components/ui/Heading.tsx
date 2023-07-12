
interface HeadingPageProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingPageProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-small text-muted-foreground">{description}</p>
    </div>
  );
};