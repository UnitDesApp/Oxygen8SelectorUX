import React, { useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// file-saver
import { saveAs } from 'file-saver';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Card, Divider, Container, Paper, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_PROJECT } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { SelectProductInfo, UnitInfo, Selection } from '../sections/unit-add';
import { ExportSelectionDialog } from '../sections/dialog';
// utils
import axios from '../utils/axios';
// config
import { serverUrl } from '../config';

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

const DEFAULT_UNIT_DATA = {
  intProductTypeID: -1,
  txbProductType: '',
  intUnitTypeID: -1,
  txbUnitType: '',
  intApplicationTypeID: -1,
  txbApplicationType: '',
};

const STEP_PAGE_NAME = ['Select product type', 'Info', 'Selection'];

AddNewUnit.prototype = {};

export default function AddNewUnit() {
  const { projectId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAddedNewUnit, setIsAddedNewUnit] = useState(false);
  const [unitTypeData, setUnitTypeData] = useState(DEFAULT_UNIT_DATA);
  const [intUnitNo, setIntUnitNo] = useState(0);
  const [isSelectionDownloading, setIsSelectionDownloading] = useState(false);
  const [openRPDialog, setOpenRPDialog] = useState(false);

  const openDialog = useCallback(() => {
    setOpenRPDialog(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpenRPDialog(false);
  }, []);

  const navigate = useNavigate();
  const onSelectAppliaionItem = (value, txb) => {
    setUnitTypeData({ ...unitTypeData, intApplicationTypeID: value, txbApplicationType: txb });
  };

  const onSelectProductTypeItem = (value, txb) => {
    setUnitTypeData({ ...unitTypeData, intProductTypeID: value, txbProductType: txb });
  };

  const onSelectUnitTypeItem = (value, txb) => {
    setUnitTypeData({ ...unitTypeData, intUnitTypeID: value, txbUnitType: txb });
  };

  const onClickNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else if (currentStep === 2) navigate(PATH_PROJECT.project(projectId, 'unitlist'));
  };

  const validateContinue = () => {
    if (currentStep === 0) {
      if (
        unitTypeData.intProductTypeID === -1 ||
        unitTypeData.intUnitTypeID === -1 ||
        unitTypeData.intApplicationTypeID === ''
      )
        return true;
      return false;
    }

    if (currentStep === 1 && isAddedNewUnit) return false;
    if (currentStep === 2 && intUnitNo !== 0) return false;

    return true;
  };

  const downloadPDF = async () => {
    const data = {
      intProjectID: projectId,
      intUnitNo,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };
    setIsSelectionDownloading(true);

    await axios.post(`${serverUrl}/api/units/DownloadSelection`, data, { responseType: 'blob' }).then((response) => {
      // Get File Name
      let filename = '';
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Save File
      saveAs(response.data, `${filename}.pdf`);
    });

    setIsSelectionDownloading(false);
  };

  return (
    <Page title="Unit: Add">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs
            heading={`Add New: ${STEP_PAGE_NAME[currentStep]}`}
            links={[
              { name: 'My project', href: PATH_PROJECT.project(projectId, 'unitlist') },
              // { name: 'Selected Project', href: PATH_MY_JOBS.dashboard },
              { name: 'Add New Unit' },
            ]}
            sx={{ paddingLeft: '24px', paddingTop: '24px' }}
            action={
              <>
                {/* {currentStep === 1 && (
                  <Button variant="text" startIcon={<Iconify icon={'bxs:download'} />} onClick={openDialog}>
                    Export report
                  </Button>
                )} */}
                {currentStep === 2 && (
                  <Stack direction="row" spacing={5}>
                    <LoadingButton
                      loading={isSelectionDownloading}
                      variant="text"
                      onClick={downloadPDF}
                      startIcon={<Iconify icon="mdi:download-outline" />}
                    >
                      Export selection
                    </LoadingButton>
                  </Stack>
                )}
              </>
            }
          />

          {currentStep === 0 && (
            <SelectProductInfo
              onSelectAppliaionItem={onSelectAppliaionItem}
              onSelectProductTypeItem={onSelectProductTypeItem}
              onSelectUnitTypeItem={onSelectUnitTypeItem}
            />
          )}
          {currentStep === 1 && (
            <UnitInfo
              unitTypeData={unitTypeData}
              intProductTypeID={unitTypeData.intProductTypeID}
              isAddedNewUnit={isAddedNewUnit}
              setIsAddedNewUnit={(no) => {
                setIntUnitNo(no);
                setIsAddedNewUnit(true);
              }}
            />
          )}
          {currentStep === 2 && <Selection unitTypeData={unitTypeData} intUnitNo={intUnitNo} />}
        </Container>
        <FooterStepStyle>
          <Grid container>
            <Grid item xs={8}>
              <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Item
                  sx={{ color: currentStep === 0 && theme.palette.primary.main, cursor: 'pointer' }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify icon="ph:number-circle-one-fill" width="25px" height="25px" />
                    <Typography variant="body1">Select product type</Typography>
                  </Stack>
                </Item>
                <Item
                  sx={{ color: currentStep === 1 && theme.palette.primary.main, cursor: 'pointer' }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify icon="ph:number-circle-two-fill" width="25px" height="25px" />
                    <Typography variant="body1">Add unit info</Typography>
                  </Stack>
                </Item>
                <Item
                  sx={{ color: currentStep === 2 && theme.palette.primary.main, cursor: 'pointer' }}
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
        <ExportSelectionDialog
          isOpen={openRPDialog}
          onClose={closeDialog}
          intProjectID={projectId}
          intUnitNo={intUnitNo}
        />
      </RootStyle>
    </Page>
  );
}
