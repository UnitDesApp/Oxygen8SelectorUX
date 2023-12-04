import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box } from '@mui/material';
// components
import UnitTypeItem from './UnitTypeItem';
// ----------------------------------------------------------------------
UnitTypes.propTypes = {
  productTypeID: PropTypes.number,
  productTypeUnitTypeLinkDataTbl: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default function UnitTypes(props) {
  const { productTypeID, productTypeUnitTypeLinkDataTbl, onSelectItem } = props;

  const units = productTypeUnitTypeLinkDataTbl.filter((element) => element.product_type_id === productTypeID)

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
                sm: `repeat(${units.length}, 1fr)`,
              },
            }}
          >
            {units.map((ele) => (
              <UnitTypeItem
                key={ele.unit_type_id}
                label={ele.unit_type}
                onSelectItem={() => {
                  onSelectItem(ele.unit_type, ele.unit_type_id);
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
