import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Alert,
} from "@mui/material";

import { useDebtStore } from "../store/debtStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddDebtModal = ({ open, onClose }: Props) => {
  const { addDebt, addContact, fetchContacts, loading, folders = [] } = useDebtStore();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"pay" | "receive">("receive");
  const [folderId, setFolderId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchContacts();
    }
  }, [open, fetchContacts]);

  const clear = () => {
    setName("");
    setAmount("");
    setType("receive");
    setFolderId("");
    setPaymentDate("");
    setDescription("");
    setError("");
  };

  const close = () => {
    clear();
    onClose();
  };

  const save = async () => {
    if (!name.trim() || !amount) {
      setError("Лутфан, майдонҳои ҳатмиро пур кунед (*)");
      return;
    }

    try {
      setError("");

      // 1. Аввал контакт месозем
      const newContact = await addContact({ name: name.trim() });
      const contactId = newContact?.id || newContact?.data?.id;

      if (!contactId) {
        setError("Хатогӣ ҳангоми сохтани контакт. ID ёфт нашуд.");
        return;
      }

      // 2. Интихоби "direction" мувофиқи талаби аниқи сервер (Enum)
      const backendDirection = type === "receive" ? "they_owe_me" : "i_owe_them";

      // 3. Фиристодан ба сервер
      await addDebt({
        contact_id: contactId,
        amount: Number(amount),
        direction: backendDirection,
        folder_id: folderId === "" ? null : folderId,
        payment_date: paymentDate || null,
        description: description || "",
      });

      close();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Хатогии сервер рӯй дод");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Сарлавҳаи Тиреза бо услуби MUI */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pt: 3, px: 3, pb: 1 }}>
        <Box
          sx={{
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f1f5f9",
            p: 0.8,
            borderRadius: "50%",
          }}
        >
          🪙
        </Box>
        <Typography fontSize={18} fontWeight="700" color="#1e293b">
          Илова кардани қарз
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 2, pt: "8px !important" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={3}>
          {/* Номи шахс */}
          <Box>
            <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
              Номи шахс *
            </Typography>
            <TextField
              placeholder="Номро нависед..."
              fullWidth
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#fff" },
              }}
            />
          </Box>

          {/* Маблағ ва Навъ */}
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
            <Box>
              <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
                Маблағ *
              </Typography>
              <TextField
                placeholder="Маблағро ворид кунед"
                type="number"
                fullWidth
                size="small"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
                slotProps={{
                  input: {
                    endAdornment: <span style={{ color: "#94a3b8", fontSize: 16 }}>🧮</span>,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
                Навъ *
              </Typography>
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={type}
                onChange={(_, value) => {
                  if (value) setType(value);
                }}
                sx={{
                  height: "40px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#fff",
                  "& .MuiToggleButtonGroup-grouped": {
                    border: "none",
                  },
                }}
              >
                <ToggleButton
                  value="pay"
                  sx={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#64748b",
                    "&.Mui-selected": {
                      background: "#fff",
                      color: "#ef4444",
                      border: "1px solid #ef4444",
                      borderRadius: "8px !important",
                      m: "2px",
                      height: "calc(100% - 4px)",
                      "&:hover": { background: "#fef2f2" },
                    },
                  }}
                >
                  Ман Қарздорам
                </ToggleButton>

                <ToggleButton
                  value="receive"
                  sx={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#64748b",
                    "&.Mui-selected": {
                      background: "#e6f4ea",
                      color: "#10b981",
                      borderRadius: "8px !important",
                      m: "2px",
                      height: "calc(100% - 4px)",
                      "&:hover": { background: "#d1e7dd" },
                    },
                  }}
                >
                  Аз Ман Қарздоранд
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Ҷузвдон */}
          <Box>
            <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
              Ҷузвдон
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <TextField
                select
                fullWidth
                size="small"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              >
                <MenuItem value="">Хеҷ</MenuItem>
                {folders.map((folder: any) => (
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="outlined"
                sx={{
                  minWidth: "40px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  borderColor: "#cbd5e1",
                  color: "#3b82f6",
                  fontSize: 18,
                  "&:hover": { borderColor: "#3b82f6", background: "#f1f5f9" },
                }}
              >
                +
              </Button>
            </Box>
          </Box>

          {/* Санаи пардохт */}
          <Box>
            <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
              Санаи пардохт
            </Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          {/* Тавсиф */}
          <Box>
            <Typography fontSize={14} fontWeight="600" color="#64748b" mb={1}>
              Тавсиф
            </Typography>
            <TextField
              placeholder="Тавсифро ворид кунед"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      {/* Амалиётҳои тугмаҳо бо DialogActions */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "flex-end", gap: 1 }}>
        <Button
          onClick={close}
          sx={{
            textTransform: "none",
            fontWeight: "600",
            color: "#3b82f6",
            fontSize: 15,
            px: 2.5,
            py: 1,
            borderRadius: "10px",
            "&:hover": { background: "#f1f5f9" },
          }}
        >
          Бекор Кардан
        </Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={save}
          disableElevation
          sx={{
            background: "#3b82f6",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "600",
            px: 3,
            py: 1,
            fontSize: 15,
            "&:hover": { background: "#2563eb" },
          }}
        >
          {loading ? "Интизорӣ..." : "Нигоҳ Доштан"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDebtModal;