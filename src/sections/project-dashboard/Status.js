import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card, CardHeader, CardContent, List, ListItem, ListItemAvatar, ListItemText, LinearProgress } from '@mui/material';

// import { PATH_PROJECT } from '../../routes/paths';
// utils
import axios from '../../utils/axios';
// components
import Iconify from '../../components/Iconify';
// redux
import { useSelector } from '../../redux/store';
// config
import { serverUrl } from '../../config';
// ----------------------------------------------------------------------

export default function Status() {
  const { projectId } = useParams();
  const theme = useTheme();
  const { unitList} = useSelector((state) => state.projectDashboard);
  // const { projectInfo } = useSelector((state) => state.projects);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitDrawing, setSubmitDrawing] = useState(false);
  const [isNoteAdded, setIsNoteAdded] = useState(false);
  const [isShippingNoteAdded, setIsShippingNoteAdded] = useState(false);

  const isCompletedJobInfo = true;
  const isAddedUnits = unitList.length > 0;
  const isMadeASelection = isAddedUnits;

  useEffect(() => {
    const getSubmitalInfo = async () => {
      const {data} = await axios.post(`${serverUrl}/api/Submittals/getAllData`, {
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: projectId,
      });

      console.log(data);
      setSubmitDrawing(data.ckbBACNetPointList !== undefined);
      if (data?.gvNotes?.gvNotesDataSource?.length > 0) setIsNoteAdded(true);
      if (data?.gvShippingNotes?.gvShippingNotesDataSource?.length > 0) setIsShippingNoteAdded(true);
      setIsLoading(false);
    };

    getSubmitalInfo();
  }, []);

  if (isLoading) return <LinearProgress  color="info" />

  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card sx={{ color: theme.palette.primary.main }} variant="outlined">
            <CardHeader title="Project Status" subheader="Loren ipsum dolor sit amet, consectetur adipiscing elit." />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isCompletedJobInfo ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isCompletedJobInfo ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 1" secondary="Complete job info" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isAddedUnits ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isAddedUnits ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 2" secondary="Add units" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isMadeASelection ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',

                        color: isMadeASelection ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 3" secondary="Make a selection" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isSubmitDrawing ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isSubmitDrawing ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 4" secondary="Submit drawings" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ color: theme.palette.primary.main }} variant="outlined">
            <CardHeader
              title="Submittal Status"
              subheader="To request a submittal, you must complete the following 4 steps"
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isSubmitDrawing ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isSubmitDrawing ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 1" secondary="Completed Summary" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isSubmitDrawing ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isSubmitDrawing ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 2" secondary="Completed Ship To Address" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isShippingNoteAdded ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isShippingNoteAdded ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 3" secondary="Added Shipping Instruction" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon={`material-symbols:${isNoteAdded ? 'check-circle' : 'cancel'}-outline`}
                      sx={{
                        width: '30px',
                        height: '30px',
                        color: isNoteAdded ? theme.palette.info.light : theme.palette.error.main,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 4" secondary="Added Notes" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
