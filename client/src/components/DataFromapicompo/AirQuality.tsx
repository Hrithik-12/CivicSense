import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type AQIRecord = {
  pollutant_id: string;
  avg_value: string;
};

const API_KEY = "579b464db66ec23bdd000001a4ca219ac0f34646682f102b13c15247";
const API_URL = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${API_KEY}&format=json&limit=100`;

const AirQualityBarChart: React.FC = () => {
  const [data, setData] = useState<AQIRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        // Aggregate average pollutant values by pollutant_id
        const records = json.records || [];

        // Aggregate avg_value (convert to number)
        const aggMap: Record<string, { sum: number; count: number }> = {};

        records.forEach((rec: AQIRecord) => {
          const pollutant = rec.pollutant_id;
          const avg = parseFloat(rec.avg_value);
          if (!isNaN(avg)) {
            if (!aggMap[pollutant]) {
              aggMap[pollutant] = { sum: 0, count: 0 };
            }
            aggMap[pollutant].sum += avg;
            aggMap[pollutant].count += 1;
          }
        });

        // Prepare chart data
        const chartData = Object.entries(aggMap).map(([pollutant, val]) => ({
          pollutant,
          avg_value: +(val.sum / val.count).toFixed(2),
        }));

        setData(chartData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching AQI data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading chart...</div>;

  if (data.length === 0) return <div>No data to display.</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pollutant" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg_value" fill="#8884d8" name="Avg Pollutant Value" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AirQualityBarChart;
