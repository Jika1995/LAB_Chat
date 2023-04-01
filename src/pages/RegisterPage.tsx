import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { EmailAuthProvider, linkWithCredential, updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import '../styles/RegisterPage.css'

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

declare global {
  interface Window { recaptchaVerifier: any;
    confirmationResult: any;
   }
}

export interface IUser {
  phoneNumber: string,
}

const RegisterPage = () : JSX.Element => {
  const [otp, setOtp] : any = useState("");
  const [ph, setPh] : any = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    phoneNumber:'',
  } as IUser);
  const [email, setEmail] : any = useState("")
  const [password, setPassword] : any = useState("");
  const [username, setUsername] : any = useState("");
  const [agree, setAgree] : any = useState(false);

  const credential = EmailAuthProvider.credential(email, password);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response:any) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const onSignup = () => {
    setLoading(true);
    
    if(!agree) {
      alert('You need to agree to our Policy')
      return
    }

    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const onOTPVerify = (): void => {
    console.log(email, password);
    
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res:any) => {
        console.log(res);
        setUser(res.user);
        linkWithCredential(res.user, credential)
        .then((usercred) => {
          const user = usercred.user;
          console.log("Account linking success", user);
        }).catch((error) => {
          console.log("Account linking error", error);
        });
        //или 
        updateProfile(res.user, {
          displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          console.log('Profile updated!')
        }).catch((err) => {
         console.log(err);
        });
        setLoading(false);

      })
      .catch((err:any) => {
        console.log(err);
        setLoading(false);
      });

  }

  useEffect(() => {
    console.log(user);
  }, []);

  // MUI
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const navigate = useNavigate()

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user.phoneNumber ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/* <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1> */}
            {showOTP ? (
              <div className="verif-container">
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} style={{color:"#2196f3"}} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                ></OtpInput>
                {/* <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                  </button> */}
                  
                  <Button variant="contained" fullWidth
                    onClick={onOTPVerify}
                    style={{width:"280px", margin:"15px"}}
                  >
                    {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    Verify OTP
                  </Button>
              </div>
            ) : (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <input type="text" placeholder="email"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}/>
                <input type="text" placeholder="password"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}/>
                <input type="text" placeholder="username"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}/>
                <input type="checkbox"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.currentTarget.checked)}/>
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button> */}
              
                  
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
    
                <Box component="form" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Sign up with:
                  </Typography>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    autoFocus
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                  />
                   {/* <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  /> */}
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />
                  
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    Verify your phone number
                  </Typography>

                  <PhoneInput country={"kg"} value={ph} onChange={setPh} inputClass="inp-phone" />

                  <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Checkbox 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.target.checked)}
                  />
                    <Typography variant="body2">
                      I have read and agree to the terms
                    </Typography>
                  </Box>
                  
                  <Button variant="contained" fullWidth onClick={onSignup}>
                    {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    Sign up
                  </Button>
                </Box>         
              </Container>
            </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegisterPage;