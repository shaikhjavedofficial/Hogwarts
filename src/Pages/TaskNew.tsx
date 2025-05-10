import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskNew: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskNameFocused, setTaskNameFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [dueDateFocused, setDueDateFocused] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!taskName || !dueDate) {
      setError("Task name and due date are required");
      return;
    }
    try {
      await axios.post(
        process.env.API_URL + "/tasks",
        { taskName, description, dueDate },
        { withCredentials: true }
      );
      navigate("/tasks");
    } catch (err) {
      setError((err as any).response?.data?.msg || "Failed to add task");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ p: 5, width: "100%", maxWidth: 420, boxShadow: 0 }}>
        <Typography variant="h4" fontWeight={700} align="center" mb="4rem">
          Add Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              fullWidth
              autoFocus
              variant="outlined"
              placeholder={taskNameFocused ? "" : "Enter Task Name"}
              onFocus={() => setTaskNameFocused(true)}
              onBlur={() => setTaskNameFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#D9D9D975",
                },
              }}
            />
            <TextField
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              minRows={2}
              variant="outlined"
              placeholder={descriptionFocused ? "" : "Description"}
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#D9D9D975",
                },
              }}
            />
            <TextField
              type="date"
              value={dueDate}
              placeholder={dueDateFocused ? "" : "Date Picker"}
              onFocus={() => setDueDateFocused(true)}
              onBlur={() => setDueDateFocused(false)}
              onChange={(e) => setDueDate(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#D9D9D975",
                },
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              gap="1rem"
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.2rem",
                  backgroundColor: "#1E3BA3",
                  width: "8rem",
                  borderRadius: "43px",
                }}
              >
                Save
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  setTaskName("");
                  setDescription("");
                  setDueDate("");
                  navigate("/tasks");
                }}
                variant="text"
                size="large"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.2rem",
                  backgroundColor: "white",
                  color: "black",
                  width: "8rem",
                  borderRadius: "43px",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskNew;
