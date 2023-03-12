import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box } from '@mui/material';

// components
import ApplicationItem from './ApplicationItem';

const applications = [
  // { id: 1, items: 'Residential' },
  { id: 1, items: 'Comercial' },
];

// ----------------------------------------------------------------------
SelectApplication.propTypes = {
  // productTypes: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function SelectApplication(props) {
  const {
    // productTypes,
    onSelectItem,
  } = props;

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
                xs: `repeat(${applications.length}, 1fr)`,
              },
            }}
          >
            {applications.map((ele) => (
              <ApplicationItem
                key={ele.id}
                label={ele.items}
                onSelectItem={() => {
                  onSelectItem(ele.items, ele.id);
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
