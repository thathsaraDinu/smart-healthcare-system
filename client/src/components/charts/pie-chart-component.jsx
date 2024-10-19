import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#003f5c', // Dark Teal
  '#2f4b7c', // Dark Blue
  '#665191', // Purple
  '#a05195', // Rose
  '#d45087', // Raspberry
  '#f95d6a', // Coral Red
  '#ff7c43', // Orange
  '#ffa600', // Gold
  '#ffcc00', // Bright Yellow
  '#bc5090', // Fuchsia
  '#ff5e78', // Salmon
  '#ef476f', // Bright Pink
];

const PieChartComponent = ({ data, title }) => {
  const selectedData = [];
  const hospitalMap = {};

  // Map the data to the required format
  data?.forEach((item) => {
    Object.entries(item.hospitalAppointments).forEach(
      ([hospitalName, appointmentCount]) => {
        hospitalMap[hospitalName] =
          (hospitalMap[hospitalName] || 0) +
          appointmentCount;
      },
    );
  });
  Object.entries(hospitalMap).forEach(
    ([hospitalName, totalAppointments]) => {
      selectedData.push({
        name: hospitalName,
        totalAppointments,
      });
    },
  );

  // Calculate the total number of appointments
  const totalAppointmentsCount = selectedData.reduce(
    (acc, item) => acc + item.totalAppointments,
    0,
  );

  return (
    <>
      <div className="px-3 flex w-full items-center justify-evenly bg-transparent">
        <h2 className="text-sm w-auto line-clamp-1 md:line-clamp-2 lg:line-clamp-none">
          {title}
        </h2>
      </div>
      <ResponsiveContainer
        className="text-xs"
        width="100%"
        height="100%"
      >
        <PieChart margin={{ top: -0 }}>
          <Pie
            data={selectedData}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            label={({ name, totalAppointments }) => {
              const displayName = name.length > 9 ? `${name.slice(0, 9)}.` : name;
              const percentage = ((totalAppointments / totalAppointmentsCount) * 100).toFixed(0);
              return `${displayName}: ${percentage}%`;
            }}
            labelLine={false}
            dataKey="totalAppointments"
          >
            {selectedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PieChartComponent;
