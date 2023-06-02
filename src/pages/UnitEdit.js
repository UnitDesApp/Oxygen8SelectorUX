import React, { useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Card, Divider, Container, Paper, Button, Stack, Typography } from '@mui/material';
// routes
import { PATH_PROJECT, PATH_PROJECTS } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitInfo, Selection } from '../sections/unit-edit';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const FooterStepStyle = styled(Card)(() => ({
  borderRadius: 0,
  background: '#fff',
  paddingTop: '20px',
  padding: '30px',
  zIndex: 1250,
  width: '100%',
  bottom: 0,
  position: 'fixed',
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

UnitEdit.prototype = {};

export default function UnitEdit() {
  const theme = useTheme();
  const { projectId, unitId } = useParams();
  const { state } = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const onClickDone = useCallback(() => {
    navigate(PATH_PROJECT.project(projectId, 'unitlist'));
  }, [navigate, projectId]);

  return (
    <Page title="Unit: Edit">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs
            heading={'Edit Unit'}
            links={[
              { name: 'My projects', href: PATH_PROJECTS.root },
              { name: 'Dashboard', href: PATH_PROJECT.project(projectId, 'unitlist') },
              { name: 'Edit Unit' },
            ]}
            sx={{ paddingLeft: '24px', paddingTop: '24px' }}
          />
          {currentStep === 1 && <UnitInfo projectId={projectId} unitId={unitId} unitData={state} />}
          {currentStep === 2 && <Selection unitTypeData={state} intUnitNo={unitId} />}
        </Container>
        <FooterStepStyle>
          <Grid container>
            <Grid item xs={8}>
              <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Item sx={{ color: currentStep === 0 && theme.palette.grey[400], cursor: 'not-allowed' }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify icon="ph:number-circle-one-fill" width="25px" height="25px" />
                    <Typography variant="body1">Select product type</Typography>
                  </Stack>
                </Item>
                <Item
                  sx={{ color: currentStep === 1 && theme.palette.primary.main, cursor: 'pointer' }}
                  onClick={() => setCurrentStep(1)}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify icon="ph:number-circle-two-fill" width="25px" height="25px" />
                    <Typography variant="body1">Edit unit info</Typography>
                  </Stack>
                </Item>
                <Item
                  sx={{ color: currentStep === 2 && theme.palette.primary.main, cursor: 'pointer' }}
                  onClick={() => setCurrentStep(2)}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify icon="ph:number-circle-three-fill" width="25px" height="25px" />
                    <Typography variant="body1">Make a selection</Typography>
                  </Stack>
                </Item>
              </Stack>
            </Grid>
            <Grid item xs={4} textAlign="center" alignContent="right">
              <Button variant="contained" color="primary" onClick={onClickDone}>
                Done
                <Iconify icon="icons8:cancel-2" />
              </Button>
            </Grid>
          </Grid>
        </FooterStepStyle>
      </RootStyle>
    </Page>
  );
}
