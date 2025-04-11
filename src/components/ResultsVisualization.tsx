
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ResultsVisualizationProps {
  probability: number;
}

export const ResultsVisualization = ({ probability = 0 }: ResultsVisualizationProps) => {
  const data = [
    { name: "Risk", value: probability },
    { name: "Safe", value: 100 - probability }
  ];

  const COLORS = ["#f97316", "#16a34a"];

  return (
    <Card className="w-full max-w-md p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-center">Risk Assessment</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">
          Probability of Heart Disease:
          <span className={`ml-2 ${probability > 50 ? "text-secondary" : "text-primary"}`}>
            {probability}%
          </span>
        </p>
      </div>
    </Card>
  );
};
