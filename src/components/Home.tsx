import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser } from "../reduser/todo.slice";
import { useTodo } from "../store/count";
import { useAtom } from "jotai";
import { dataAtom, addAtom, editAtom } from "../store/todo.atoms";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.user.data || []);
  const { data1, addUser1, editUser1 } = useTodo();
  const [data2] = useAtom(dataAtom);
  const [, addUser2] = useAtom(addAtom);
  const [, editUser2] = useAtom(editAtom);


  const [open, setOpen] = useState(false);
  // add
  const [openAdd, setOpenAdd] = useState(false);
  function handleAdd() {
  const id = Date.now();

    dispatch(addUser({ id, role }));
    addUser1({ id, name, surname, age: Number(age) });
    addUser2({ id, phone, status: true });

    setOpenAdd(false);
  }
  // edit
  function handleEdit() {
    if (!selectedUser) return;

    const id = selectedUser.id;

    dispatch(editUser({ id, role }));
    editUser1({ id, name, surname, age: Number(age) });
    editUser2({ id, phone, status: selectedUser.status });

    setOpenEdit(false);
  }
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteUser(el.id));
    setOpen(false);
  };



  const maindata = data.map((u: any) => {
    const z = data1.find((x) => x.id === u.id) || {};
    const j = data2.find((x) => x.id === u.id) || {};
    return { ...u, ...z, ...j };
  });

  // SEARCH
  const [search, setSearch] = useState("")
  const filteredData = maindata.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <>
      {/* SEARCH */}
      <TextField id="outlined-basic" label="Search..." variant="outlined" onChange={(e) => setSearch(e.target.value)} sx={{ marginTop: "20px", marginLeft: "20px" }} />
      {/* add */}
      <Button variant="contained" onClick={() => setOpenAdd(true)} sx={{ marginTop: "25px", marginLeft: "20px" }}>
        Add User
      </Button>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
        <DialogTitle>Add User</DialogTitle>

        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth margin="dense" label="Surname" onChange={(e) => setSurname(e.target.value)} />
          <TextField fullWidth margin="dense" label="Age" onChange={(e) => setAge(e.target.value)} />
          <TextField fullWidth margin="dense" label="Role" onChange={(e) => setRole(e.target.value)} />
          <TextField fullWidth margin="dense" label="Phone" onChange={(e) => setPhone(e.target.value)} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* info */}
      <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
        <DialogTitle>User Info</DialogTitle>

        <DialogContent>
          <p><b>Name:</b> {selectedUser?.name}</p>
          <p><b>Surname:</b> {selectedUser?.surname}</p>
          <p><b>Age:</b> {selectedUser?.age}</p>
          <p><b>Role:</b> {selectedUser?.role}</p>
          <p><b>Phone:</b> {selectedUser?.phone}</p>
          <p>
            <b>Status:</b>{" "}
            {selectedUser?.status ? "Active 🟢" : "Inactive 🔴"}
          </p>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenInfo(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* edit */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent>
          <TextField fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth margin="dense" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <TextField fullWidth margin="dense" value={age} onChange={(e) => setAge(e.target.value)} />
          <TextField fullWidth margin="dense" value={role} onChange={(e) => setRole(e.target.value)} />
          <TextField fullWidth margin="dense" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>Update</Button>
        </DialogActions>
      </Dialog>
      < div style={{ padding: 20 }}>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((el: any) => (
                <TableRow key={el.id}>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.surname}</TableCell>
                  <TableCell>{el.age}</TableCell>
                  <TableCell>{el.role}</TableCell>
                  <TableCell>{el.phone}</TableCell>
                  <TableCell>{el.status ? "ACTIVE" : "INACTIVE"}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleOpen}
                    >
                      Delete
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Confirm Delete</DialogTitle>

                      <DialogContent>
                        Are you sure you want to delete this user?
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleClose}>
                          Cancel
                        </Button>

                        <Button variant="contained" onClick={() => dispatch(deleteUser(el.id))} color="error">
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      onClick={() => {
                        setSelectedUser(el);
                        setOpenInfo(true);
                      }}
                    >
                      Info
                    </Button>
                    <Button variant="contained"
                      onClick={() => {
                        setSelectedUser(el);
                        setName(el.name);
                        setSurname(el.surname);
                        setAge(el.age);
                        setRole(el.role);
                        setPhone(el.phone);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </div >
    </>
  );
}