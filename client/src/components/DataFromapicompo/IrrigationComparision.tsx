import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL =
  "https://api.data.gov.in/resource/50bc5a96-d6d5-483e-92b1-2d8fe09f0a0d?api-key=579b464db66ec23bdd000001ad8e07d88e4847dd555c7596e7a8f50a&format=json";

// Types
interface RawRecord {
  crop: string;
  traditional_method___water: string;
  traditional_method___yield: string;
  drip_irrigation_method___water: string;
  drip_irrigation_method___yield: string;
  _saving_in_water_: string;
  _increase_in_yield_: string;
}

interface ProcessedRecord {
  crop: string;
  traditionalWater: number;
  dripWater: number;
  traditionalYield: number;
  dripYield: number;
  waterSaved: number;
  yieldIncrease: number;
}

interface ApiResponse {
  title: string;
  desc: string;
  records: RawRecord[];
}

export default function IrrigationComparison(): JSX.Element {
  const [data, setData] = useState<ProcessedRecord[]>([]);
  const [meta, setMeta] = useState<{ title: string; desc: string } | null>(
    null
  );

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        const formatted: ProcessedRecord[] = json.records.map((item) => ({
          crop: item.crop,
          traditionalWater: Number(item.traditional_method___water),
          dripWater: Number(item.drip_irrigation_method___water),
          traditionalYield: Number(item.traditional_method___yield),
          dripYield: Number(item.drip_irrigation_method___yield),
          waterSaved: Number(item._saving_in_water_),
          yieldIncrease: Number(item._increase_in_yield_),
        }));

        setData(formatted);
        setMeta({ title: json.title, desc: json.desc });
      });
  }, []);

  if (!data.length) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{meta?.title}</h1>
      <p className="mb-6 text-gray-600">{meta?.desc}</p>

      {/* Water Usage */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Water Usage (litres per crop)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="traditionalWater" fill="#8884d8" name="Traditional" />
            <Bar dataKey="dripWater" fill="#82ca9d" name="Drip" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Yield */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Yield (per hectare)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="traditionalYield" fill="#ffbb28" name="Traditional" />
            <Bar dataKey="dripYield" fill="#00C49F" name="Drip" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage Gains */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">% Water Saving & Yield Increase</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="crop" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="waterSaved" fill="#8884d8" name="Water Saved (%)" />
            <Bar dataKey="yieldIncrease" fill="#82ca9d" name="Yield Increase (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <h2 className="text-xl font-semibold mb-2">Detailed Data Table</h2>
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Crop</th>
              <th className="p-2 border">Traditional Water</th>
              <th className="p-2 border">Drip Water</th>
              <th className="p-2 border">Traditional Yield</th>
              <th className="p-2 border">Drip Yield</th>
              <th className="p-2 border">% Water Saved</th>
              <th className="p-2 border">% Yield Increase</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border">{row.crop}</td>
                <td className="p-2 border">{row.traditionalWater}</td>
                <td className="p-2 border">{row.dripWater}</td>
                <td className="p-2 border">{row.traditionalYield}</td>
                <td className="p-2 border">{row.dripYield}</td>
                <td className="p-2 border">{row.waterSaved}%</td>
                <td className="p-2 border">{row.yieldIncrease}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
