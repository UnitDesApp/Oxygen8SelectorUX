import { useState, useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// redux
import { getAccountInfo } from '../redux/slices/AccountReducer';
import { useDispatch } from '../redux/store';

// components
import { AccountGeneral} from '../sections/account';
import Loading from '../sections/Loading';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
export default function Account() {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const get = async () => {
      await dispatch(getAccountInfo());
      setIsloading(false);
    };
    get();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs heading="My Account" links={[{ name: 'Edit Account' }]} />
          <AccountGeneral />
        </Container>
      </RootStyle>
    </Page>
  );
}
