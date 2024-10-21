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

  // Map the data to the required format
  const selectedData = data?.map((item) => ({
    name: item._id.formattedDate, // X-axis data from formattedDate
    maleCount: item.maleCount, // Y-axis data
    femaleCount: item.femaleCount,
  }));

  
  return (
    <>
      <h2 className="text-sm">{title}</h2>
      <ResponsiveContainer
        className={'text-xs'}
        width="100%"
        height="100%"
      >
        <AreaChart
          data={selectedData}
          margin={{ right: 20, left: 20 }}
        >
          <XAxis dataKey={'name'}></XAxis>
          <CartesianGrid strokeDasharray={'5 5'} />
          <Legend />
          <Tooltip />
          <Area
            type="monotone"
            stroke="#FFA600"
            fill="#FFA600"
            strokeWidth={2}
            fillOpacity={0.3}
            dataKey="femaleCount"
            name="Female"
            z={-2}
          ></Area>
          <Area
            type="monotone"
            stroke="#0024e8"
            fill="#0024e8"
            strokeWidth={2}
            fillOpacity={0.3}
            dataKey="maleCount"
            name="Male"
            z={1}
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
