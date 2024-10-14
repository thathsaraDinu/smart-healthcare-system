import PropTypes from 'prop-types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

export function AreaChartComponent({ title, data }) {
  return (
    <>
      <h2 className='text-sm'>{title}</h2>
      <ResponsiveContainer
        className={'text-xs'}
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{ right: 20, left: 20 }}
        >
          <XAxis dataKey={'name'}></XAxis>
          <CartesianGrid strokeDasharray={'5 5'} />
          <Legend />
          <Tooltip />
          <Area
            type="monotone"
            stroke="#0024e8"
            fill="#0024e8"
            strokeWidth={2}
            fillOpacity={0.3}
            dataKey="product2"
          ></Area>
          <Area
            type="monotone"
            stroke="#eb8900"
            fillOpacity={0.3}
            strokeWidth={2}
            fill="#eb8900"
            dataKey="product1"
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

AreaChartComponent.propTypes = {
  data: PropTypes.array.isRequired, // Ensure 'data' is an array and is required
  title: PropTypes.string.isRequired, // Ensure 'title' is a string and is required
};
