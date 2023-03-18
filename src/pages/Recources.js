import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Divider } from '@mui/material';

// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from '../components/Iconify';

// sections
import { ResourceTable, ResourceHeader } from '../sections/resources';

// ----------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const resources = [
  {
    title: 'NOVA',
    id: 'nova',
    items: [
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
    ],
  },
  {
    title: 'TERRA',
    id: 'terra',
    items: [
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
    ],
  },
  {
    title: 'VENTUM',
    id: 'ventum',
    items: [
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
    ],
  },
  {
    title: 'VENTUM LITE',
    id: 'ventum_lite',
    items: [
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
      {
        fileName: 'Flexible Connections',
        fileType: 'PDF',
        date: 'Jan 10, 2022',
        href: '/assets/Layouts/layout_nova_in_h_lh.png',
      },
    ],
  },
];

export default function Resources() {
  const [currentTab, onChangeTab] = useState('all');
  return (
    <Page title="Resources">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs
            heading="Resources"
            links={[{ name: '', href: '' }]}
            action={
              <Button variant="contained" startIcon={<Iconify icon="ic:outline-plus" />}>
                Oxygen8 sales team contact sheet
              </Button>
            }
          />
          <ResourceHeader curValue={currentTab} updateCurValue={onChangeTab} />
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{ display: 'grid', gridTemplateColumns: currentTab === 'all' ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)' }}
          >
            {resources.map(
              (res) =>
                (res.id === currentTab || currentTab === 'all') && (
                  <ResourceTable key={res.id} objResources={res.items} title={res.title} sx={{ width: '100%' }} />
                )
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
