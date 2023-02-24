// react
import { useState } from 'react';
// prop-types
import PropTypes from 'prop-types';
// @mui
import { Container, CardContent, Card, Box, Tabs, Tab } from '@mui/material';

// components
import ProductTypes from './ProductTypes';
import Applications from './Applications';
import SideDescription from './SideDescription';

const productInfomation = {
  image: '/assets/Images/img_nova_2.png',
  description:
    'Lorem ipsum dolor sit amet, consecteture adipiscing elit. Duis fringilla porta diam, eu egestas nibh pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, id bibendum diam malesuada. Nulla facilisi.',
};

// ----------------------------------------------------------------------
SelectProductInfo.propTypes = {
  onSelectAppliaionItem: PropTypes.func,
  onSelectProductTypeItem: PropTypes.func,
};

export default function SelectProductInfo(props) {
  const { onSelectAppliaionItem, onSelectProductTypeItem } = props;

  const [applicationValue, setApplicationValue] = useState('Application');
  const [productTypeValue, setProductTypeValue] = useState('Product type');

  const [isOpenSideDescriptionOfProductType, SetIsOpenSideDescriptionOfProductType] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSelectApplicationValue = (label, id) => {
    onSelectAppliaionItem(id);
    setApplicationValue(label);
  };

  const onSelectProductTypeValue = (label, id) => {
    onSelectProductTypeItem(id);
    setProductTypeValue(label);
    SetIsOpenSideDescriptionOfProductType(true);
  };

  return (
    <Container>
      <Card sx={{ minWidth: 500, mb: '100px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={applicationValue} />
          <Tab label={productTypeValue} disabled={applicationValue === 'Application'} />
        </Tabs>
        <CardContent>
          <TabPanel value={value} index={0}>
            <Applications onSelectItem={onSelectApplicationValue} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductTypes onSelectItem={onSelectProductTypeValue} />
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
