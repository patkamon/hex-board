import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export function PieChart({oplist}) {



  let data = {
    labels: ['RareTron.io', 'Ether'],
    datasets: [
      {
        label: '# of Votes',
        data: [oplist[0] == undefined ? 0: oplist[0].balance,oplist[1] == undefined ? 0: oplist[1].balance / 10**13],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie  data={data}   options={{ maintainAspectRatio: false,  aspectRatio: 1,responsive: true, }} />;
}
