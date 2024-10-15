import { AreaChartComponent } from '@/components/charts/area-chart-component';
import { Products } from './dummy_data';
import BarChartComponent from '@/components/charts/bar-chart-component';
import PieChartComponent from '@/components/charts/pie-chart-component';
import LineChartComponent from '@/components/charts/line-chart-component';
import PropTypes from 'prop-types';

export function Overview() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 p-10 gap-6">
        <div className=" lg:col-span-3 col-span-1 flex flex-col gap-6">
          <ChartView className="">
            <BarChartComponent
              title="Average Patient Visits"
              data={Products}
            />
          </ChartView>{' '}
          <ChartView className="">
            <AreaChartComponent
              title={'Patient Visit by Gender'}
              data={Products}
            />
          </ChartView>
        </div>
        <div className="lg:col-span-2  col-span-1 grid lg:grid-cols-1 grid-cols-2 gap-6 lg:gap-0">
          <ChartView className="">
            <PieChartComponent
              title={'Patient Visits by Department'}
              data={Products}
            />
          </ChartView>

          <div className='grid grid-cols-1'>
            <div className='h-[240px] flex flex-col gap-5'>
            <LineChartComponent
              title={'Line Chart'}
              data={Products}
            />
            <LineChartComponent
              title={'Line Chart'}
              data={Products}
            /></div>
          </div>
        </div> 

        <div className="grid grid-cols-4 lg:grid-cols-1  gap-5 col-span-1">
          <AmountCard name={'Appointments'} />
          <AmountCard name="Operations" />
          <AmountCard name="Total Patients" />
          <AmountCard name="Staff" />
        </div>
      </div>
    </>
  );
}

const AmountCard = ({ name, value }) => {
  return (
    <div
      className={`flex flex-col h-32 w-48 p-5 items-center justify-around ${name == 'Appointments' ? 'bg-purple-200' : name == 'Total Patients' ? 'bg-green-200' : name == 'Staff' ? 'bg-red-200' : 'bg-blue-200'}  rounded-2xl bg-opacity-50 gap-21`}
    >
      <div className="text-lg font-bold">{name}</div>
      <div className="text-sm text-gray-500">{value}</div>
    </div>
  );
};

const ChartView = ({ children }) => {
  return (
    <div className=" flex bg-blue-100 bg-opacity-70 py-4 flex-col gap-2 items-center h-[280px] rounded-2xl">
      {children}
    </div>
  );
};

AmountCard.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

ChartView.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
