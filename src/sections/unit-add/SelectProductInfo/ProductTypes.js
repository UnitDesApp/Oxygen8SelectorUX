import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box } from '@mui/material';

// components
import ProductTypeItem from './ProductTypeItem';

// ----------------------------------------------------------------------
ProductType.propTypes = {
  productTypes: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function ProductType(props) {
  const { productTypes, onSelectItem } = props;

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
                sm: `repeat(${productTypes?.length || 0}, 1fr)`,
              },
            }}
          >
            {productTypes?.map((ele) => (
              <ProductTypeItem
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
