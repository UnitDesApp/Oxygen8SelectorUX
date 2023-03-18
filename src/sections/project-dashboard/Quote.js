import { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
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
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import * as quoteReducer from '../../redux/slices/quoteReducer';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------
const DefaultMiscValues = {
  txbMisc: '',
  txbMiscQty: '1',
  txbMiscPrice: '0.0',
};

const CustomGroupBoxBorder = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  minWidth: '0',
  padding: '10px',
  margin: '0',
  verticalAlign: 'top',
  width: '100%',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '8px',
}));

const CustomGroupBoxTitle = styled(Typography)(() => ({
  lineHeight: '1.4375em',
  fontSize: '25px',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 400,
  // color: 'rgb(145, 158, 171)',
  display: 'block',
  transformOrigin: 'left top',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 'calc(133% - 24px)',
  position: 'absolute',
  left: '0px',
  top: '0px',
  transform: 'translate(40px, -12px) scale(0.75)',
  transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms',
  zIndex: 100,
  background: 'white',
  paddingLeft: '10px',
  paddingRight: '10px',
}));

// -------------------------------------------------------------------------------

CustomGroupBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  bordersx: PropTypes.object,
  titlesx: PropTypes.object,
};

function CustomGroupBox({ title, children, bordersx, titlesx }) {
  return (
    <CustomGroupBoxBorder sx={{ ...bordersx }}>
      <CustomGroupBoxTitle sx={{ ...titlesx }}>{title}</CustomGroupBoxTitle>
      <Box sx={{ padding: '20px' }}>{children}</Box>
    </CustomGroupBoxBorder>
  );
}

// ----------------------------------------------------------------------
// Quote.propTypes = {

// };

