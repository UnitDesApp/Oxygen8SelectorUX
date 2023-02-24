import React, { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
  Typography,
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Divider,
} from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// redux
import {
  // useSelector,
  useDispatch,
} from '../../redux/store';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// utils
// import axios from '../../utils/axios';
// config
// import { serverUrl } from '../../config';
// theme

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  mb: '100px',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));

const ImageBorderStyle = styled(Box)(() => ({
  width: '100%',
  borderRadius: '10px',
  border: '1px solid #484848',
}));

//------------------------------------------------

export default function UnitInfo() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { projectId } = useParams();
  // const {
  //   projectList,
  //   // isLoading
  // } = useSelector((state) => state.projects);
  const isLoading = false;

  useEffect(() => {
    // dispatch(getProjectsInfo());
  }, [dispatch]);

  const [expanded, setExpanded] = React.useState({
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true,
  });

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          {isLoading ? (
            <LinearProgress color="info" />
          ) : (
            <Stack spacing={2} sx={{ marginBottom: '150px' }}>
              <Accordion
                expanded={expanded.panel1}
                onChange={() => setExpanded({ ...expanded, panel1: !expanded.panel1 })}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="il:arrow-down" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="primary.main" variant="h6">
                    UNIT DETAILS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row" divider={<Divider orientation="vertical" flexItem />}>
                    <Grid item xs={6}>
                      <Stack direction="row" spacing={2}>
                        <Stack spacing={1}>
                          <Typography>Tag*:</Typography>
                          <Typography>Model:</Typography>
                          <Typography>Qty:</Typography>
                          <Typography>Location:</Typography>
                          <Typography>Altitude (ft):</Typography>
                          <Typography>Bypass:</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>April 14 project</Typography>
                          <Typography>325 - 77 CFM</Typography>
                          <Typography>1</Typography>
                          <Typography>Indoor</Typography>
                          <Typography>0</Typography>
                          <Typography>No</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack direction="row" spacing={2}>
                        <Stack spacing={1}>
                          <Typography>Tag*:</Typography>
                          <Typography>Model:</Typography>
                          <Typography>Qty:</Typography>
                          <Typography>Location:</Typography>
                          <Typography>Altitude (ft):</Typography>
                          <Typography>Bypass:</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>April 14 project</Typography>
                          <Typography>325 - 77 CFM</Typography>
                          <Typography>1</Typography>
                          <Typography>Indoor</Typography>
                          <Typography>0</Typography>
                          <Typography>No</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded.panel2}
                onChange={() => setExpanded({ ...expanded, panel2: !expanded.panel2 })}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="il:arrow-down" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="primary.main" variant="h6">
                    ELECTRICAL REQUIREMENTS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Typography>Total number of connections required: {2}</Typography>
                  </Stack>

                  <Grid container direction="row" sx={{ mt: 2 }} divider={<Divider orientation="vertical" flexItem />}>
                    <Grid item xs={6}>
                      <Typography color="primary.main" variant="h6">
                        Unit
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Stack spacing={1}>
                          <Typography>Voltage:</Typography>
                          <Typography>Range:</Typography>
                          <Typography>FLA:</Typography>
                          <Typography>MCA:</Typography>
                          <Typography>RFS:</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>208V/1ph/60Hz</Typography>
                          <Typography>207 - 253V</Typography>
                          <Typography>5.29</Typography>
                          <Typography>5.91</Typography>
                          <Typography>15A</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="primary.main" variant="h6">
                        Preheat Select Heater
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Stack spacing={1}>
                          <Typography>Std. Coil:</Typography>
                          <Typography>Controls:</Typography>
                          <Typography>Voltage:</Typography>
                          <Typography>Range:</Typography>
                          <Typography>FLA:</Typography>
                          <Typography>MCA:</Typography>
                          <Typography>RFS:</Typography>
                          <Typography>Max kW:</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>1</Typography>
                          <Typography>SCR</Typography>
                          <Typography>208V/1ph/60Hz</Typography>
                          <Typography>187.2 - 218.4V</Typography>
                          <Typography>11.12</Typography>
                          <Typography>13.9</Typography>
                          <Typography>15A</Typography>
                          <Typography>4</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded.panel3}
                onChange={() => setExpanded({ ...expanded, panel3: !expanded.panel3 })}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="il:arrow-down" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="primary.main" variant="h6">
                    ELECTRIC PREHEAT
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={6}>
                    <Typography color="primary.main" variant="h6">
                      Actual
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Stack spacing={1}>
                        <Typography>Voltage:</Typography>
                        <Typography>Range:</Typography>
                        <Typography>FLA:</Typography>
                        <Typography>MCA:</Typography>
                        <Typography>RFS:</Typography>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography>208V/1ph/60Hz</Typography>
                        <Typography>207 - 253V</Typography>
                        <Typography>5.29</Typography>
                        <Typography>5.91</Typography>
                        <Typography>15A</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded.panel4}
                onChange={() => setExpanded({ ...expanded, panel4: !expanded.panel4 })}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="il:arrow-down" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="primary.main" variant="h6">
                    DRAWINGS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <ImageBorderStyle>
                      <img src="/assets/Images/img_nova_2.png" alt="Selection" width="100%" />
                    </ImageBorderStyle>
                  </Box>
                </AccordionDetails>
              </Accordion>{' '}
            </Stack>
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
