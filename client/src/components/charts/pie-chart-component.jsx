import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data1 = [
  { name: 'Group A', sh: 400 },
  { name: 'Group B', sh: 300 },
  { name: 'Group C', sh: 300 },
 
];

const COLORS = [
  '#0D47A1',
  '#1976D2',
  '#42A5F5',
  '#90CAF9',
  '#E3F2FD',
];

const PieChartComponent = ({ data, title }) => {
  const [pieSelected, setPieSelected] = useState(100);

  return (
    <>
      <div className="px-3 flex w-full items-center justify-evenly bg-transparent">
        <h2 className="text-sm w-auto line-clamp-1 md:line-clamp-2 lg:line-clamp-none">
          {title}
        </h2>
        <select
          onChange={() => {
            setPieSelected(event.target.value);
          }}
          className="py-1 px-2 text-xs rounded-md"
        >
          <option className="py-2">Select</option>
          <option className="py-2">type 1</option>
          <option className="py-2">type 2</option>
          <option className="py-2">type 3</option>
          <option className="py-2">type 4</option>
        </select>
      </div>
      <ResponsiveContainer
        className={'text-xs'}
        width="100%"
        height="100%"
      >
        <PieChart margin={{ top: -20 }}>
          <Legend />
          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs"
          >
            Overall {pieSelected} %
          </text>
          <Pie
            data={data1}
            innerRadius={50} // Inner radius for the donut effect
            outerRadius={80}
            fill="#8884d8"
            dataKey="sh"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie><div className=''></div>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired, // Ensure 'data' is an array and is required
  title: PropTypes.string.isRequired, // Ensure 'title' is a string and is required
};

export default PieChartComponent;
