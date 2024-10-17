import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';

const BarChartComponent = ({ data, title }) => {
  return (
    <>
      <div className="px-3 flex w-full items-center justify-evenly">
        <h2 className="text-sm">{title}</h2>
        <select className="py-1 px-2 text-xs rounded-md">
          <option className="py-2">Select range</option>
          <option className="py-2">3 months</option>
          <option className="py-2">6 months</option>
          <option className="py-2">12 months</option>
          <option className="py-2">2 years</option>
        </select>
      </div>
      <ResponsiveContainer
        className={'text-xs'}
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: '#4964fc', opacity: '30%' }}
          />
          <Legend />
          <Bar
            dataKey="product1"
            fill="#3d5bff"
            opacity={0.8}
            radius={[5, 5, 5, 5]}
            barSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default BarChartComponent;