export default function Quote() {
  const theme = useTheme();
  const { projectId } = useParams();
  const { unitList } = useSelector((state) => state.projectDashboard);
  const dispatch = useDispatch();

  const [alignment, setAlignment] = useState('stage1');
  const [isLoading, setIsLoading] = useState(false);
  const [doWannaGenerate, setDoWannaGenerate] = useState(false);

  useEffect(() => {
    const getQuoteInitInfo = () => {
      setIsLoading(true);
      dispatch(
        quoteReducer.getQuoteInfo({
          intUserID: localStorage.getItem('userId'),
          intUAL: localStorage.getItem('UAL'),
          intJobID: projectId,
          intUnitNo: 1,
        })
      );
      setIsLoading(false);
    };

    if (unitList.length > 0) getQuoteInitInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const wannaGenerate = () => {
    if (unitList.length > 0) setDoWannaGenerate(true);
  };

  const { quoteFormInfo, quoteControlInfo, gvPricingGeneral, gvPricingUnits, gvPricingTotal, gvMisc, gvNotes } =
    useSelector((state) => state.quote);

  // State
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
    formState: { isSubmitting },
  } = methods;

  // will be updated when default valuse is changed depend on redux
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // event handler for addding misc
  const addMisc = async (objMisc) => {
    const data = {
      ...objMisc,
      intJobID: projectId,
    };
    await dispatch(quoteReducer.addNewMisc(data));
  };

  const updateMisc = async (objMisc, miscNo) => {
    const data = {
      ...objMisc,
      intJobID: projectId,
      miscNo,
    };
    await dispatch(quoteReducer.updateMisc(data));
  };

  const deleteMisc = async (miscNo) => {
    const data = {
      intJobID: projectId,
      miscNo,
    };
    await dispatch(quoteReducer.deleteMisc(data));
  };

  // event handler for adding notes
  const addNotes = async (txbNotes) => {
    const data = {
      intJobID: projectId,
      txbNotes,
    };
    await dispatch(quoteReducer.addNewNotes(data));
  };

  const updateNotes = async (txbNotes, notesNo) => {
    const data = {
      intJobID: projectId,
      txbNotes,
      notesNo,
    };
    await dispatch(quoteReducer.updateNotes(data));
  };

  const deleteNotes = async (notesNo) => {
    const data = {
      intJobID: projectId,
      notesNo,
    };
    await dispatch(quoteReducer.deleteNotes(data));
  };

  // submmit function
  const onQuoteSubmit = async (data) => {
    try {
      const quoteData = {
        ...data,
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: projectId,
      };
      const result = await dispatch(quoteReducer.saveQuoteInfo(quoteData));
      if (result === 'success') {
        setSuccess(true);
      } else {
        setFail(true);
      }
    } catch (error) {
      setFail(true);
    }
  };

  return (
    <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {isLoading ? (
        <LinearProgress color="info" />
      ) : (
        !doWannaGenerate && (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={5}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
              Select a stage to generate a quote
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="stage1">
                <Stack direction="row" spacing={2} justifyContent="center" alignContent="center">
                  {alignment === 'stage1' && (
                    <Iconify icon="material-symbols:check-circle-outline" sx={{ marginTop: '5px' }} />
                  )}
                  Stage
                </Stack>
              </ToggleButton>
              <ToggleButton value="stage2">
                {alignment === 'stage2' && <Iconify icon="material-symbols:check-circle-outline" />}
                Stage
              </ToggleButton>
              <ToggleButton value="stage3">
                {alignment === 'stage3' && <Iconify icon="material-symbols:check-circle-outline" />}
                Stage
              </ToggleButton>
              <ToggleButton value="stage4">
                {alignment === 'stage4' && <Iconify icon="material-symbols:check-circle-outline" />}
                Stage
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              onClick={wannaGenerate}
              color="primary"
              variant="contained"
              endIcon={<Iconify icon="ooui:arrow-next-ltr" />}
            >
              Generate Group
            </Button>
          </Stack>
        )
      )}
      {!isLoading && doWannaGenerate && (
        <>
          <Container sx={{ mb: '50px' }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onQuoteSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomGroupBox title={'Project Info'}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="txbRevisionNo" label="Revision No" />
                          <RHFSelect size="small" name="ddlQuoteStageVal" label="Stage" placeholder="">
                            <option value="" />
                            {quoteControlInfo?.ddlQuoteStage?.map((ele, index) => (
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
                            {quoteControlInfo?.ddlFOB_Point?.map((ele, index) => (
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
                      </CustomGroupBox>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomGroupBox title={'Price Setting'}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="ddlCountryVal" label="Country" placeholder="">
                            <option value="" />
                            {quoteControlInfo?.ddlCountry?.map((ele, index) => (
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
                      </CustomGroupBox>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CustomGroupBox title={'Final Pricing'}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="txbPriceAllUnits" label="Price All Units ($)" />
                          <RHFTextField size="small" name="txbPriceMisc" label="Price Misc ($)" />
                          <RHFTextField size="small" name="txbPriceShipping" label="Shipping ($)" />
                          <RHFTextField size="small" name="txbPriceSubtotal" label="Sub Total ($)" />
                          <RHFTextField size="small" name="txbPriceDiscount" label="Discount ($)" />
                          <RHFTextField size="small" name="txbPriceFinalTotal" label="Final Total ($)" />
                        </Box>
                      </CustomGroupBox>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <CustomGroupBox title={''}>
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
                            {gvPricingGeneral?.gvPricingGeneralDataSource?.map((item, i) => (
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
                  </CustomGroupBox>
                </Grid>
                <Grid item xs={12}>
                  {gvPricingUnits?.gvPricingErrMsgDataSource?.map((msg) => (
                    <Typography sx={{ color: 'red' }} key={msg.price_error_msg_no}>
                      {msg.price_error_msg}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <CustomGroupBox>
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
                            {gvPricingUnits?.gvPricingDataSource?.map((item, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                    color: parseInt(item.price_error_msg, 10) === 2 ? 'red' : 'black',
                                  },
                                }}
                              >
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
                  </CustomGroupBox>
                </Grid>
                <Grid item xs={12}>
                  <CustomGroupBox>
                    {gvPricingTotal.gvAddInfoDataSource.map((item, i) => (
                      <Typography key={i} sx={{ fontWeight: item.is_add_info_bold ? 600 : 300 }}>
                        {item.add_info}
                      </Typography>
                    ))}
                  </CustomGroupBox>
                </Grid>
                <Grid item xs={12}>
                  <CustomGroupBox title="Added Miscellaneous">
                    <MiscNotesEditTable
                      tableData={gvMisc.gvMiscDataSource}
                      addRow={addMisc}
                      updateRow={updateMisc}
                      deleteRow={deleteMisc}
                    />
                  </CustomGroupBox>
                </Grid>
                <Grid item xs={12}>
                  <CustomGroupBox title="Added Note">
                    <NotesEditTable
                      tableData={gvNotes.gvNotesDataSource}
                      addRow={addNotes}
                      updateRow={updateNotes}
                      deleteRow={deleteNotes}
                    />
                  </CustomGroupBox>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent={'flex-end'}>
                    <LoadingButton
                      type="submit"
                      startIcon={<Iconify icon={'fluent:save-24-regular'} />}
                      loading={isSubmitting}
                      sx={{ width: '150px' }}
                    >
                      Save Changes
                    </LoadingButton>
                  </Stack>
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
        </>
      )}
    </Box>
  );
}

NotesEditTable.propTypes = {
  tableData: PropTypes.array,
  addRow: PropTypes.func,
  deleteRow: PropTypes.func,
  updateRow: PropTypes.func,
};

function NotesEditTable({ tableData, addRow, deleteRow, updateRow }) {
  const [txbNotes, setNotes] = useState('');
  const [selectedID, setSelectedID] = useState(-1);
  const theme = useTheme();

  const addNoteClicked = async () => {
    if (txbNotes) {
      await addRow(txbNotes);
      setNotes('');
      setSelectedID(-1);
    }
  };

  const updateNoteClicked = async () => {
    await updateRow(txbNotes, selectedID);
    setNotes('');
    setSelectedID(-1);
  };

  const cancelEditClicked = () => {
    setNotes('');
    setSelectedID(-1);
  };

  const selectRowClicked = (txt, id) => {
    setNotes(txt);
    setSelectedID(id);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          sx={{ width: '70%' }}
          size="small"
          name="txbNotes"
          label="Enter Note"
          value={txbNotes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {selectedID > 0 ? (
          <Stack direction="row" spacing={1} sx={{ width: '30%' }}>
            <Button
              sx={{ width: '50%', borderRadius: '5px', mt: '1px' }}
              variant="contained"
              onClick={updateNoteClicked}
            >
              Update Notes
            </Button>
            <Button
              sx={{ width: '30%', borderRadius: '5px', mt: '1px' }}
              variant="contained"
              onClick={cancelEditClicked}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button sx={{ width: '30%', borderRadius: '5px', mt: '1px' }} variant="contained" onClick={addNoteClicked}>
            Add Notes
          </Button>
        )}
      </Stack>
      <Box sx={{ pt: '10px' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" sx={{ width: '20%' }} align="center">
                No
              </TableCell>
              <TableCell component="th" sx={{ width: '70%' }} align="center">
                Notes
              </TableCell>
              <TableCell component="th" sx={{ width: '5%' }} align="center" />
              <TableCell component="th" sx={{ width: '5%' }} align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData !== undefined &&
              tableData.map((row) => (
                <TableRow key={row.notes_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.notes_no}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.notes}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <IconButton
                      sx={{ color: theme.palette.success.main }}
                      onClick={() => selectRowClicked(row.notes, row.notes_no)}
                    >
                      <Iconify icon={'material-symbols:edit-square-outline'} />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center" onClick={() => deleteRow(row.notes_no)}>
                    <IconButton sx={{ color: theme.palette.warning.main }}>
                      <Iconify icon={'ion:trash-outline'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

MiscNotesEditTable.propTypes = {
  tableData: PropTypes.array,
  addRow: PropTypes.func,
  deleteRow: PropTypes.func,
  updateRow: PropTypes.func,
};

function MiscNotesEditTable({ tableData, addRow, deleteRow, updateRow }) {
  const [objMisc, setMisc] = useState(DefaultMiscValues);
  const [selectedID, setSelectedID] = useState(-1);
  const theme = useTheme();

  const addMiscClicked = () => {
    if (objMisc.txbMisc) {
      addRow(objMisc);
      setMisc(DefaultMiscValues);
      setSelectedID(-1);
    }
  };

  const updateMiscClicked = () => {
    updateRow(objMisc, selectedID);
    setMisc(DefaultMiscValues);
    setSelectedID(-1);
  };

  const cancelEditClicked = () => {
    setMisc(DefaultMiscValues);
    setSelectedID(-1);
  };

  const selectRowClicked = (row) => {
    setMisc({
      txbMisc: row.misc,
      txbMiscQty: row.qty,
      txbMiscPrice: row.price.substring(1),
    });
    setSelectedID(row.misc_no);
  };

  return (
    <>
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

        {selectedID > 0 ? (
          <Stack direction="row" spacing={1} sx={{ width: '30%' }}>
            <Button
              sx={{ width: '50%', borderRadius: '5px', mt: '1px' }}
              variant="contained"
              onClick={updateMiscClicked}
            >
              Update Misc
            </Button>
            <Button
              sx={{ width: '30%', borderRadius: '5px', mt: '1px' }}
              variant="contained"
              onClick={cancelEditClicked}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button sx={{ width: '30%', borderRadius: '5px', mt: '1px' }} variant="contained" onClick={addMiscClicked}>
            Add Misc
          </Button>
        )}
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
              <TableCell component="th" sx={{ width: '5%' }} align="center" />
              <TableCell component="th" sx={{ width: '5%' }} align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData !== undefined &&
              tableData.map((row) => (
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
                  <TableCell component="th" scope="row" align="center">
                    <IconButton sx={{ color: theme.palette.success.main }} onClick={() => selectRowClicked(row)}>
                      <Iconify icon={'material-symbols:edit-square-outline'} />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center" onClick={() => deleteRow(row.misc_no)}>
                    <IconButton sx={{ color: theme.palette.warning.main }}>
                      <Iconify icon={'ion:trash-outline'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
