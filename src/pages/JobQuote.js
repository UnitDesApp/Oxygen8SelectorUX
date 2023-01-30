import { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
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
  Typography,
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
import { getQuoteInfo, saveQuoteInfo, addNewMisc, addNewNotes } from '../redux/slices/quoteReducer';
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

const DefaultMiscValues = {
  txbMisc: '',
  txbMiscQty: '1',
  txbMiscPrice: '0.0',
};

export default function JobQuote() {
  const { jobId } = useParams();
  // const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {
    isLoading,
    quoteFormInfo,
    quoteControlInfo,
    gvPricingGeneral,
    gvPricingUnits,
    gvPricingTotal,
    gvMisc,
    gvNotes,
  } = useSelector((state) => state.quote);

  // State
  const [objMisc, setMisc] = useState(DefaultMiscValues);
  const [txbNotes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // Form Schema
  const UpdateJobInfoSchema = Yup.object().shape({
    txbRevisionNo: Yup.string().required('This field is required!'),
    txbProjectName: Yup.string().required('This field is required!'),
    txbQuoteNo: Yup.string().required('This field is required!'),
    txbTerms: Yup.string(),
    txbCreatedDate: Yup.string(),
    txbRevisedDate: Yup.string(),
    txbValidDate: Yup.string(),
    txbCurrencyRate: Yup.string().required('This field is required!'),
    txbShippingFactor: Yup.string().required('This field is required!'),
    txbPriceShipping: Yup.string().required('This field is required!'),
    txbDiscountFactor: Yup.string().required('This field is required!'),
    txbPriceDiscount: Yup.string().required('This field is required!'),
    txbPriceAllUnits: Yup.string().required('This field is required!'),
    txbPriceMisc: Yup.string().required('This field is required!'),
    txbPriceSubtotal: Yup.string().required('This field is required!'),
    txbPriceFinalTotal: Yup.string().required('This field is required!'),
    ddlQuoteStageVal: Yup.string().required('This field is required!'),
    ddlFOB_PointVal: Yup.string().required('This field is required!'),
    ddlCountryVal: Yup.string().required('This field is required!'),
    ddlShippingTypeVal: Yup.string().required('This field is required!'),
    ddlDiscountTypeVal: Yup.string().required('This field is required!'),
  });

  // default values for form depend on redux
  const defaultValues = useMemo(
    () => ({
      txbRevisionNo: quoteFormInfo.txbRevisionNo !== undefined ? quoteFormInfo.txbRevisionNo : '',
      txbProjectName: quoteFormInfo.txbProjectName !== undefined ? quoteFormInfo.txbProjectName : '',
      txbQuoteNo: quoteFormInfo.txbQuoteNo !== undefined ? quoteFormInfo.txbQuoteNo : '',
      txbTerms: quoteFormInfo.txbTerms !== undefined ? quoteFormInfo.txbTerms : '',
      txbCreatedDate: quoteFormInfo.txbCreatedDate !== undefined ? quoteFormInfo.txbCreatedDate : '',
      txbRevisedDate: quoteFormInfo.txbRevisedDate !== undefined ? quoteFormInfo.txbRevisedDate : '',
      txbValidDate: quoteFormInfo.txbValidDate !== undefined ? quoteFormInfo.txbValidDate : '',
      txbCurrencyRate: quoteFormInfo.txbCurrencyRate !== undefined ? quoteFormInfo.txbCurrencyRate : '',
      txbShippingFactor: quoteFormInfo.txbShippingFactor !== undefined ? quoteFormInfo.txbShippingFactor : '',
      txbPriceShipping: quoteFormInfo.txbPriceShipping !== undefined ? quoteFormInfo.txbPriceShipping : '',
      txbDiscountFactor: quoteFormInfo.txbDiscountFactor !== undefined ? quoteFormInfo.txbDiscountFactor : '',
      txbPriceDiscount: quoteFormInfo.txbPriceDiscount !== undefined ? quoteFormInfo.txbPriceDiscount : '',
      txbPriceAllUnits: quoteFormInfo.txbPriceAllUnits !== undefined ? quoteFormInfo.txbPriceAllUnits : '',
      txbPriceMisc: quoteFormInfo.txbPriceMisc !== undefined ? quoteFormInfo.txbPriceMisc : '',
      txbPriceSubtotal: quoteFormInfo.txbPriceSubtotal !== undefined ? quoteFormInfo.txbPriceSubtotal : '',
      txbPriceFinalTotal: quoteFormInfo.txbPriceFinalTotal !== undefined ? quoteFormInfo.txbPriceFinalTotal : '',
      ddlQuoteStageVal: quoteFormInfo.ddlQuoteStageVal !== undefined ? quoteFormInfo.ddlQuoteStageVal : '',
      ddlFOB_PointVal: quoteFormInfo.ddlFOB_PointVal !== undefined ? quoteFormInfo.ddlFOB_PointVal : '',
      ddlCountryVal: quoteFormInfo.ddlCountryVal !== undefined ? quoteFormInfo.ddlCountryVal : '',
      ddlShippingTypeVal: quoteFormInfo.ddlShippingTypeVal !== undefined ? quoteFormInfo.ddlShippingTypeVal : '',
      ddlDiscountTypeVal: quoteFormInfo.ddlDiscountTypeVal !== undefined ? quoteFormInfo.ddlDiscountTypeVal : '',
    }),
    [quoteFormInfo]
  );

  // form setting using useForm
  const methods = useForm({
    resolver: yupResolver(UpdateJobInfoSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = methods;

  // will be updated when default valuse is changed depend on redux
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // // getting all form data from server
  useEffect(() => {
    dispatch(
      getQuoteInfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intUnitNo: state,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // event handler for addding note
  const addMiscClicked = () => {
    const data = {
      ...objMisc,
      intJobID: jobId,
    };
    dispatch(addNewMisc(data));
    setMisc(DefaultMiscValues);
  };

  // event handler for adding shipping note
  const addNoteClicked = () => {
    const data = {
      intJobID: jobId,
      txbNotes,
    };
    dispatch(addNewNotes(data));
    setNotes('');
  };

  // export pdf of form data
  const downloadPDF = async () => {
    const data = {
      ...getValues(),
      intJobID: jobId,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
    };

    const response = await axios.post(`${serverUrl}/api/quote/exportPdf`, data, { responseType: 'blob' });
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
    saveAs(response.data, `${filename}.pdf`);

    console.log('Successed');
  };

  // export pdf of form data
  const downloadExcel = async () => {
    // there is no api in backend... (:
  };

  // submmit function
  const onQuoteSubmit = async (data) => {
    try {
      const quoteData = {
        ...data,
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
      };
      const result = await dispatch(saveQuoteInfo(quoteData));
      if (result === 'success') {
        setSuccess(true);
      } else {
        setFail(true);
      }
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onQuoteSubmit)}>
            <HeaderBreadcrumbs
              heading="Job Quote"
              links={[
                { name: 'My Jobs', href: PATH_JOBS.root },
                { name: 'My Dashboard', href: PATH_JOB.dashboard(jobId) },
                { name: 'Job Quote' },
              ]}
              action={
                <Stack direction="row" spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <Button href={PATH_JOB.jobEdit(jobId)}>Edit Project</Button>
                  <Button href={PATH_UNIT.view(jobId)}>Unit List</Button>
                  <Button startIcon={<Iconify icon={'grommet-icons:document-pdf'} />} onClick={downloadPDF}>
                    Roport
                  </Button>
                  <Button startIcon={<Iconify icon={'file-icons:microsoft-excel'} />} onClick={downloadExcel}>
                    Report
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
                  <CardHeaderStyle title="Job Info" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbRevisionNo" label="Revision No" />
                      <RHFSelect size="small" name="ddlQuoteStageVal" label="Stage" placeholder="">
                        <option value="" />
                        {quoteControlInfo.ddlQuoteStage.map((ele, index) => (
                          <option key={index + ele.id} value={ele.id}>
                            {ele.items}
                          </option>
                        ))}
                        <option value="2">USA</option>
                      </RHFSelect>
                      <RHFTextField size="small" name="txbProjectName" label="Project Name" />
                      <RHFTextField size="small" name="txbQuoteNo" label="Quote No" />
                      <RHFSelect size="small" name="ddlFOB_PointVal" label="F.O.B. Point" placeholder="">
                        <option value="" />
                        {quoteControlInfo.ddlFOB_Point.map((ele, index) => (
                          <option key={index + ele.id} value={ele.id}>
                            {ele.items}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFTextField size="small" name="txbTerms" label="Terms" disabled />
                      <RHFTextField size="small" name="txbCreatedDate" label="Created Date" disabled />
                      <RHFTextField size="small" name="txbRevisedDate" label="Revised Date" disabled />
                      <RHFTextField size="small" name="txbValidDate" label="Valid Date" disabled />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Price Setting" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFSelect size="small" name="ddlCountryVal" label="Country" placeholder="">
                        <option value="" />
                        {quoteControlInfo.ddlCountry.map((ele, index) => (
                          <option key={index + ele.id} value={ele.id}>
                            {ele.items}
                          </option>
                        ))}{' '}
                      </RHFSelect>
                      <RHFTextField size="small" name="txbCurrencyRate" label="Currency Rate" />
                      <Stack direction="row">
                        <RHFTextField size="small" name="txbShippingFactor" label="Shipping" />
                        <RHFSelect size="small" name="ddlShippingTypeVal" label="Unit" placeholder="">
                          <option value="" />
                          <option value="1">%</option>
                          <option value="2">$</option>
                        </RHFSelect>
                      </Stack>
                      <Stack direction="row">
                        <RHFTextField size="small" name="txbDiscountFactor" label="Discount" />
                        <RHFSelect size="small" name="ddlDiscountTypeVal" label="Unit" placeholder="">
                          <option value="" />
                          <option value="1">%</option>
                          <option value="2">$</option>
                        </RHFSelect>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Final Pricing" />
                  <CardContent>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField size="small" name="txbPriceAllUnits" label="Price All Units ($)" />
                      <RHFTextField size="small" name="txbPriceMisc" label="Price Misc ($)" />
                      <RHFTextField size="small" name="txbPriceShipping" label="Shipping ($)" />
                      <RHFTextField size="small" name="txbPriceSubtotal" label="Sub Total ($)" />
                      <RHFTextField size="small" name="txbPriceDiscount" label="Discount ($)" />
                      <RHFTextField size="small" name="txbPriceFinalTotal" label="Final Total ($)" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <TableContainer component={Paper} dense="true">
                      <Scrollbar>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="left">
                                NOTES
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                F.O.B. POINT
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                TERMS
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {gvPricingGeneral.gvPricingGeneralDataSource.map((item, i) => (
                              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                  dangerouslySetInnerHTML={{ __html: item.notes }}
                                  component="th"
                                  scope="row"
                                  align="left"
                                />
                                <TableCell
                                  dangerouslySetInnerHTML={{ __html: item.fob_point }}
                                  component="th"
                                  scope="row"
                                  align="left"
                                />
                                <TableCell
                                  dangerouslySetInnerHTML={{ __html: item.terms }}
                                  component="th"
                                  scope="row"
                                  align="left"
                                />
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Scrollbar>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {gvPricingUnits.gvPricingErrMsgDataSource.map((msg) => (
                <Typography sx={{ color: 'red' }} key={msg.price_error_msg_no}>
                  {msg.price_error_msg}
                </Typography>
              ))}
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <TableContainer component={Paper} dense="true">
                      <Scrollbar>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="left">
                                No.
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                TAG
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                QTY
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                PRODUCT CODE
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                MODEL NUMBER
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                DESCRIPTION
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                UNIT PRICE
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                AMOUNT
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {gvPricingUnits.gvPricingDataSource.map((item, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                    color: parseInt(item.price_error_msg, 10) === 2 ? 'red' : 'black',
                                  },
                                }}
                              >
                                {console.log(item.price_error_msg)}
                                <TableCell component="th" scope="row" align="left">
                                  {i + 1}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                  {item.tag}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                  {item.qty}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                  {item.unit_type}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                  {item.unit_model}
                                </TableCell>
                                <TableCell
                                  dangerouslySetInnerHTML={{ __html: item.description }}
                                  component="th"
                                  scope="row"
                                  align="left"
                                />
                                <TableCell component="th" scope="row" align="left">
                                  {item.unit_price}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                  {item.unit_price}
                                </TableCell>
                              </TableRow>
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
                  <CardContent>
                    {gvPricingTotal.gvAddInfoDataSource.map((item, i) => (
                      <Typography key={i} sx={{ fontWeight: item.is_add_info_bold ? 600 : 300 }}>
                        {item.add_info}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardHeaderStyle title="Added Miscellaneous" />
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        sx={{ width: '55%' }}
                        size="small"
                        name="txbMisc"
                        label="Enter Miscellaneous"
                        value={objMisc.txbMisc}
                        onChange={(e) => setMisc({ ...objMisc, txbMisc: e.target.value })}
                      />
                      <TextField
                        sx={{ width: '15%' }}
                        size="small"
                        name="txbQty"
                        label="Enter QTY"
                        value={objMisc.txbMiscQty}
                        onChange={(e) => setMisc({ ...objMisc, txbMiscQty: e.target.value })}
                      />
                      <TextField
                        sx={{ width: '15%' }}
                        size="small"
                        name="txbPrice"
                        label="Enter Price"
                        value={objMisc.txbMiscPrice}
                        onChange={(e) => setMisc({ ...objMisc, txbMiscPrice: e.target.value })}
                      />
                      <Button
                        sx={{ width: '15%', borderRadius: '5px', mt: '1px' }}
                        variant="contained"
                        onClick={addMiscClicked}
                      >
                        Add Miscellaneous
                      </Button>
                    </Stack>
                    <Box sx={{ pt: '10px' }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" sx={{ width: '10%' }} scope="row" align="center">
                              No
                            </TableCell>
                            <TableCell component="th" sx={{ width: '60%' }} scope="row" align="center">
                              Miscellaneous
                            </TableCell>
                            <TableCell component="th" sx={{ width: '15%' }} scope="row" align="center">
                              Qty
                            </TableCell>
                            <TableCell component="th" sx={{ width: '15%' }} scope="row" align="center">
                              Price
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {gvMisc?.gvMiscDataSource.map((row) => (
                            <TableRow key={row.misc_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="center">
                                {row.misc_no}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center">
                                {row.misc}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center">
                                {row.qty}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center">
                                {row.price}
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
                  <CardHeaderStyle title="Added Note" />
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        sx={{ width: '70%' }}
                        size="small"
                        name="txbNotes"
                        label="Enter Note"
                        value={txbNotes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <Button
                        sx={{ width: '30%', borderRadius: '5px', mt: '1px' }}
                        variant="contained"
                        onClick={addNoteClicked}
                      >
                        Add Notes
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
                              Notes
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {gvNotes?.gvNotesDataSource.map((row) => (
                            <TableRow key={row.notes_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row" align="center">
                                {row.notes_no}
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
