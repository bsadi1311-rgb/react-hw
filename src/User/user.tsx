import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Tab,
  Tabs,
  Paper,
  InputAdornment
} from "@mui/material";

// Нишонаҳо (Icons)
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShieldIcon from '@mui/icons-material/Shield';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Нишонаи нав барои тугмаи бозгашт

import useProfileStore from "./userZus";

const ProfileMenu = () => {
  const { profile, getProfile, updateProfile, logout } = useProfileStore();

  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSaveName = async () => {
    if (name.trim() && name !== profile?.name) {
      await updateProfile({ name: name.trim() });
    }
    setIsEditing(false);
  };

  const handleBack = () => {
    // Агар react-router-dom дошта бошед, navigate(-1)-ро истифода баред.
    // Масалан: window.history.back();
    window.history.back();
  };

  const getUfcDicebearAvatar = (username: string) => {
    const name = username || "user";
    
    const ufcStyles = [
      "https://th.bing.com/th?id=OIF.auPrL%2fbfiHr%2b3mxNFhqYjQ&w=115&h=187&c=7&r=0&o=7&pid=1.7&rm=3",
      "https://th.bing.com/th?id=OIF.3BK84%2bk141N8bEwFfHzmwA&w=324&h=187&c=7&r=0&o=7&pid=1.7&rm=3",
      "https://images3.alphacoders.com/140/thumb-1920-1403389.jpg",
      `https://api.dicebear.com/10.x/adventurer/svg?seed=${name}&backgroundType=solid&backgroundColor=0f172a`
    ];

    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const index = sum % ufcStyles.length;

    return ufcStyles[index];
  };

  const avatar = profile?.avatar || getUfcDicebearAvatar(profile?.name);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, margin: "0 auto", fontFamily: "'Inter', sans-serif" }}>
      
      {/* ТУГМАИ НАЗАД (БОЗГАШТ) */}
      <Button
        startIcon={<ArrowBackIcon fontSize="small" />}
        onClick={handleBack}
        sx={{
          mb: 3,
          textTransform: "none",
          fontWeight: "600",
          color: "#64748b",
          borderRadius: "12px",
          px: 2,
          py: 0.8,
          transition: "all 0.2s",
          "&:hover": {
            background: "#f1f5f9",
            color: "#1e293b"
          }
        }}
      >
        Назад
      </Button>

      {/* Сарлавҳаи Саҳифа */}
      <Box sx={{ mb: 4 }}>
        <Typography fontSize={28} fontWeight="800" color="#1e293b" letterSpacing="-0.5px">
          Профил
        </Typography>
        <Typography fontSize={14} color="#94a3b8" mt={0.5}>
          Танзимоти шахсӣ ва идоракунии ҳисоби корбарӣ
        </Typography>
      </Box>

      {/* КАРТИ АСОСИИ ИСТИФОДАБАРВРАНДА */}
      <Card
        sx={{
          borderRadius: "24px",
          boxShadow: "0 10px 30px -5px rgba(148, 163, 184, 0.12)",
          border: "1px solid #e2e8f0",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          mb: 4,
          overflow: "hidden"
        }}
      >
        <CardContent
          sx={{
            p: { xs: "32px !important", md: "48px !important" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Аватар */}
          <Box sx={{ position: "relative", mb: 2 }}>
            <Avatar
              src={avatar}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid #fff",
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.25)",
                background: "#fff",
                "& img": { objectFit: "cover" }
              }}
            />
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: 5, 
                right: 5, 
                width: 16, 
                height: 16, 
                bgcolor: "#10b981", 
                border: "3px solid #fff", 
                borderRadius: "50%" 
              }} 
            />
          </Box>

          {/* Блоки ном ва таҳрир */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: 52 }}>
            {isEditing ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, width: "100%", maxWidth: 360 }}>
                <TextField
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root": { 
                      borderRadius: "12px",
                      background: "#fff"
                    },
                  }}
                />
                <IconButton 
                  onClick={handleSaveName}
                  sx={{ bgcolor: "#3b82f6", color: "#fff", "&:hover": { bgcolor: "#2563eb" }, width: 40, height: 40, borderRadius: "10px" }}
                >
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={() => {
                    setIsEditing(false);
                    setName(profile?.name || "");
                  }}
                  sx={{ border: "1px solid #cbd5e1", color: "#64748b", "&:hover": { background: "#f1f5f9" }, width: 40, height: 40, borderRadius: "10px" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontSize={24} fontWeight="800" color="#1e293b" letterSpacing="-0.5px">
                  {profile?.name || "Корбари нав"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                  sx={{ 
                    color: "#3b82f6", 
                    background: "#eff6ff", 
                    p: "6px",
                    borderRadius: "8px",
                    "&:hover": { background: "#dbeafe" } 
                  }}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            )}
          </Box>

          <Typography
            fontSize={12}
            fontWeight="700"
            color="#3b82f6"
            sx={{
              background: "#eff6ff",
              px: 2.5,
              py: 0.6,
              borderRadius: "100px",
              mt: 1.5,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}
          >
            {profile?.role || "Owner"}
          </Typography>
        </CardContent>
      </Card>

      {/* КАРТИ ПАНЕЛҲО (МЕНЮ) */}
      <Card
        sx={{
          borderRadius: "24px",
          boxShadow: "0 4px 20px -2px rgba(148, 163, 184, 0.06)",
          border: "1px solid #e2e8f0",
          background: "#fff",
          overflow: "hidden"
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "#f1f5f9", px: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "600",
                fontSize: 15,
                minWidth: 120,
                py: 2.5,
                color: "#64748b"
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                background: "#3b82f6"
              }
            }}
          >
            <Tab label="Идоракунӣ" />
            <Tab label="Танзимот" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 ? (
            <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ py: 2, px: 2.5, borderRadius: "16px", transition: "all 0.2s", "&:hover": { background: "#f8fafc" } }}>
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Box sx={{ background: "#eff6ff", color: "#3b82f6", p: 1, borderRadius: "12px", display: "flex" }}>
                      <PeopleIcon fontSize="small" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight="600" color="#1e293b" fontSize={15}>Корбарон</Typography>}
                    secondary="Идоракунии корбарон ва нақшҳо дар система"
                    secondaryTypographyProps={{ fontSize: 13, color: "#94a3b8" }}
                  />
                  <ChevronRightIcon sx={{ color: "#cbd5e1" }} />
                </ListItemButton>
              </ListItem>

              <Divider sx={{ borderStyle: "dashed", borderColor: "#f1f5f9", my: 0.5 }} />

              <ListItem disablePadding>
                <ListItemButton sx={{ py: 2, px: 2.5, borderRadius: "16px", transition: "all 0.2s", "&:hover": { background: "#f8fafc" } }}>
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Box sx={{ background: "#f0fdf4", color: "#10b981", p: 1, borderRadius: "12px", display: "flex" }}>
                      <ContactPhoneIcon fontSize="small" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight="600" color="#1e293b" fontSize={15}>Тамосҳо</Typography>}
                    secondary="Дидан, илова ва идоракунии рӯйхати тамосҳо"
                    secondaryTypographyProps={{ fontSize: 13, color: "#94a3b8" }}
                  />
                  <ChevronRightIcon sx={{ color: "#cbd5e1" }} />
                </ListItemButton>
              </ListItem>

              <Divider sx={{ borderStyle: "dashed", borderColor: "#f1f5f9", my: 0.5 }} />

              <ListItem disablePadding>
                <ListItemButton
                  onClick={logout}
                  sx={{
                    py: 2,
                    px: 2.5,
                    borderRadius: "16px",
                    transition: "all 0.2s",
                    "&:hover": { background: "#fff1f2" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Box sx={{ background: "#fee2e2", color: "#f43f5e", p: 1, borderRadius: "12px", display: "flex" }}>
                      <ExitToAppIcon fontSize="small" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight="600" color="#f43f5e" fontSize={15}>Баромадан аз аккаунт</Typography>}
                    secondary="Пӯшидани сессияи ҷорӣ ва баромад"
                    secondaryTypographyProps={{ fontSize: 13, color: "#fca5a5" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            /* ВКЛАДКАИ ТАНЗИМОТ */
            <Box sx={{ p: 1 }}>
              <Typography fontSize={16} fontWeight="700" color="#1e293b" mb={1}>
                Амният ва Шахсият
              </Typography>
              <Typography color="#94a3b8" fontSize={13} mb={3.5}>
                Ин ҷо танзимоти асосии система ҷойгир шудаанд. Шумо метавонед танзимоти интерфейс ва амниятро идора кунед.
              </Typography>
              
              <Box sx={{ maxWidth: 450, display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Электронная почта"
                  value={profile?.email || "bot@mail.com"}
                  disabled
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#cbd5e1", fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .Mui-disabled": { WebkitTextFillColor: "#64748b !important", background: "#f8fafc" }
                  }}
                />

                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    borderRadius: "16px", 
                    borderColor: "#e2e8f0", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    background: "#f8fafc" 
                  }}
                >
                  <ShieldIcon sx={{ color: "#3b82f6" }} />
                  <Box>
                    <Typography fontSize={14} fontWeight="600" color="#1e293b">Аутентификацияи дузинагӣ</Typography>
                    <Typography fontSize={12} color="#94a3b8">Ҳисоби худро бо қабати иловагии амният ҳифз кунед.</Typography>
                  </Box>
                  <Button size="small" variant="text" sx={{ ml: "auto", textTransform: "none", fontWeight: "600" }}>Фаъолсозӣ</Button>
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileMenu;