import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box } from '@mui/material';

// components
import ProductTypeItem from './ProductTypeItem';

// ----------------------------------------------------------------------
const productType = ['Nova', 'Ventum', 'Terra', 'Ventum Lite'];

ProductType.propTypes = {
  // productType: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function ProductType(props) {
  const {
    // productType,
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
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: `repeat(4, 1fr)`,
              },
            }}
          >
            {productType.map((item, index) => (
              <ProductTypeItem
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
