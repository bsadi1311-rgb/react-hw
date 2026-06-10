import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { addUser, deleteUser, editUser } from "../reduser/todo.slice";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todo.data);
  const dispatch = useDispatch();
  //edit
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const handleEdit = (el: any) => {
    setEditId(el.id);
    setEditName(el.n);
  };
  const handleEditSave = () => {
    if (!editName.trim() || editId === null) return;

    dispatch(
      editUser({
        id: editId,
        newName: editName,
      })
    );

    setEditId(null);
    setEditName("");
  };
  // add
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  // INFO
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoName, setInfoName] = useState("");
  // SEARCH
  const [search, setSearch] = useState("");

  // SEARCH
  const filteredData = todos.filter((el) =>
    el.n.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!name.trim()) return;

    dispatch(
      addUser({
        id: Date.now(),
        n: name,
      })
    );

    setName("");
    setOpen(false);
  };

  return (
    <>
      {/* SEARCH */}
      <input
        className="border p-2 mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* adit modal */}
      <Dialog open={editId !== null} onClose={() => setEditId(null)}>
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditId(null)}>Close</Button>

          <Button variant="contained" onClick={handleEditSave}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* INFO DIALOG */}
      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
      >
        <DialogTitle>User Info</DialogTitle>

        <DialogContent>
          <h2>Name: {infoName}</h2>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setInfoOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* add */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="User Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* ----------------------------------- */}
      <table className="w-full mt-5 overflow-hidden bg-white rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((el) => (
            <tr
              key={el.id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="px-4 py-3">{el.id}</td>

              <td className="px-4 py-3">{el.n}</td>

              <td className="px-4 py-3 text-center">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => dispatch(deleteUser(el.id))}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setInfoName(el.n);
                    setInfoOpen(true);
                  }}
                >
                  Info
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 1 , backgroundColor: "orange"}}
                  onClick={() => handleEdit(el)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}