import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/chart';

// ----------------------------------------------------------------------

GraphChart.propTypes = {
  subheader: PropTypes.string,
  chartData: PropTypes.object.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  sx: PropTypes.object,
};

export default function GraphChart({ subheader, chartLabels, chartData, sx }) {
  const chartOptions = merge(BaseOptionChart(), {
    title: {
      text: subheader,
      align: 'left',
    },
    legend: { show: false, position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: chartLabels,
      title: {
        text: 'FlowRate[ft^3/min]',
      },
    },
    yaxis: {
      title: {
        text: 'Pressure[inH2O]',
      },
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: [
      '#5f5cd6',
      '#5f5cd6',
      '#5f5cd6',
      '#5f5cd6',
      '#5f5cd6',
      '#5f5cd6',
    ],
    fill: {
      opacity: 0
    },
    stroke: {
      curve: 'smooth',
      width: 1.5,
    }
  });

  return (
    <Box sx={{ ...sx, mt: 3, mx: 3 }} dir="ltr">
      <ReactApexChart type="area" series={chartData.data} options={chartOptions} height={364} />
    </Box>
  );
}
