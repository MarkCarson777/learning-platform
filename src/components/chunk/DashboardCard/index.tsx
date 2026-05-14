type DashboardCardProps = {
  count: number;
  label: string;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  count,
  label,
}) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-4">
      <span>{count}</span>
      <span>{label}</span>
    </div>
  );
};
