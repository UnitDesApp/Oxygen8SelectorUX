import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box } from '@mui/material';

// components
import ApplicationItem from './ApplicationItem';

const applications = ['Residential', 'Comercial'];

// ----------------------------------------------------------------------
SelectApplication.propTypes = {
  // applications: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function SelectApplication(props) {
  const { onSelectItem } = props;

  return (
    <Container>
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              paddingTop: 5,
              alignItems: 'center',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
              },
            }}
          >
            {applications.map((item, index) => (
              <ApplicationItem
                key={index}
                label={item}
                id={index}
                onSelectItem={() => {
                  onSelectItem(item, index);
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
