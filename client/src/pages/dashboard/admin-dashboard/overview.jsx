import { AreaChartComponent } from '@/components/charts/area-chart-component';
import BarChartComponent from '@/components/charts/bar-chart-component';
import PieChartComponent from '@/components/charts/pie-chart-component';
import LineChartComponent from '@/components/charts/line-chart-component';
import PropTypes from 'prop-types';
import useChartInfo from '@/hooks/useChartInfo';
import { useState } from 'react';
import { useMemo } from 'react';
import useDoctors from '@/hooks/useDoctors';

function Overview() {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to 6 months

  // Fetch the Chart Data
  const { data, loading: isLoadingChart } = useChartInfo();

  // Fetch the Doctors data
  const { data: doctors, isLoading: isLoadingDocs } =
    useDoctors();

  // Filter the Chart Data according to selected time period
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.stats.filter((item) => {
      const [day, month] =
        item._id.formattedDate.split('/');
      const itemDate = new Date(
        new Date().getFullYear(),
        month - 1, // Adjust month index
        day,
      );
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setMonth(
        currentDate.getMonth() - selectedMonth,
      ); // Set past date range

      return (
        itemDate >= pastDate && itemDate <= currentDate
      ); // Return filtered items
    });
  }, [data, selectedMonth]);

  // Handle the time period selection
  const handleFilterClick = (months) => {
    setSelectedMonth(months); // Update selected month
  };

  // Count all the appointments
  const totalAppointments = filteredData.reduce(
    (acc, item) => acc + item.totalAppointments,
    0,
  );

  // Count the number of Doctors
  const noOfDoctors = doctors?.length;

  //Count the number of Patients
  const noOfPatients = data?.totalPatients;

  return (
    <>
      <div className="flex justify-between px-5">
        <div className=" ">
          <span className="font-bold text-lg">
            {' '}
            Overview{' '}
          </span>
          <span className="font-medium text-md">
            of {selectedMonth}
            {` Months`}
          </span>
        </div>
        <div className="flex flex-wrap space-x-4 gap-2 justify-end ">
          {/* 6 Months Badge */}
          <span
            onClick={() => {
              handleFilterClick(3);
              setSelectedMonth(3);
            }}
            className={`py-2 px-3 ${selectedMonth == 3 ? 'bg-blue-900' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 hover:ring-2 hover:ring-blue-900 text-white text-sm rounded-full cursor-pointer`}
          >
            Last 3 Months
          </span>
          <span
            onClick={() => {
              handleFilterClick(6);
              setSelectedMonth(6);
            }}
            className={`py-2 px-3 ${selectedMonth == 6 ? 'bg-blue-900' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 hover:ring-2 hover:ring-blue-900 text-white text-sm rounded-full cursor-pointer`}
          >
            Last 6 Months
          </span>

          {/* 12 Months Badge */}
          <span
            onClick={() => {
              handleFilterClick(12);
              setSelectedMonth(12);
            }}
            className={`py-2 px-3 ${selectedMonth == 12 ? 'bg-blue-900' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 hover:ring-2 hover:ring-blue-900 text-white text-sm rounded-full cursor-pointer`}
          >
            Last 12 Months
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 xl:grid-cols-6 p-5 gap-6">
        <div className="  lg:col-span-3 col-span-1 flex flex-col gap-6">
          <ChartView className="">
            <BarChartComponent
              title="Average Patient Visits"
              data={filteredData}
            />
          </ChartView>
          <ChartView className="">
            <AreaChartComponent
              title={'Patient Visit by Gender'}
              data={filteredData}
            />
          </ChartView>
        </div>
        <div className="lg:col-span-2 col-span-1 grid xl:grid-cols-1 grid-cols-1 md:grid-cols-1 gap-6 xl:gap-0">
          <ChartView className="">
            <PieChartComponent
              title={'Patient Visits by Hospital'}
              data={filteredData}
            />
          </ChartView>

          <div className="  grid grid-cols-1 sm:grid-cols-2 lg:gap-0 gap-2 lg:grid-cols-1">
            <div className="h-[130px] rounded-xl bg-blue-100 py-1 col-span-1 bg-opacity-70 flex flex-row justify-start px-2 text-center items-center">
              <LineChartComponent
                title={'Total Male'}
                data={filteredData}
              />
            </div>
            <div className="h-[130px] rounded-xl bg-blue-100 py-1 col-span-1 bg-opacity-70 flex flex-row justify-start px-2 text-center items-center">
              <LineChartComponent
                title={'Total Female'}
                data={filteredData}
              />
            </div>
          </div>
        </div>
        <div className="grid  xl:grid-cols-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5 col-span-1 xl:col-span-1 lg:col-span-5 ">
          <AmountCard
            name={'Appointments'}
            value={totalAppointments}
            loading={isLoadingChart}
          />
          <AmountCard
            name="Doctors"
            value={noOfDoctors}
            loading={isLoadingDocs}
          />
          <AmountCard
            name="Total Patients"
            value={noOfPatients}
            loading={isLoadingChart}
          />
          <AmountCard
            name="Total Hospitals"
            value={10}
            loading={false}
          />
        </div>
      </div>
    </>
  );
}

const AmountCard = ({ name, value, loading }) => {
  return (
    <div
      className={`flex flex-col h-28 max-w-48 p-5 items-center text-center justify-around ${
        name === 'Appointments'
          ? 'bg-purple-200'
          : name === 'Total Patients'
            ? 'bg-green-200'
            : name === 'Staff'
              ? 'bg-red-200'
              : 'bg-blue-200'
      } rounded-2xl bg-opacity-50 gap-21 transition-all duration-300`}
    >
      <div className="text-base font-semibold">{name}</div>
      <div className="h-20 text-gray-500 flex items-center justify-center">
        {loading ? (
          <span className="text-sm animate-pulse">
            Loading...
          </span>
        ) : (
          <span className="text-2xl font-bold">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

const ChartView = ({ children }) => {
  return (
    <div className=" flex bg-blue-100 bg-opacity-70 py-4 flex-col gap-3 items-center h-[280px] rounded-2xl">
      {children}
    </div>
  );
};

AmountCard.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  loading: PropTypes.bool,
};

ChartView.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Overview;
