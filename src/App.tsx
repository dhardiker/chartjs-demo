import { Chart as ChartJS, CategoryScale, TimeScale, BarController, BarElement, Legend, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import * as datefns from 'date-fns';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, TimeScale, BarController, BarElement, Legend, Tooltip);

function App() {
  const minDate = new Date(2023, 10, 0);
  const maxDate = new Date(2023, 10, 8);

  return (
    <Chart
      type='bar'
      data={{
        labels: ['KEY-1', 'KEY-2', 'KEY-3', 'KEY-4'],
        datasets: [
          {
            label: 'Open',
            data: [
              [new Date(2023, 10, 1), new Date(2023, 10, 3)],
              [new Date(2023, 10, 2), maxDate],
              [],
              [new Date(2023, 10, 1), new Date(2023, 10, 3)],
            ],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rbg(255, 99, 132)'],
            borderWidth: 1,
            borderSkipped: false,
          },
          {
            label: 'Development',
            data: [
              [new Date(2023, 10, 3), new Date(2023, 10, 6)],
              [],
              [new Date(2023, 10, 4), maxDate],
              [new Date(2023, 10, 3), new Date(2023, 10, 6)],
            ],
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rbg(255, 159, 64)'],
            borderWidth: 1,
            borderSkipped: false,
          },
          {
            label: 'Open', // Reopened
            data: [
              [],
              [],
              [],
              [new Date(2023, 10, 6), maxDate],
            ],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rbg(255, 99, 132)'],
            borderWidth: 1,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        interaction: {
          axis: 'y',
          mode: 'index',
        },
        indexAxis: 'y',
        scales: {
          y: {
            stacked: true,
            type: 'category',
          },
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            min: minDate.toISOString(),
            max: maxDate.toISOString(),
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (!ctx.dataset.label) return;
                // Get the first date from the dataset
                const firstDate = Array.isArray(ctx.raw)
                  ? ctx.raw[0]
                  : ctx.raw;
                if (firstDate instanceof Date) {
                  return `${ctx.dataset.label}: ${datefns.format(
                    firstDate,
                    'dd MMM'
                  )}`;
                } else return;
              },
            },
          },
        },
      }}
    />
  );
}

export default App;
