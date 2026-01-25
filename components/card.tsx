import { Card } from "@heroui/react";

export const CardComponent = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <Card className="w-[240px] gap-3 p-6 backdrop-blur-sm bg-surface/80 border-2 border-border/50 shadow-2xl hover:shadow-accent-soft-hover transition-all duration-300">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <Card.Header className="text-center">
        <Card.Title className="text-xl font-bold tracking-tight">{title}</Card.Title>
        <Card.Description className="text-base font-medium mt-2">{description}</Card.Description>
      </Card.Header>
    </Card>
  );
};
