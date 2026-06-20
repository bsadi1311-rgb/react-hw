import { axiosRequest } from "../utils/axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  async function RegisterAuth(obj: any) {
    try {
      const response = await axiosRequest.post(
        "/auth/register",
        obj
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      }

    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Email already exists");
      } else {
        alert("Register error");
        console.log(error);
      }
    }
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();

    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    RegisterAuth(obj);
  };


  return (
    <Box
      sx={{
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:"linear-gradient(135deg,#0f172a,#1e293b,#155e75)",
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
              textAlign:"center",
              mb:3
            }}
          >

            <PersonAddIcon
              sx={{
                color:"#22c55e",
                fontSize:50
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
            >
              Create Account
            </Typography>

            <Typography
              sx={{
                color:"rgba(255,255,255,.7)"
              }}
            >
              Register new account
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
                label="Name"
                name="name"
                required
                fullWidth
                sx={style}
              />


              <TextField
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                sx={style}
              />


              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                sx={style}
              />


              <Button
                type="submit"
                variant="contained"
                sx={{
                  py:1.5,
                  borderRadius:"14px",
                  background:"#22c55e",
                  fontWeight:"bold",
                  "&:hover":{
                    background:"#16a34a"
                  }
                }}
              >
                Create Account
              </Button>

            </Box>

          </form>


          <Box
            sx={{
              textAlign:"center",
              mt:3
            }}
          >

            <Typography
              sx={{
                color:"rgba(255,255,255,.7)"
              }}
            >
              Already have an account?
            </Typography>


            <Button
              onClick={() => navigate("/login")}
              sx={{
                color:"#22d3ee",
                textTransform:"none"
              }}
            >
              Sign In
            </Button>

          </Box>


        </CardContent>

      </Card>

    </Box>
  );
};


const style = {
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


export default Register;