import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const BarChartComponent = ({ data, title }) => {
  // Format and map data for chart
  const selectedData = data?.map((item) => ({
    name: item._id.formattedDate, // X-axis data from formattedDate
    totalAppointments: item.totalAppointments, // Y-axis data
  }));

  return (
    <>
      <div className="px-3 flex w-full items-center justify-center">
        <div className="text-sm">{title}</div>
      </div>

      <ResponsiveContainer
        className="text-xs"
        width="100%"
        height="100%"
      >
        <BarChart
          data={selectedData}
          margin={{ right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            cursor={{ fill: '#4964fc', opacity: '30%' }}
          />
          <Bar
            animationDuration={1000}
            dataKey="totalAppointments"
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
