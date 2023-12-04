import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { m } from 'framer-motion';
import { Box, CircularProgress, Container, Stack, Typography, styled } from '@mui/material';
import axios from 'axios';
// components
import Page from '../../components/Page';
import { serverUrl } from '../../config';
import { MotionContainer, varBounce } from '../../components/animate';
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function EmailVerification() {
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const sendingVerificationLink = useCallback(() => {
    setIsVerifying(true);
    setIsVerified(false);
    axios.post(`${serverUrl}/api/auth/sendingverifylink`, { email: localStorage.getItem('email') }).then((response) => {
      if (response.data) {
        setIsVerifying(false);
        setIsVerified(true);
      } else {
        setIsVerifying(false);
        setIsVerified(false);
      }
    });
  }, []);

  useEffect(() => {
    if (token !== undefined) {
      setIsVerifying(true);
      setIsVerified(false);
      axios
        .post(`${serverUrl}/api/auth/verifyemail`, { token })
        .then((response) => {
          if (response.data) {
            setIsVerifying(false);
            setIsVerified(true);
            localStorage.setItem('verified', 1);
          }
        })
        .catch((res) => {
          setIsVerifying(false);
          setIsVerified(false);
        });
    } else {
      sendingVerificationLink();
    }
  }, [token, sendingVerificationLink]);

  return (
    <Page title="Email Verification">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Logo />
          {token ? (
            <div>
              {isVerifying ? (
                <Box sx={{ marginTop: '100px' }}>
                  <CircularProgress disableShrink />
                </Box>
              ) : (
                <Stack
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', height: '200px' }}
                >
                  {isVerified ? (
                    <Box sx={{ marginTop: '50px' }}>
                      <m.div variants={varBounce().in}>
                        <Typography variant="h3" paragraph>
                          Congratulation!
                        </Typography>
                      </m.div>

                      <m.div variants={varBounce().in}>
                        <Typography sx={{ color: 'text.secondary' }}> We are verified you!</Typography>
                      </m.div>
                    </Box>
                  ) : (
                    <Box sx={{ marginTop: '50px' }}>
                      <m.div variants={varBounce().in}>
                        <Typography variant="h3" paragraph>
                          Sorry, something went wrong!
                        </Typography>
                      </m.div>

                      <m.div variants={varBounce().in}>
                        <Typography sx={{ color: 'text.secondary' }}>
                          Unfortunately we cannot verify you at this time. Please try again later.
                        </Typography>
                      </m.div>
                    </Box>
                  )}
                </Stack>
              )}
            </div>
          ) : (
            <Box sx={{ marginTop: '100px' }}>
              <m.div variants={varBounce().in}>
                <Typography variant="h3" paragraph>
                  Verification link sent!
                </Typography>
              </m.div>

              <m.div variants={varBounce().in}>
                <Typography sx={{ color: 'text.secondary' }}>Please check your inbox, and verify email!</Typography>
              </m.div>
            </Box>
          )}
        </ContentStyle>
      </Container>
    </Page>
  );
}
