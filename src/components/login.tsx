import { axiosRequest, saveTokens } from "../utils/axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();


  async function LoginAuth(obj) {
    try {

      const { data } = await axiosRequest.post(
        "/auth/login",
        obj
      );


      saveTokens(
        data.accessToken,
        data.refreshToken
      );


      console.log("Login Success", data);


      navigate("/home");


    } catch (error) {

      console.error(error);

    }
  }


  const handleSubmit = (e) => {

    e.preventDefault();


    const obj = {
      email: e.target.email.value,
      password: e.target.password.value,
    };


    LoginAuth(obj);

  };


  return (

    <Box
      sx={{
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:
        "linear-gradient(135deg,#0f172a,#1e293b,#0c4a6e)",
        p:2
      }}
    >

      <Card
        sx={{
          width:"100%",
          maxWidth:420,
          background:"rgba(255,255,255,.1)",
          backdropFilter:"blur(20px)",
          borderRadius:"24px",
          border:"1px solid rgba(255,255,255,.2)",
          boxShadow:"0 25px 60px rgba(0,0,0,.5)"
        }}
      >

        <CardContent sx={{p:5}}>


          <Box
            sx={{
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              mb:3
            }}
          >

            <Box
              sx={{
                width:70,
                height:70,
                borderRadius:"50%",
                background:"#06b6d4",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                mb:2
              }}
            >

              <LockOutlinedIcon
                sx={{
                  color:"white",
                  fontSize:35
                }}
              />

            </Box>


            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
            >
              Welcome Back
            </Typography>


            <Typography
              sx={{
                color:"rgba(255,255,255,.7)",
                mt:1
              }}
            >
              Sign in to your account
            </Typography>


          </Box>



          <form onSubmit={handleSubmit}>

            <Box
              sx={{
                display:"flex",
                flexDirection:"column",
                gap:3
              }}
            >


              <TextField
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                sx={inputStyle}
              />


              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                sx={inputStyle}
              />


              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py:1.5,
                  borderRadius:"14px",
                  background:"#06b6d4",
                  fontWeight:"bold",
                  "&:hover":{
                    background:"#0891b2"
                  }
                }}
              >
                Sign In
              </Button>


            </Box>

          </form>



          <Box
            sx={{
              textAlign:"center",
              mt:4
            }}
          >

            <Typography
              sx={{
                color:"rgba(255,255,255,.7)",
                fontSize:14
              }}
            >
              Don't have an account?
            </Typography>


            <Button
              onClick={() => navigate("/register")}
              sx={{
                color:"#22d3ee",
                textTransform:"none",
                fontWeight:"bold"
              }}
            >
              Create Account
            </Button>


          </Box>


        </CardContent>

      </Card>

    </Box>

  );
};


const inputStyle = {
  input:{
    color:"white"
  },

  "& .MuiInputLabel-root":{
    color:"rgba(255,255,255,.7)"
  },

  "& .MuiOutlinedInput-root":{
    borderRadius:"14px",

    "& fieldset":{
      borderColor:"rgba(255,255,255,.3)"
    }
  }
};


export default Login;