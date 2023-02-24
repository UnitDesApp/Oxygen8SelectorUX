import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Card, Divider, Container, Paper, Button, Stack, Typography } from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getUnitTypeInfo } from '../redux/slices/unitReducer';
// routes
import { PATH_PROJECTS, PATH_PROJECT } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { SelectProductInfo, UnitInfo, Selection } from '../sections/unit-add';
import Loading from '../sections/Loading';

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

// ----------------------------------------------------------------------

const DEFAULT_UNIT_DATA = {
  intApplicationID: -1,
  intProductTypeID: -1,
};

const STEP_PAGE_NAME = ['Select product type', 'Info', 'Selection'];

// ----------------------------------------------------------------------

AddNewUnit.prototype = {};

export default function AddNewUnit() {
  const { projectId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [unitData, setUnitData] = useState(DEFAULT_UNIT_DATA);
  const { productTypeDataTbl, unitTypeDataTbl, isLoading } = useSelector((state) => state.unit);

  console.log(productTypeDataTbl, unitTypeDataTbl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isComplete = activeStep === STEPS.length;

  const onSelectAppliaionItem = (value) => {
    setUnitData({ ...unitData, intApplicationID: value });
  };

  const onSelectProductTypeItem = (value) => {
    setUnitData({ ...unitData, intProductTypeID: value });
  };

  const onClickNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else if (currentStep === 2) navigate(PATH_PROJECT.project({ id: projectId, page: 'unitlist' }));
  };

  const validateContinue = () => {
    if (currentStep === 0) {
      console.log(unitData);
      if (unitData.intApplicationID !== -1 && unitData.intProductTypeID !== -1) return false;
      return true;
    }

    return true;
  };

  useEffect(() => {
    dispatch(getUnitTypeInfo({ projectId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Unit: Add">
      {isLoading ? (
        <Loading />
      ) : (
        <RootStyle>
          <Container>
            <HeaderBreadcrumbs
              heading={`Add New: ${STEP_PAGE_NAME[currentStep]}`}
              links={[
                { name: 'My projects', href: PATH_PROJECTS.root },
                // { name: 'Selected Project', href: PATH_MY_JOBS.dashboard },
                { name: 'Add New Unit' },
              ]}
              sx={{ paddingLeft: '24px', paddingTop: '24px' }}
              action={
                <>
                  {currentStep === 1 && (
                    <Button variant="text" startIcon={<Iconify icon="ic:outline-edit" />}>
                      Edit project details
                    </Button>
                  )}
                  {currentStep === 2 && (
                    <Stack direction="row" spacing={5}>
                      <Button variant="text" startIcon={<Iconify icon="mdi:download-outline" />}>
                        Export Revit file
                      </Button>
                      <Button variant="text" startIcon={<Iconify icon="mdi:download-outline" />}>
                        Export selection
                      </Button>
                    </Stack>
                  )}
                </>
              }
            />

            {currentStep === 0 && (
              <SelectProductInfo
                productType={productTypeDataTbl}
                onSelectAppliaionItem={onSelectAppliaionItem}
                onSelectProductTypeItem={onSelectProductTypeItem}
              />
            )}
            {currentStep === 1 && <UnitInfo />}
            {currentStep === 2 && <Selection />}
          </Container>
          <FooterStepStyle>
            <Grid container>
              <Grid item xs={8}>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                  <Item
                    sx={{ color: currentStep === 0 && theme.palette.primary.main }}
                    onClick={() => setCurrentStep(0)}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Iconify icon="ph:number-circle-one-fill" width="25px" height="25px" />
                      <Typography variant="body1">Select product type</Typography>
                    </Stack>
                  </Item>
                  <Item
                    sx={{ color: currentStep === 1 && theme.palette.primary.main }}
                    onClick={() => setCurrentStep(1)}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Iconify icon="ph:number-circle-two-fill" width="25px" height="25px" />
                      <Typography variant="body1">Add unit info</Typography>
                    </Stack>
                  </Item>
                  <Item
                    sx={{ color: currentStep === 2 && theme.palette.primary.main }}
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
                <Button variant="contained" color="primary" onClick={onClickNextStep} disabled={validateContinue()}>
                  {currentStep !== 2 ? 'Continue' : 'Done'}
                  <Iconify icon={currentStep !== 2 ? 'akar-icons:arrow-right' : 'icons8:cancel-2'} />
                </Button>
              </Grid>
            </Grid>
          </FooterStepStyle>
        </RootStyle>
      )}
    </Page>
  );
}
