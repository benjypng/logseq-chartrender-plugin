import { PieChart, Pie } from 'recharts';
import { GraphProps } from '~/types';

const DrawPie = ({ chartData, colour }: GraphProps) => {
  return (
    <PieChart width={500} height={450}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={chartData}
        cx={220}
        cy={220}
        outerRadius={150}
        fill={colour}
        label
      />
    </PieChart>
  );
};

export default DrawPie;
