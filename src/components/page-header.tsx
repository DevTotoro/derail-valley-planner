interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, description, actions }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">{title}</h1>
        <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">{description}</p>
      </div>

      {actions && <div className="flex gap-2 pt-2">{actions}</div>}
    </div>
  );
};
