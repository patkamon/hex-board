import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Historical portfolio value over 30D on Optimism',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export function LineChart({time, tk1, tk2}) {
  // , setstate: React.Dispatch<React.SetStateAction<never[]>>

  let labels = time
let data = {
  labels,
  datasets: [
    {
      label: 'RareTron.io',
      data: tk1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Ether',
      data: tk2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

  return <Line options={options} data={data} />;
}
