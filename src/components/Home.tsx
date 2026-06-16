import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getData,
  addUser,
} from "../reduser/todo.slice";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function Home() {
  const dispatch = useDispatch<any>();

  const data = useSelector(
    (store: any) => store.todo.data
  );

  const isLoading = useSelector(
    (store: any) => store.todo.isLoading
  );

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [image, setImage] =
    useState<File | null>(null);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const preview = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  const handleAdd = useCallback(() => {
    if (
      !name.trim() ||
      !description.trim() ||
      !image
    )
      return;

    dispatch(
      addUser({
        name,
        description,
        image,
      })
    );

    setName("");
    setDescription("");
    setImage(null);
    setOpen(false);
  }, [
    name,
    description,
    image,
    dispatch,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <div className="flex justify-between items-center my-8">
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Users List
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add User
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.map((el: any) => (
            <Card
              key={el.id}
              className="shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <CardContent>
                {el.images?.[0]?.imageName && (
                  <img
                    src={`https://to-dos-api.softclub.tj/images/${el.images[0].imageName}`}
                    alt={el.name}
                    className="w-full h-52 object-cover rounded-xl mb-3"
                  />
                )}

                <Typography variant="h5">
                  {el.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  {el.description}
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 1 }}
                >
                  ID: {el.id}
                </Typography>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      dispatch(deleteUser(el.id))
                    }
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Add User
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (!file) return;

                if (
                  file.size >
                  2 * 1024 * 1024
                ) {
                  alert(
                    "Image must be less than 2MB"
                  );
                  return;
                }

                setImage(file);
              }}
            />
          </Button>

          {image && (
            <>
              <Typography sx={{ mt: 2 }}>
                {image.name}
              </Typography>

              <img
                src={preview}
                alt="preview"
                className="w-full h-52 object-cover rounded-xl mt-3"
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}