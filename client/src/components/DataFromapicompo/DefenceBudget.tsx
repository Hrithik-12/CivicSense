import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

interface Record {
  _year: string;
  annual_defence_budget_in_cr_: string;
  defence_r_d_budget_in_cr_: string;
  percentage_of_drdo_budget_to_defence_outlay: string;
}

const fetchDefenceData = async () => {
  const res = await axios.get(
    'https://api.data.gov.in/resource/ee2b4024-eeae-49f6-b57e-742e14982339?api-key=579b464db66ec23bdd000001a4ca219ac0f34646682f102b13c15247&format=json'
  );
  return res.data.records as Record[];
};

const DefenceBudgetChart: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['defenceBudget'],
    queryFn: fetchDefenceData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading data.</p>;

  const chartData = data.map((item) => ({
    year: item._year,
    total: parseFloat(item.annual_defence_budget_in_cr_),
    drdo: parseFloat(item.defence_r_d_budget_in_cr_),
    percentage: parseFloat(item.percentage_of_drdo_budget_to_defence_outlay),
  }));

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        DRDO Budget vs Defence Budget (₹ Cr)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="total"
            fill="#8884d8"
            name="Total Defence Budget"
          />
          <Bar
            yAxisId="left"
            dataKey="drdo"
            fill="#82ca9d"
            name="DRDO Budget"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="percentage"
            stroke="#ff7300"
            dot
            name="% of DRDO Budget"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DefenceBudgetChart;
