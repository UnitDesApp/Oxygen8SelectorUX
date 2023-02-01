import { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// file-saver
import { saveAs } from 'file-saver';
// paths
import { PATH_JOB, PATH_JOBS, PATH_UNIT } from '../routes/paths';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { addNewNote, addNewShippingNote, getSubmittalInfo, saveSubmittalInfo } from '../redux/slices/submittalReducer';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../components/hook-form';
// utils
import axios from '../utils/axios';
// config
import { serverUrl } from '../config';
// sections
import Loading from '../sections/Loading';

//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

//------------------------------------------------

const ProjectInfoTableHeader = [
  'QTY',
  'TAG',
  'ITEM',
  'MODEL',
  'VOLTAGE',
  'CONTROLS PREFERENCE',
  'INSTALLATION',
  'DUCT CONNECTION',
  'HANDING',
  'PART DESC',
  'PART NUMBER',
  'PRICING',
];

export default function JobSubmittal() {
  const { jobId } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, submittalInfo, submittalDetailInfo, notes, shippingNotes } = useSelector(
    (state) => state.submittal
  );

  // State
  const [note, setNote] = useState('');
  const [shippingNote, setShippingNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // Form Schema
  const UpdateJobInfoSchema = Yup.object().shape({
    txbJobName: Yup.string(),
    txbRepName: Yup.string(),
    txbSalesEngineer: Yup.string(),
    txbLeadTime: Yup.string().required('Please enter a Lead Time'),
    txbRevisionNo: Yup.string().required('Please enter a Revision No'),
    txbPONumber: Yup.string().required('Please enter a PO Number'),
    txbShipName: Yup.string().required('Please enter a Ship Name'),
    txbShippingStreetAddress: Yup.string().required('Please enter a Street Address'),
    txbShippingCity: Yup.string().required('Please enter a City'),
    txbShippingProvince: Yup.string().required('Please enter a State'),
    txbShippingPostalCode: Yup.string().required('Please enter a Zip'),
    ddlCountry: Yup.string().required('Please Select a Country'),
    ddlDockType: Yup.string().required('Please Select a Dock type'),
    // ddlCoilHandling: Yup.string().required('Please Select a Coil Handling'),
    ckbBACNetPointList: Yup.boolean(),
    ckbBackdraftDamper: Yup.boolean(),
    ckbBypassDefrost: Yup.boolean(),
    ckbConstantVolume: Yup.boolean(),
    ckbFireAlarm: Yup.boolean(),
    ckbHumidification: Yup.boolean(),
    ckbHydronicPreheat: Yup.boolean(),
    ckbOJHMISpec: Yup.boolean(),
    ckbTemControl: Yup.boolean(),
    ckbTerminalWiring: Yup.boolean(),
    ckbVoltageTable: Yup.boolean(),
  });

  // default values for form depend on redux
  const defaultValues = useMemo(
    () => ({
      txbJobName: submittalInfo.txbJobName === undefined ? '' : submittalInfo.txbJobName,
      txbRepName: submittalInfo.txbRepName === undefined ? '' : submittalInfo.txbRepName,
      txbSalesEngineer: submittalInfo.txbSalesEngineer === undefined ? '' : submittalInfo.txbSalesEngineer,
      txbLeadTime: submittalInfo.txbLeadTime === undefined ? '' : submittalInfo.txbLeadTime,
      txbRevisionNo: submittalInfo.txbRevisionNo === undefined ? '' : submittalInfo.txbRevisionNo,
      txbPONumber: submittalInfo.txbPONumber === undefined ? '' : submittalInfo.txbPONumber,
      txbShipName: submittalInfo.txbShipName === undefined ? '' : submittalInfo.txbShipName,
      txbShippingStreetAddress:
        submittalInfo.txbShippingStreetAddress === undefined ? '' : submittalInfo.txbShippingStreetAddress,
      txbShippingCity: submittalInfo.txbShippingCity === undefined ? '' : submittalInfo.txbShippingCity,
      txbShippingProvince: submittalInfo.txbShippingProvince === undefined ? '' : submittalInfo.txbShippingProvince,
      txbShippingPostalCode:
        submittalInfo.txbShippingPostalCode === undefined ? '' : submittalInfo.txbShippingPostalCode,
      ddlCountry: submittalInfo.ddlCountry === undefined ? '' : submittalInfo.ddlCountry,
      ddlDockType: submittalInfo.ddlDockType === undefined ? '' : submittalInfo.ddlDockType,
      // ddlCoilHandling: submittalInfo.ddlCoilHandling,
      ckbBACNetPointList: false,
      ckbBackdraftDamper: false,
      ckbBypassDefrost: false,
      ckbConstantVolume: false,
      ckbFireAlarm: false,
      ckbHumidification: false,
      ckbHydronicPreheat: false,
      ckbOJHMISpec: false,
      ckbTemControl: false,
      ckbTerminalWiring: false,
      ckbVoltageTable: false,
    }),
    [submittalInfo]
  );

  // form setting using useForm
  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // will be updated when default valuse is changed depend on redux
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // getting all form data from server
  useEffect(() => {
    dispatch(
      getSubmittalInfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // event handler for addding note
  const addNoteClicked = () => {
    if (note === '') return;
    const data = {
      intUserID: localStorage.getItem('userId'),
      intUAL: localStorage.getItem('UAL'),
      intJobID: jobId,
      txbNote: note,
    };
    dispatch(addNewNote(data));
    setNote('');
  };

  // event handler for adding shipping note
  const addShippingInstructionClicked = () => {
    if (shippingNote === '') return;
    const data = {
      intUserID: localStorage.getItem('userId'),
      intUAL: localStorage.getItem('UAL'),
      intJobID: jobId,
      txbShippingNote: shippingNote,
    };
    dispatch(addNewShippingNote(data));
    setShippingNote('');
  };

  // export pdf of form data
  const downloadPDF = async () => {
    const data = {
      intJobID: jobId,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/submittals/exportpdf`, data, { responseType: 'blob' });
    console.log(response);
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
    saveAs(response.data, `${filename}`);

    console.log('Successed');
  };

  // export pdf of form data
  const downloadEpicor = async () => {
    const data = {
      intJobID: jobId,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/submittals/exportepicor`, data, { responseType: 'blob' });
    if (response.data.type === "application/json") {
      setFail(true);
      return;
    }

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


    console.log(filename);

    // Save File
    saveAs(response.data, `${filename}`);

    console.log('Successed');
  };

  // submmit function
  const onJobInfoSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
      };
      await dispatch(saveSubmittalInfo(requestData));
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  // const clickCheckbox = (key) => {
  //   setValue(key, !getValues(key));
  // };

  return isLoading ? (
    <Loading />
  ) : (
    <Page title="Job: Edit">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onJobInfoSubmit)}>
            <HeaderBreadcrumbs
              heading="Job Submittal"
              links={[
                { name: 'My Jobs', href: PATH_JOBS.root },
                { name: 'My Dashboard', href: PATH_JOB.dashboard(jobId) },
                { name: 'Job Submittal' },
              ]}
              action={
                <Stack direction="row" spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <Button href={PATH_JOB.jobEdit(jobId)}>Edit Project</Button>
                  <Button href={PATH_UNIT.view(jobId)}>Unit List</Button>
                  <Button startIcon={<Iconify icon={'grommet-icons:document-pdf'} />} onClick={downloadPDF}>
                    Roport
                  </Button>
                  <Button startIcon={<Iconify icon={'file-icons:microsoft-excel'} />} onClick={downloadEpicor}>
                    Epicor Report
                  </Button>
                  <LoadingButton
                    type="submit"
                    startIcon={<Iconify icon={'fluent:save-24-regular'} />}
                    loading={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Stack>
              }
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Summary" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbJobName" label="Project Name" disabled />
                      <RHFTextField size="small" name="txbRepName" label="Rep Name" disabled />
                      <RHFTextField size="small" name="txbSalesEngineer" label="Sales Engineer" disabled />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbLeadTime" label="Lead Time" />
                      <RHFTextField size="small" name="txbRevisionNo" label="revisionNo" />
                      <RHFTextField size="small" name="txbPONumber" label="PO Number" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Ship To Address" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbShipName" label="Name" />
                      <RHFTextField size="small" name="txbShippingStreetAddress" label="Street Address" />
                      <RHFTextField size="small" name="txbShippingCity" label="City" />
                      <RHFTextField size="small" name="txbShippingProvince" label="State / Province" />
                      <RHFTextField size="small" name="txbShippingPostalCode" label="Zip / Postal Code" />
                      <RHFSelect size="small" name="ddlCountry" label="Country" placeholder="">
                        <option value="" />
                        <option value="1">Canada</option>
                        <option value="2">USA</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="ddlDockType" label="Dock Type" placeholder="">
                        <option value="" />
                        <option value="1">Type1</option>
                        <option value="2">Type2</option>
                      </RHFSelect>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="All (defualt)" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbVoltageTable"
                        label="Voltage Table"
                        defaultChecked={getValues('ckbVoltageTable')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbVoltageTable');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbBACNetPointList"
                        label="BACNet Points List"
                        defaultChecked={getValues('ckbBACNetPointList')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBACNetPointList');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbOJHMISpec"
                        label="OJ HMI Spec"
                        defaultChecked={getValues('ckbOJHMISpec')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbOJHMISpec');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbTerminalWiring"
                        label="Terminal string wiring diagram"
                        defaultChecked={getValues('ckbTerminalWiring')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbTerminalWiring');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbFireAlarm"
                        label="Fire alarm"
                        defaultChecked={getValues('ckbFireAlarm')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbFireAlarm');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbBackdraftDamper"
                        label="Backdraft dampers"
                        defaultChecked={getValues('ckbBackdraftDamper')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBackdraftDamper');
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="SOO" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbBypassDefrost"
                        label="Bpass for Defrost"
                        defaultChecked={getValues('ckbBypassDefrost')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbBypassDefrost');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbConstantVolume"
                        label="Constant Volume"
                        defaultChecked={getValues('ckbConstantVolume')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbConstantVolume');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbHydronicPreheat"
                        label="Hydronic pre-heat"
                        defaultChecked={getValues('ckbHydronicPreheat')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbHydronicPreheat');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbHumidification"
                        label="Humidification"
                        defaultChecked={getValues('ckbHumidification')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbHumidification');
                        }}
                      />
                      <RHFCheckbox
                        size="small"
                        name="ckbTemControl"
                        label="Temperature control"
                        defaultChecked={getValues('ckbTemControl')}
                        onChange={(e) => {
                          e.preventDefault();
                          clickCheckbox('ckbTemControl');
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Handling" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFSelect size="small" name="ddlCoilHandling" label="Coil handling" placeholder="">
                        <option value="" />
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </RHFSelect>{' '}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Project Information" />
                  <CardContent>
                    <TableContainer component={Paper} dense="true">
                      <Scrollbar>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              {ProjectInfoTableHeader.map((item, index) => (
                                <TableCell key={index} component="th" scope="row" align="left">
                                  {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {submittalDetailInfo.map((row, index) => (
                              <Row row={row} key={index} />
                            ))}
                          </TableBody>
                        </Table>
                      </Scrollbar>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Notes" />
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        sx={{ width: '70%' }}
                        size="small"
                        name="notes"
                        label="Enter Notes"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <Button
                        sx={{ width: '30%', borderRadius: '5px', mt: '1px' }}
                        variant="contained"
                        onClick={addNoteClicked}
                      >
                        Add Note
                      </Button>
                    </Stack>
                    <Box sx={{ pt: '10px' }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" sx={{ width: '20%' }} scope="row" align="center">
                              No
                            </TableCell>
                            <TableCell component="th" sx={{ width: '80%' }} scope="row" align="center">
                              Note
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {notes.gvNotesDataSource.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="center">
                                {index + 1}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center">
                                {row.notes}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Shipping Instructions" />
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        sx={{ width: '70%' }}
                        size="small"
                        name="shipping"
                        label="Enter Shipping"
                        value={shippingNote}
                        onChange={(e) => setShippingNote(e.target.value)}
                      />
                      <Button
                        sx={{ width: '30%', borderRadius: '5px', mt: '1px' }}
                        variant="contained"
                        onClick={addShippingInstructionClicked}
                      >
                        Add Shipping Instruction
                      </Button>
                    </Stack>
                    <Box sx={{ pt: '10px' }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" sx={{ width: '20%' }} align="center">
                              No
                            </TableCell>
                            <TableCell component="th" sx={{ width: '80%' }} align="center">
                              Shipping Instruction
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {shippingNotes.gvShippingNotesDataSource.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="center">
                                {index + 1}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center">
                                {row.shipping_notes}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => {
            setSuccess(false);
          }}
        >
          <Alert
            onClose={() => {
              setSuccess(false);
            }}
            severity="success"
            sx={{ width: '100%' }}
          >
            Submittal Information Saved!
          </Alert>
        </Snackbar>
        <Snackbar
          open={fail}
          autoHideDuration={6000}
          onClose={() => {
            setFail(false);
          }}
        >
          <Alert
            onClose={() => {
              setFail(false);
            }}
            severity="error"
            sx={{ width: '100%' }}
          >
            Server Error!
          </Alert>
        </Snackbar>
      </RootStyle>
    </Page>
  );
}

Row.propTypes = {
  row: PropTypes.object,
};
function Row({ row }) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="left">
        {row.qty}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.tag}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.item}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.model}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.voltage}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.controls_preference}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.installation}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.duct_connection}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.handing}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.part_desc}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.part_number}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {row.pricing}
      </TableCell>
    </TableRow>
  );
}
