import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Record {
  scheme: string;
  actuals_2020_2021: number | string;
  budget_2021_2022: number | string;
  revised_2021_2022: number | string;
  budget_2022_2023: number | string;
}

const fetchTaxRevenue = async () => {
  const res = await axios.get(
    'https://api.data.gov.in/resource/94e1013d-3acb-44ba-9a05-3cf709e67382?api-key=579b464db66ec23bdd000001ad8e07d88e4847dd555c7596e7a8f50a&format=json'
  );
  return res.data.records as Record[];
};

const formatValue = (value: number | string) =>
  typeof value === 'number' ? value / 1000 : null;

const TaxRevenueChart: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['taxRevenue'],
    queryFn: fetchTaxRevenue,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading data.</p>;

  const processedData = data
    .filter((d) => d.scheme !== 'NA')
    .map((d) => ({
      scheme: d.scheme,
      '2020-21': formatValue(d.actuals_2020_2021),
      '2021-22 Budget': formatValue(d.budget_2021_2022),
      '2021-22 Revised': formatValue(d.revised_2021_2022),
      '2022-23': formatValue(d.budget_2022_2023),
    }));

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Tax Revenue by Scheme (in ₹ Crores, scaled x1000)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData}>
          <XAxis dataKey="scheme" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="2020-21" fill="#8884d8" />
          <Bar dataKey="2021-22 Budget" fill="#82ca9d" />
          <Bar dataKey="2021-22 Revised" fill="#ffc658" />
          <Bar dataKey="2022-23" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaxRevenueChart;
