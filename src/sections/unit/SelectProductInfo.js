// react
import { useState, useCallback } from 'react';
// prop-types
import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box, Tabs, Tab } from '@mui/material';

// redux
import { useSelector } from 'react-redux';

// components
import { ProductTypes, Applications, SideDescription, UnitTypes } from './SelectProductInfo/index';

const productInfomation = {
  image: '/assets/Images/img_nova_2.png',
  description:
    'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, id bibendum diam malesuada. Nulla facilisi.',
};

// ----------------------------------------------------------------------
SelectProductInfo.propTypes = {
  onSelectAppliaionItem: PropTypes.func,
  onSelectProductTypeItem: PropTypes.func,
  onSelectUnitTypeItem: PropTypes.func,
};

export default function SelectProductInfo(props) {
  const { data } = useSelector((state) => state.base);
  const { onSelectAppliaionItem, onSelectProductTypeItem, onSelectUnitTypeItem } = props;
  const [applicationValue, setApplicationValue] = useState('Application');
  const [productTypeValue, setProductTypeValue] = useState('Product type');
  const [productTypeID, setProductTypeID] = useState(-1);
  const [unitTypeValue, setUnitTypeValue] = useState('Unit type');

  const [isOpenSideDescriptionOfProductType, SetIsOpenSideDescriptionOfProductType] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const onSelectApplicationValue = useCallback(
    (label, id) => {
      onSelectAppliaionItem(id, label);
      setApplicationValue(label);
      setValue(1);
    },
    [onSelectAppliaionItem]
  );

  const onSelectProductTypeValue = useCallback(
    (label, id) => {
      onSelectProductTypeItem(id, label);
      setProductTypeValue(label);
      setProductTypeID(id);
      setValue(2);
    },
    [onSelectProductTypeItem]
  );

  const onSelectUnitTypeValue = useCallback(
    (label, id) => {
      onSelectUnitTypeItem(id, label);
      setUnitTypeValue(label);
      SetIsOpenSideDescriptionOfProductType(true);
    },
    [onSelectUnitTypeItem]
  );

  return (
    <Container>
      <Card sx={{ minWidth: 500, mb: '100px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={applicationValue} />
          <Tab label={productTypeValue} disabled={applicationValue === 'Application'} />
          <Tab label={unitTypeValue} disabled={productTypeValue === 'Product type'} />
        </Tabs>
        <CardContent>
          <TabPanel value={value} index={0}>
            <Applications
              // productTypes={productTypeDataTbl}
              onSelectItem={onSelectApplicationValue}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductTypes productTypes={data?.prodType} onSelectItem={onSelectProductTypeValue} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UnitTypes
              productTypeID={productTypeID}
              productTypeUnitTypeLinkDataTbl={data?.prodTypeUnitTypeLink}
              onSelectItem={onSelectUnitTypeValue}
            />
          </TabPanel>
        </CardContent>
      </Card>
      <Box sx={{ width: '300px' }}>
        <SideDescription
          open={isOpenSideDescriptionOfProductType}
          handleDrawerClose={() => SetIsOpenSideDescriptionOfProductType(false)}
          productInfomation={productInfomation}
          sx={{ width: '300px' }}
        />
      </Box>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
