import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Stack,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';

// import { PATH_PROJECT } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

// Quote.propTypes = {

// };

export default function Status() {
  // const navigate = useNavigate();
  const theme = useTheme();
  const [alignment, setAlignment] = useState('stage1');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card sx={{ color: theme.palette.primary.main }} variant='outlined'>
            <CardHeader title="Project Status" subheader="Loren ipsum dolor sit amet, consectetur adipiscing elit." />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:check-circle-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.info.light }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 1" secondary="Complete job info" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:check-circle-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.info.light }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 2" secondary="Add units" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:cancel-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.error.main }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 3" secondary="Make a selection" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:cancel-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.error.main }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 4" secondary="Submit drawings" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ color: theme.palette.primary.main }} variant='outlined'>
            <CardHeader title="Submittal Status" subheader="To request a submittal, you must complete the following 4 steps" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:check-circle-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.info.light }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 1" secondary="Lorem ipsum dolor sit" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:check-circle-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.info.light }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 2" secondary="Lorem ipsum dolor sit" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:cancel-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.error.main }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 3" secondary="Lorem ipsum dolor sit" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Iconify
                      color="success"
                      icon="material-symbols:cancel-outline"
                      sx={{ width: '30px', height: '30px', color: theme.palette.error.main }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Step 4" secondary="Lorem ipsum dolor sit" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
