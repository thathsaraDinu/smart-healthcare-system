import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const LineChartComponent = ({ title, data }) => {

  // Map the data to the required format
  const selectedData = data?.map((item) => ({
    name: item._id.formattedDate, // X-axis data from formattedDate
    maleCount: item.maleCount, // Y-axis data
    femaleCount: item.femaleCount,
  }));

  // Calculate total Male patients
  const totalMale = selectedData.reduce(
    (acc, item) => acc + item.maleCount,
    0,
  );

  // Calculate total Female patients
  const totalFemale = selectedData.reduce(
    (acc, item) => acc + item.femaleCount,
    0,
  );

  // Calculate Percentage of each gender
  const totalGender =
    title === 'Total Male'
      ? (
          (totalMale * 100) /
          (totalMale + totalFemale)
        ).toFixed(2)
      : (
          (totalFemale * 100) /
          (totalMale + totalFemale)
        ).toFixed(2);

  return (
    <>
      <div className="flex h-full justify-center gap-4 xl:w-28 flex-col">
        <div className="md:text-sm text-xs font-semibold">
          {title}
        </div>
        <div>
          <div className="md:text-lg text-sm font-bold ">
            {isNaN(totalGender) ? 0 : totalGender}%
          </div>
        </div>
      </div>
      <ResponsiveContainer
        className={'text-xs '}
        width="100%"
        height="100%"
      >
        <LineChart
          width={500}
          height={300}
          data={selectedData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={
              title == 'Total Male'
                ? 'maleCount'
                : 'femaleCount'
            }
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

LineChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LineChartComponent;
