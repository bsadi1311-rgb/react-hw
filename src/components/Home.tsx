import { useEffect, useState } from "react";
import { useData } from "../store/count";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function Home() {
  const { data, getData, addUser, deleteUser, editUser } = useData();

  // ADD
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // SEARCH
  const [search, setSearch] = useState("");

  // EDIT
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // INFO
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoName, setInfoName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  // ADD
  const handleAdd = () => {
    if (!name.trim()) return;

    addUser(name);
    setName("");
    setOpen(false);
  };

  // EDIT
  const handleEditSave = () => {
    if (!editName.trim()) return;

    editUser(editId!, editName);
    setEditId(null);
    setEditName("");
  };

  // SEARCH
  const filteredData = data.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* SEARCH */}
      <input
        className="border p-2 mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ADD BUTTON */}
      <Button
              variant="contained"  onClick={() => setOpen(true)}>Add User</Button>

      {/* ADD MODAL */}
      {open && (
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <button onClick={handleAdd}>Save</button>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}

      {/* EDIT MODAL */}
      {editId !== null && (
        <div>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <button onClick={handleEditSave}>Update</button>
          <button onClick={() => setEditId(null)}>Close</button>
        </div>
      )}

      {/* INFO DIALOG */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
        <DialogTitle>User Info</DialogTitle>
        <DialogContent>
          <h2>Name: {infoName}</h2>
        </DialogContent>

        <Button onClick={() => setInfoOpen(false)}>Close</Button>
      </Dialog>

      {/* LIST */}
      {filteredData.map((el) => (
        <div key={el.id}>
          <h3>{el.name}</h3>

          <div className="flex gap-5">
            <Button
              variant="contained" sx={{backgroundColor: "red"}} onClick={() => deleteUser(el.id)}>Delete</Button>

            <Button
              variant="text"
              onClick={() => {
                setEditId(el.id);
                setEditName(el.name);
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setInfoName(el.name);
                setInfoOpen(true);
              }}
            >
              Info
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}