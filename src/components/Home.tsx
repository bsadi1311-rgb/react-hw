
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Badge,
  Select,
  MenuItem,
  FormControl,
  Fab,
  Menu,
  Button,
} from "@mui/material";
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useDebtStore } from "../store/debtStore";
import AddDebtModal from "../components/AddDebtModal";

const Home = () => {
  const navigate = useNavigate();
  
  // Функсияи алоҳидаи fetchDebts ё ҳамон иловаи лозимиро аз store мегирем
  // Эзоҳ: Агар дар store функсияи fetchDebts набошад, метавонӣ онро ба ҷои fetchFolders ё тавассути API гирӣ
  const {
    user,
    fetchUser,
    fetchFolders,
    logout,
    debts = []
  } = useDebtStore();

  const [openModal, setOpenModal] = useState(false);
  const [year, setYear] = useState("2026");
  const [anchor, setAnchor] = useState(null);
  const [activeMonth, setActiveMonth] = useState("Jun");

  useEffect(() => {
    fetchUser();
    fetchFolders();

  }, []);
  const receive = debts
    .filter(item => item.direction === "they_owe_me" || item.type === "receive")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const pay = debts
    .filter(item => item.direction === "i_owe_them" || item.type === "pay")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const total = receive - pay;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const sidebarItems = [
    { icon: <BorderAllIcon />, path: "/home" },
    { icon: <AccountBalanceWalletIcon />, path: "/debts" },
    { icon: <AdminPanelSettingsIcon />, path: "/profile" },
    { icon: <GroupIcon />, path: "/contacts" },
    { icon: <FolderOpenIcon />, path: "#" }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 90,
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          py: 3
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
          <Avatar
            src="/logo.png"
            sx={{ width: 45, height: 45, mb: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
            onError={(e) => { e.currentTarget.src = "https://api.dicebear.com/7.x/identicon/svg?seed=adl"; }}
          />

          {sidebarItems.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => item.path !== "#" && navigate(item.path)}
              sx={{
                background: index === 0 ? "#e0e7ff" : "transparent",
                color: index === 0 ? "#3b82f6" : "#94a3b8",
                borderRadius: 3,
                width: 48,
                height: 48,
                transition: "all 0.2s",
                "&:hover": { background: index === 0 ? "#e0e7ff" : "#f1f5f9" }
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>

        <Avatar
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || "bot"}`}
          sx={{ cursor: "pointer", border: "2px solid #e2e8f0" }}
          onClick={(e) => setAnchor(e.currentTarget)}
        />

        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" } }}
        >
          <Box sx={{ p: 2, width: 220 }}>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
              <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || "bot"}`} />
              <Box>
                <Typography fontWeight="700" sx={{ color: "#1e293b" }}>{user?.name || "bot"}</Typography>
                <Typography fontSize={12} color="text.secondary">Owner</Typography>
              </Box>
            </Box>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setAnchor(null);
                navigate("/profile");
              }}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: "600", mb: 1 }}
            >
              Профиль
            </Button>

            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="error"
              onClick={logout}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: "600" }}
            >
              Выйти
            </Button>
          </Box>
        </Menu>
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <Box
          sx={{
            height: 70,
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4
          }}
        >
          <Typography fontSize={24} color="#64748b" sx={{ cursor: "pointer", userSelect: "none" }}>
            ☰
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            <Typography sx={{ cursor: "pointer", fontSize: 16, fontWeight: "600", color: "#64748b" }}>文</Typography>
            <Box sx={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }} />
            </Box>
            <Badge badgeContent={2} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}>
              <Typography sx={{ cursor: "pointer", fontSize: 18 }}>🔔</Typography>
            </Badge>
            <Typography sx={{ cursor: "pointer", fontSize: 16, color: "#64748b", fontWeight: "bold", transform: "rotate(45deg)" }}>⤢</Typography>
            <Avatar 
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || "bot"}`} 
              sx={{ width: 36, height: 36, cursor: "pointer" }} 
              onClick={() => navigate("/profile")}
            />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 4 }}>
          <Typography fontSize={24} fontWeight="700" mb={4} color="#1e293b">
            Хуш омадед, {user?.name || "bot"}!
          </Typography>

          {/* CARDS */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
            {/* Ҳамагӣ */}
            <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none", background: "#fff" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#fef3c7", p: 2, borderRadius: 3, display: "flex", fontSize: 24, color: "#f59e0b" }}>💼</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" sx={{ mb: 0.5 }}>Ҳамагӣ</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#f59e0b">
                    {total.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b", fontWeight: "500" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Аз ман қарздоранд */}
            <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none", background: "#fff" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#dcfce7", p: 2, borderRadius: 3, display: "flex", fontSize: 24, color: "#10b981" }}>💳</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" sx={{ mb: 0.5 }}>Аз ман қарздоранд</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#10b981">
                    {receive.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b", fontWeight: "500" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Ман қарздорам */}
            <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none", background: "#fff" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#fee2e2", p: 2, borderRadius: 3, display: "flex", fontSize: 24, color: "#f43f5e" }}>❌</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" sx={{ mb: 0.5 }}>Ман қарздорам</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#f43f5e">
                    {pay.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b", fontWeight: "500" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* LOWER SECTION: GRAPH & PAYMENTS */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3, mt: 4 }}>
            
            {/* ГРАФИК */}
            <Card sx={{ p: 3, height: 350, borderRadius: 4, boxShadow: "none", border: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="700" color="#1e293b">Шарҳи қарзҳо аз рӯи моҳҳо</Typography>
                <FormControl size="small" sx={{ width: 100 }}>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{ borderRadius: 2, fontSize: 14 }}
                  >
                    <MenuItem value="2026">2026</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {year === "2026" && (
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10b981" }} />
                    <Typography fontSize={12} color="text.secondary">Қарз дода (Аз ман қарздоранд)</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f43f5e" }} />
                    <Typography fontSize={12} color="text.secondary">Қарз гирифта (ман қарздорам)</Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ flex: 1, position: "relative", mt: 2, borderBottom: "1px dashed #e2e8f0", minHeight: 180 }}>
                {year === "2026" ? (
                  <>
                    <Typography sx={{ position: "absolute", left: 0, top: 10, fontSize: 11, color: "#94a3b8" }}>15k</Typography>
                    <Box sx={{ position: "absolute", width: "100%", top: 20, borderTop: "1px dashed #f1f5f9" }} />
                    
                    <Typography sx={{ position: "absolute", left: 0, top: 65, fontSize: 11, color: "#94a3b8" }}>10k</Typography>
                    <Box sx={{ position: "absolute", width: "100%", top: 75, borderTop: "1px dashed #f1f5f9" }} />
                    
                    <Typography sx={{ position: "absolute", left: 0, top: 120, fontSize: 11, color: "#94a3b8" }}>5k</Typography>
                    <Box sx={{ position: "absolute", width: "100%", top: 130, borderTop: "1px dashed #f1f5f9" }} />
                    
                    <Typography sx={{ position: "absolute", left: 0, bottom: 4, fontSize: 11, color: "#94a3b8" }}>0k</Typography>

                    <svg viewBox="0 0 1200 200" style={{ width: "100%", height: "100%", overflow: "visible", position: "absolute", left: 0, top: 0 }}>
                      <path
                        d="M 50,195 Q 250,195 455,195 T 550,60 Q 570,25 600,60 T 695,195 H 1150"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </svg>

                    {months.map((m, idx) => {
                      const leftPos = `${4.5 + idx * 8.3}%`;
                      return m !== "Jun" ? (
                        <Box
                          key={m}
                          sx={{
                            position: "absolute",
                            bottom: -4,
                            left: leftPos,
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "#f43f5e"
                          }}
                        />
                      ) : null;
                    })}

                    <Box
                      sx={{
                        position: "absolute",
                        top: 50,
                        left: "46%",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        boxShadow: "0 0 0 5px rgba(16, 185, 129, 0.25)",
                        cursor: "pointer",
                        zIndex: 2
                      }}
                      onMouseEnter={() => setActiveMonth("Jun")}
                    />

                    {activeMonth === "Jun" && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 75,
                          left: "41%",
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 3,
                          boxShadow: "0 10px 20px -5px rgba(0,0,0,0.08)",
                          p: 1.5,
                          zIndex: 10,
                          minWidth: 160
                        }}
                      >
                        <Typography fontSize={12} fontWeight="700" color="#64748b" mb={1}>Jun</Typography>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10b981" }} />
                          <Typography fontSize={11} color="#1e293b">Қарз дода: <span style={{ fontWeight: "700" }}>{receive}</span></Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f43f5e" }} />
                          <Typography fontSize={11} color="#1e293b">Қарз гирифта: <span style={{ fontWeight: "700" }}>{pay}</span></Typography>
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      boxShadow: "0 0 0 5px rgba(16, 185, 129, 0.2)"
                    }}
                  />
                )}
              </Box>

              {year === "2026" && (
                <Box display="flex" justifyContent="space-between" px={2} mt={1.5}>
                  {months.map((m) => (
                    <Typography
                      key={m}
                      fontSize={12}
                      fontWeight={m === "Jun" ? "700" : "400"}
                      color={m === "Jun" ? "#1e293b" : "#94a3b8"}
                      sx={{ width: 30, textAlign: "center" }}
                    >
                      {m}
                    </Typography>
                  ))}
                </Box>
              )}
            </Card>

            {/* Пардохтҳои охирин */}
            <Card sx={{ p: 3, height: 350, borderRadius: 4, boxShadow: "none", border: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column" }}>
              <Typography fontWeight="700" color="#1e293b" mb={2}>Пардохтҳои охирин</Typography>
              <Box sx={{ borderBottom: "1px solid #f1f5f9", mb: 2 }} />
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography color="text.secondary" fontSize={14}>Пардохтҳои охирин нест</Typography>
              </Box>
            </Card>

          </Box>
        </Box>
      </Box>

      {/* ФАБ Тугмача */}
      <Fab
        onClick={() => setOpenModal(true)}
        sx={{
          position: "fixed",
          right: 32,
          bottom: 32,
          background: "#3b82f6",
          color: "#fff",
          "&:hover": { background: "#2563eb" },
          boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.4)"
        }}
      >
        <span style={{ fontSize: 24, fontWeight: "300" }}>+</span>
      </Fab>

      <AddDebtModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Home;

