import React, { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Divider, LinearProgress } from '@mui/material';
import { intUAL_Admin } from 'src/config';

// redux
import { getFileList } from 'src/redux/slices/ResourceReducer';
import { useDispatch, useSelector } from 'src/redux/store';

// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from '../components/Iconify';

// sections
import { ResourceTable, ResourceHeader } from '../sections/resources';
import { FileUploadDialog } from '../sections/dialog';

// ----------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const resourceNames = {
  nova: 'NOVA',
  terra: 'TERRA',
  ventum: 'VENTUM',
  ventum_lite: 'VENTUM LITE',
};

export default function Resources() {
  const dispatch = useDispatch();
  const [currentTab, onChangeTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const intUAL = localStorage.getItem('UAL');

  const { resource } = useSelector((state) => state.resource);

  useEffect(() => {
    const getAllData = async () => {
      setIsLoading(true);
      await dispatch(getFileList());
      setIsLoading(false);
    };

    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Resources">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs
            heading="Resources"
            links={[{ name: '', href: '' }]}
            action={
              intUAL === intUAL_Admin.toString() && (
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="ic:outline-plus" />}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Upload Files
                </Button>
              )
            }
          />
          <ResourceHeader curValue={currentTab} updateCurValue={onChangeTab} />
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{ display: 'grid', gridTemplateColumns: currentTab === 'all' ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)' }}
          >
            {!isLoading && Object.entries(resource)?.map(
              (item, i) =>
                (item[0] === currentTab || currentTab === 'all') && item[1].length > 0 && (
                  <ResourceTable
                    key={i}
                    resourceType={item[0]}
                    objResources={item[1]}
                    title={resourceNames[item[0]]}
                    sx={{ width: '100%' }}
                  />
                )
            )}
          </Box>
          {
            isLoading &&  <LinearProgress color="info"/>
          }
        </Container>
        <FileUploadDialog
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </RootStyle>
    </Page>
  );
}
