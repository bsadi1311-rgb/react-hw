import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Badge,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Fab,
  LinearProgress
} from "@mui/material";

// Нишонаҳо (Icons)
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LightningIcon from '@mui/icons-material/FlashOn';

import { useDebtStore } from "../store/debtStore";
import AddDebtModal from "../components/AddDebtModal";

const Debts = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Барои муайян кардани роути фаъол

  const { user, fetchUser, debts = [], fetchFolders } = useDebtStore();
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterContact, setFilterContact] = useState("all");
  const [filterFolder, setFilterFolder] = useState("all");

  useEffect(() => {
    fetchUser();
    fetchFolders();
  }, []);

  // Ҳисоб кардани маблағҳо
  const receive = debts
    .filter(item => item.direction === "they_owe_me" || item.type === "receive")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const pay = debts
    .filter(item => item.direction === "i_owe_them" || item.type === "pay")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const total = receive - pay;

  // Элементҳои Sidebar бо нишонаҳои MUI
  const sidebarItems = [
    { icon: <BorderAllIcon />, path: "/home" },
    { icon: <AccountBalanceWalletIcon />, path: "/debts" },
    { icon: <AdminPanelSettingsIcon />, path: "/profile" },
    { icon: <GroupIcon />, path: "/contacts" },
    { icon: <FolderOpenIcon />, path: "#" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR */}
      <Box sx={{ width: 90, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", py: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
          <Avatar
            src="/logo.png"
            sx={{ width: 45, height: 45, mb: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
            onError={(e) => { e.currentTarget.src = "https://api.dicebear.com/7.x/identicon/svg?seed=adl"; }}
          />

          {sidebarItems.map((item, index) => {
            // Санҷиши он ки оё ин тугма саҳифаи ҳозира (фаъол) аст ё не
            const isActive = location.pathname === item.path;
            
            return (
              <IconButton
                key={index}
                onClick={() => item.path !== "#" && navigate(item.path)}
                sx={{
                  background: isActive ? "#e0e7ff" : "transparent",
                  color: isActive ? "#3b82f6" : "#94a3b8",
                  borderRadius: 3,
                  width: 48,
                  height: 48,
                  transition: "all 0.2s",
                  "&:hover": { background: isActive ? "#e0e7ff" : "#f1f5f9" },
                  "& .MuiSvgIcon-root": { fontSize: 22 }
                }}
              >
                {item.icon}
              </IconButton>
            );
          })}
        </Box>

        <Avatar
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || "bot"}`}
          sx={{ cursor: "pointer", border: "2px solid #e2e8f0" }}
          onClick={() => navigate("/profile")}
        />
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <Box sx={{ height: 70, background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", px: 4 }}>
          <Typography fontSize={24} color="#64748b" sx={{ cursor: "pointer", userSelect: "none" }}>☰</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            <Typography sx={{ cursor: "pointer", fontSize: 16, fontWeight: "600", color: "#64748b" }}>文</Typography>
            <Box sx={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }} />
            </Box>
            <Badge badgeContent={2} color="error">
              <Typography sx={{ cursor: "pointer", fontSize: 18 }}>🔔</Typography>
            </Badge>
            <Typography sx={{ cursor: "pointer", fontSize: 16, color: "#64748b", fontWeight: "bold", transform: "rotate(45deg)" }}>⤢</Typography>
            <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.name || "bot"}`} sx={{ width: 36, height: 36 }} />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 4 }}>
          
          {/* TITLE & TOP BUTTONS */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography fontSize={26} fontWeight="700" color="#1e293b">Adl 5:8</Typography>
            <Box display="flex" gap={2}>
              <Button variant="outlined" startIcon={<FileDownloadIcon />} sx={{ borderRadius: "10px", textTransform: "none", fontWeight: "600", color: "#64748b", borderColor: "#cbd5e1" }}>
                Содирот
              </Button>
              <Button variant="contained" disableElevation startIcon={<LightningIcon />} sx={{ borderRadius: "10px", textTransform: "none", fontWeight: "600", background: "#3b82f6" }}>
                Пардохти зуд
              </Button>
            </Box>
          </Box>

          {/* CARDS */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, mb: 4 }}>
            <Card sx={{ borderRadius: 4, border: "1px solid #10b981", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#fef3c7", p: 2, borderRadius: 3, fontSize: 24, color: "#f59e0b", display: "flex" }}>💼</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" mb={0.5}>Ҳамагӣ</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#f59e0b">
                    {total.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#dcfce7", p: 2, borderRadius: 3, fontSize: 24, color: "#10b981", display: "flex" }}>💳</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" mb={0.5}>Аз ман қарздоранд</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#10b981">
                    {receive.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4, border: "1px solid #e2e8f0", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "24px !important" }}>
                <Box sx={{ background: "#fee2e2", p: 2, borderRadius: 3, fontSize: 24, color: "#f43f5e", display: "flex" }}>❌</Box>
                <Box textAlign="right">
                  <Typography color="text.secondary" fontSize={14} fontWeight="500" mb={0.5}>Ман қарздорам</Typography>
                  <Typography fontSize={26} fontWeight="800" color="#f43f5e">
                    {pay.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b" }}>TJS</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* FILTER & TABLE SECTION */}
          <Card sx={{ borderRadius: 4, boxShadow: "none", border: "1px solid #e2e8f0", background: "#fff", p: 3 }}>
            
            {/* SEARCH AND FILTERS */}
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ҷустуҷӯ бо ном"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "#94a3b8", mr: 1, fontSize: 20 }} />,
                  sx: { borderRadius: "10px" }
                }}
              />
              
              <Box display="flex" gap={2}>
                <FormControl size="small" sx={{ flex: 1 }}>
                  <Select value={filterContact} onChange={(e) => setFilterContact(e.target.value)} sx={{ borderRadius: "10px" }}>
                    <MenuItem value="all">Ҳамаи тамосҳо</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ flex: 1 }}>
                  <Select value={filterFolder} onChange={(e) => setFilterFolder(e.target.value)} sx={{ borderRadius: "10px" }}>
                    <MenuItem value="all">Ҳамаи ҷузвдонҳо</MenuItem>
                  </Select>
                </FormControl>

                <IconButton sx={{ border: "1px solid #cbd5e1", borderRadius: "10px", width: 40, height: 40 }}><FilterListIcon sx={{ fontSize: 20, color: "#64748b" }} /></IconButton>
                <IconButton sx={{ border: "1px solid #cbd5e1", borderRadius: "10px", width: 40, height: 40 }}><SwapVertIcon sx={{ fontSize: 20, color: "#64748b" }} /></IconButton>
              </Box>
            </Box>

            {/* TABLE HEADER */}
            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr 2fr 40px", px: 2, py: 1.5, background: "#f8fafc", borderRadius: "8px", mb: 2 }}>
              <Typography fontSize={12} fontWeight="700" color="#64748b">НОМИ ПУРРА</Typography>
              <Typography fontSize={12} fontWeight="700" color="#64748b">МАБЛАҒ</Typography>
              <Typography fontSize={12} fontWeight="700" color="#64748b">ПЕШРАФТ</Typography>
              <Typography fontSize={12} fontWeight="700" color="#64748b">САНАИ ПАРДОХТ</Typography>
              <Box />
            </Box>

            {/* TABLE BODY (DYNAMIC ITEMS) */}
            {debts.length === 0 ? (
              <Box textAlign="center" py={4} color="text.secondary">Қарзҳо ёфт нашуданд</Box>
            ) : (
              debts.map((debt: any) => {
                const isReceive = debt.direction === "they_owe_me" || debt.type === "receive";
                return (
                  <Box key={debt.id} sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr 2fr 40px", alignItems: "center", px: 2, py: 2, borderBottom: "1px solid #f1f5f9" }}>
                    
                    {/* Контакт ва ном */}
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar sx={{ width: 32, height: 32, background: isReceive ? "#e6f4ea" : "#fce8e6", color: isReceive ? "#10b981" : "#f43f5e", fontSize: 14 }}>
                        💰
                      </Avatar>
                      <Box>
                        <Typography fontSize={14} fontWeight="600" color="#1e293b">{debt.contact?.name || "Номаълум"}</Typography>
                        <Typography fontSize={12} color="#94a3b8">{debt.description || "тавсиф нест"}</Typography>
                      </Box>
                    </Box>

                    {/* Маблағ */}
                    <Typography fontSize={14} fontWeight="700" color={isReceive ? "#10b981" : "#f43f5e"}>
                      {isReceive ? `+${debt.amount}` : `-${debt.amount}`} TJS
                    </Typography>

                    {/* Пешрафт (Progress Bar) */}
                    <Box pr={4}>
                      <Box display="flex" justifyContent="flex-end" mb={0.5}>
                        <Typography fontSize={11} fontWeight="700" color="#10b981">100%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={100} sx={{ height: 6, borderRadius: 3, background: "#f1f5f9", "& .MuiLinearProgress-bar": { background: "#10b981" } }} />
                    </Box>

                    {/* Санаи пардохт */}
                    <Typography fontSize={13} color="#64748b">
                      📅 {debt.payment_date ? new Date(debt.payment_date).toLocaleDateString("tg-TJ") : "Муайян нашудааст"}
                    </Typography>

                    {/* Менюи иловагӣ */}
                    <Typography sx={{ cursor: "pointer", color: "#94a3b8", textAlign: "center", fontWeight: "bold" }}>⋮</Typography>
                  </Box>
                );
              })
            )}
          </Card>
        </Box>
      </Box>

      {/* FLOATING ACTION BUTTON */}
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

export default Debts;