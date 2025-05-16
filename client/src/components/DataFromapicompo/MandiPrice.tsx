import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { Combobox } from '@headlessui/react';

type Record = {
  market: string;
  min_price: string;
  max_price: string;
  modal_price: string;
  state: string;
  commodity: string;
};

const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

export default function CommodityBarChart() {
  const [state, setState] = useState('');
  const [commodity, setCommodity] = useState('');
  const [priceType, setPriceType] = useState<'min_price' | 'max_price' | 'modal_price'>('modal_price');
  const [data, setData] = useState<Record[]>([]);
  const [allStates, setAllStates] = useState<string[]>([]);
  const [allCommodities, setAllCommodities] = useState<string[]>([]);

  const [queryState, setQueryState] = useState('');
  const [queryCommodity, setQueryCommodity] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = new URLSearchParams({
        'api-key': '579b464db66ec23bdd000001a4ca219ac0f34646682f102b13c15247',
        format: 'json',
        limit: '500',
      });

      const res = await fetch(`${API_URL}?${query.toString()}`);
      const json = await res.json();

      const states = Array.from(new Set(json.records.map((r: Record) => r.state))).sort();
      const commodities = Array.from(new Set(json.records.map((r: Record) => r.commodity))).sort();

      setAllStates(states);
      setAllCommodities(commodities);
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (!state || !commodity) return;

    const fetchData = async () => {
      const query = new URLSearchParams({
        'api-key': '579b464db66ec23bdd000001a4ca219ac0f34646682f102b13c15247',
        format: 'json',
        limit: '100',
        [`filters[state.keyword]`]: state,
        [`filters[commodity]`]: commodity,
      });

      const res = await fetch(`${API_URL}?${query.toString()}`);
      const json = await res.json();
      setData(json.records);
    };

    fetchData();
  }, [state, commodity]);

  const filteredStates = queryState === ''
    ? allStates
    : allStates.filter((s) => s.toLowerCase().includes(queryState.toLowerCase()));

  const filteredCommodities = queryCommodity === ''
    ? allCommodities
    : allCommodities.filter((c) => c.toLowerCase().includes(queryCommodity.toLowerCase()));

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State Combobox */}
        <Combobox value={state} onChange={setState}>
          <div className="relative">
            <Combobox.Input
              className="p-2 border rounded w-full"
              onChange={(e) => setQueryState(e.target.value)}
              placeholder="Select or type state"
            />
            <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white border shadow-lg">
              {filteredStates.map((s) => (
                <Combobox.Option
                  key={s}
                  value={s}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                  }
                >
                  {s}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>

        {/* Commodity Combobox */}
        <Combobox value={commodity} onChange={setCommodity}>
          <div className="relative">
            <Combobox.Input
              className="p-2 border rounded w-full"
              onChange={(e) => setQueryCommodity(e.target.value)}
              placeholder="Select or type commodity"
            />
            <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white border shadow-lg">
              {filteredCommodities.map((c) => (
                <Combobox.Option
                  key={c}
                  value={c}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100' : ''}`
                  }
                >
                  {c}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>

        {/* Price Type */}
        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value as any)}
          className="p-2 border rounded w-full"
        >
          <option value="min_price">Min Price</option>
          <option value="max_price">Max Price</option>
          <option value="modal_price">Modal Price</option>
        </select>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="market" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={priceType} fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center pt-10">No data found. Please enter valid state and commodity.</p>
      )}
    </div>
  );
}
