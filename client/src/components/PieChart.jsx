import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, Title } from '@mantine/core';

import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  labels: [],
  datasets: [
    {
      label: 'Time Spent on Board',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  const [chartData, setChartData] = useState(data);
  console.log('chartData', chartData);
  useEffect(() => {
    axios
      .get(`/reports/`)
      .then(results => {
        const resultsArray = Object.values(results.data);
        console.log('results', resultsArray);
        for (const result of resultsArray) {
          console.log('result', result);
          data.labels.push(result.board_name);
          data.datasets[0].data.push(result.board_time);
        }
      })
      .catch(error => {
        console.log(`Reports: Request failed with error ${error}`);
      });
  }, []);

  console.log('DADA', data);

  return (
    <Card shadow='xl' p='lg' className='report-data'>
      <Card.Section>
        <Title order={3} align='center'>
          Time Tracker Overview
        </Title>
        <Pie data={data} />
      </Card.Section>
    </Card>
  );
}
