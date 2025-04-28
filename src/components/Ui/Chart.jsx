import React from 'react';
import { Bar } from 'react-chartjs-2';
// Import necessary chart components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = ["January", "February", "March", "April", "May", "June", "July"];

export const BarChart = ({
    data_1 = [],
    title_1,
    bgColor_1,
    horizontal = false,
    labels = months,
}) => {
    const options = {
        responsive: true,
        indexAxis: horizontal ? "y" : "x",
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: title_1,
                data: data_1,
                backgroundColor: bgColor_1,
                barThickness: "flex",
                barPercentage: 1,
                categoryPercentage: 0.4,
            },
        ],
    };

    return <Bar options={options} data={data} />;
};
