import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import { AccountCircle } from "@mui/icons-material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../firebase";
import {
  getAuth,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  form: {
    width: "100%",
  },
  margin: {
    marginTop: 20,
    marginBottom: 20,
  },
  withoutLabel: {
    marginTop: 15,
  },
  textField: {
    width: "25ch",
  },
  Button: {
    backgroundColor: "rgb(0, 102, 102)",
    color: "#ffffff",
    width: "40%",
    marginTop: 20,
    marginBottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const CaptchaStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  * {
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    margin: 0;
    text-align: center;
  }
`;

const CodeStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  * {
    width: 100%;
    margin: 0;
    text-align: center;
  }
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setTypePassword] = useState(false);
  const [label, setLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  let navigate = useNavigate();
  const [loginStep, setLoginStep] = useState("credentials");
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState();
  const [phone, setPhone] = useState();

  const isAdmin = (uid) => {
    if (uid === window.env.ADMIN_UID || uid === window.env.ADMIN_UID2)
      return true;
    return false;
  };

  const onLogedin = (userCredential) => {
    const uid = userCredential.user.uid;

    if (isAdmin(uid)) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...userCredential, role: "admin" })
      );
      navigate("dashboard/global");
      return;
    }
    setLabel("Utilisateur non autorisé");
    setLoading(false);
  };

  const auth = getAuth();
  const handleLogin = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "reCaptchaContainer",
      undefined,
      auth
    );
    SignIn(email, password)
      .then(function (userCredential) {
        onLogedin(userCredential);
      })
      .catch(function (err) {
        console.log("err de CONEexion", err);
        if (err.code === "auth/multi-factor-auth-required") {
          setLoginStep("captcha");
          setError(err);
          const resolver = getMultiFactorResolver(auth, err);
          if (
            resolver.hints[0].factorId === PhoneMultiFactorGenerator.FACTOR_ID
          ) {
            const phoneInfoOptions = {
              multiFactorHint: resolver.hints[0],
              session: resolver.session,
            };
            setPhone(phoneInfoOptions.multiFactorHint.phoneNumber);
            const phoneAuthProvider = new PhoneAuthProvider(auth);
            // Send SMS verification code
            return phoneAuthProvider
              .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
              .then((newVerificationId) => {
                setLoginStep("code");
                setVerificationId(newVerificationId);
              });
          } else {
            // Unsupported second factor.
          }
        } else if (err.code === "auth/wrong-password") {
          // Handle other errors such as wrong password.
          alert("WRONG PASSWORD");
        }
      });
    setLoading(false);
  };

  const onVerifyCode = async () => {
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    const resolver = getMultiFactorResolver(auth, error);
    return resolver
      .resolveSignIn(multiFactorAssertion)
      .then(function (userCredential) {
        onLogedin(userCredential);
      })
      .catch(() => {
        toast.error("Error: Invalid code");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onVerifyCode();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        backgroundColor: "#46516D",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "500px",
          height: "400px",
          boxShadow: "0px 6px 8px #cbd5E0",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
          backgroundColor: "#edf2f7",
          flexDirection: "row",
          borderRadius: 25,
          borderColor: "rgb(255,255,255)",
          borderWidth: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          {loginStep !== "code" && (
            <CaptchaStep>
              {loginStep === "captcha" && (
                <h2>{"Beep, boop , are you a robot ?"}</h2>
              )}
              <div id="reCaptchaContainer"></div>
            </CaptchaStep>
          )}
          {loginStep === "code" && (
            <CodeStep>
              <h2>Validation en deux étapes</h2>
              <p>
                <strong>
                  Afin de proteger votre compte, nous souhaitons nous assurer
                  que c'est bien vous qui essayez de vous connecter.
                </strong>
              </p>
              <p>
                {"Un SMS contenant un code de validatioon a été envoyé au " +
                  phone +
                  "."}
              </p>
              <OutlinedInput
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Saisissez le code"
              />
              <Button type="submit">Valider</Button>
            </CodeStep>
          )}
          {loginStep === "credentials" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <LockOpenIcon fontSize={"large"} />
              </div>
              <FormControl
                fullWidth
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type={"text"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <AccountCircle />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl
                fullWidth
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setTypePassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <div id="reCaptchaContainer"></div>
              {label ? (
                <Alert severity="error">
                  <AlertTitle>Erreur</AlertTitle>
                  {label}{" "}
                  <strong>Veuillez fournir des informations valides</strong>
                </Alert>
              ) : null}

              <div style={{ margin: 12, position: "relative" }}>
                <Button
                  className={classes.Button}
                  variant={"contained"}
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    handleLogin();
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
