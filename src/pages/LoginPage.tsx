import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Container,
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Login" onClick={() => navigate('/login')}/>
          <Tab label="Register" onClick={() => navigate('/register')}/>
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <Box component="form" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Sign in with:
          </Typography>
          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            margin="normal"
            autoFocus
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Checkbox defaultChecked />
            <Typography variant="body2">Remember me</Typography>
          </Box>
          <Button variant="contained" fullWidth>
            Sign in
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Not a member? <a onClick={() => navigate('/register')} style={{cursor:"pointer", textDecoration:"underline"}}>Register</a>
          </Typography>
        </Box>
      )}
      
    </Container>
  )
}

export default LoginPage