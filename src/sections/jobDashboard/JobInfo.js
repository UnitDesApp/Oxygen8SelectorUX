import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Stack, Button, CardHeader, Typography, CardContent, Divider } from '@mui/material';
import { PATH_JOB } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
const LabelInfoJob = {
  job_name: 'Job Name',
  reference_no: 'Reference No',
  Customer_Name: 'Customer Name',
  User_Full_Name: 'User Name',
  company_name: 'Company Name',
  created_date: 'Created Date',
  revised_date: 'Revised Date',
  shipping_factor_percent: 'Shipping Factor Percent',
  CustomerShippingFactorPercent: 'Customer Shipping Factor Percent',
};

const LabelInfoOutdoorAir = {
  altitude: 'Altitude',
  summer_outdoor_air_db: 'Summer Outdoor Air DB',
  summer_outdoor_air_wb: 'Summer Outdoor Air WB',
  summer_outdoor_air_rh: 'Summer Outdoor Air RH',
  winter_outdoor_air_db: 'Winter Outdoor Air DB',
  winter_outdoor_air_wb: 'Winter Outdoor Air WB',
  winter_outdoor_air_rh: 'Winter Outdoor Air RH',

};

const LabelInfoIndoorAir = {
  summer_return_air_db: 'Summer Return Air DB',
  summer_return_air_wb: 'Summer Return Air WB',
  summer_return_air_rh: 'Summer Return Air RH',
  winter_return_air_db: 'Winter Return Air EB',
  winter_return_air_wb: 'Winter Return Air WB',
  winter_return_air_rh: 'Winter Return Air RH',
};

const CardHeaderStyle = styled(CardHeader)(() => ({
  paddingBottom: '15px',
  borderBottom: '1px solid #b9b9b9',
}));

JobInfo.propTypes = {
  jobInfo: PropTypes.object,
};

export default function JobInfo({ jobInfo }) {
  const navigate = useNavigate();

  const handleEditJobInfo = () => {
    navigate(PATH_JOB.jobEdit(jobInfo.id));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeaderStyle
        title="JOB INFO"
        action={
          <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={() => handleEditJobInfo()}>
            Edit
          </Button>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          {Object.entries(LabelInfoJob).map(([key, value], index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {value}
              </Typography>
              <Typography variant="caption">{jobInfo[key]}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          {Object.entries(LabelInfoOutdoorAir).map(([key, value], index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {value}
              </Typography>
              <Typography variant="caption">{jobInfo[key]}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          {Object.entries(LabelInfoIndoorAir).map(([key, value], index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {value}
              </Typography>
              <Typography variant="caption">{jobInfo[key]}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
