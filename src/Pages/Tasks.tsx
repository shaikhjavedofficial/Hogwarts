import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "../hooks/useBreakpoints";
interface Task {
  _id: string;
  taskName: string;
  description?: string;
  dueDate: string;
  createdAt: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const res = await axios.get(process.env.API_URL + "/tasks", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setTasks(res.data);
      setError("");
    } catch (err) {
      if ((err as any).response?.status === 401) navigate("/login");
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(process.env.API_URL + `/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const paginatedTasks = tasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const pageCount = Math.ceil(tasks.length / rowsPerPage);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, md: 8 },
        background: "#fff",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
      >
        <Typography
          variant="body1"
          fontWeight={700}
          fontSize={isMobile ? 20 : isTablet ? 24 : 28}
          color="primary"
          sx={{ letterSpacing: 1 }}
        >
          Tasks Management
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="ri-add-line"></i>}
          onClick={() => navigate("/tasks/new")}
          sx={{
            borderRadius: "2rem",
            fontWeight: 600,
            width: "8rem",
            backgroundColor: "#1E3BA3",
          }}
        >
          Add Task
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 3, boxShadow: 0 }}>
        <Box>
          {!isMobile && (
            <Box
              display="flex"
              alignItems="center"
              px={3}
              py={2}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                color: "#2956D7",
                mb: 2,
              }}
            >
              <Box flex={1}>No</Box>
              <Box flex={2}>Date &amp; Time</Box>
              <Box flex={2}>Task</Box>
              <Box flex={3}>Description</Box>
              <Box flex={1} textAlign="center">
                Action
              </Box>
            </Box>
          )}
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={5}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : paginatedTasks.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={5}
            >
              <Typography color="text.secondary">
                No tasks found. Click "Add Task" to create one!
              </Typography>
            </Box>
          ) : (
            paginatedTasks.map((task, idx) => (
              <Box
                key={task._id}
                display="flex"
                alignItems="center"
                px={3}
                py={2}
                mb={1}
                sx={{
                  borderRadius: 1,
                  background: "#fff",
                  boxShadow: `
            -2px 0px 4px 0px #0000001A,
            -6px 0px 6px 0px #00000017,
            -14px 0px 9px 0px #0000000D,
            -26px 0px 10px 0px #00000003,
            -40px 0px 11px 0px #00000000
          `,
                }}
              >
                {!isMobile && (
                  <>
                    <Box flex={1}>{(page - 1) * rowsPerPage + idx + 1}</Box>
                    <Box flex={2}>
                      {new Date(task.dueDate).toLocaleDateString()}{" "}
                      {new Date(task.dueDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Box>
                    <Box flex={2} fontWeight={600}>
                      {task.taskName}
                    </Box>
                    <Box flex={3}>{task.description}</Box>
                    <Box flex={1} textAlign="right">
                      <IconButton
                        size="large"
                        onClick={(e) => handleMenuOpen(e, task._id)}
                      >
                        <i className="ri-more-2-line"></i>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedTaskId === task._id}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            navigate(`/tasks/edit/${task._id}`);
                            handleMenuClose();
                          }}
                        >
                          <i className="ri-check-line"></i>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDelete(task._id);
                            handleMenuClose();
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                )}
                {isMobile && (
                  <>
                    <Box>
                      <Box flex={2} fontWeight={600}>
                        {task.taskName}
                      </Box>
                      <Box flex={3}>{task.description}</Box>
                      <Box flex={2}>
                        {new Date(task.dueDate).toLocaleDateString()}{" "}
                        {new Date(task.dueDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Box>
                    </Box>
                    <Box flex={1} textAlign="right">
                      <IconButton
                        size="large"
                        onClick={(e) => handleMenuOpen(e, task._id)}
                      >
                        <i className="ri-more-2-line"></i>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedTaskId === task._id}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            navigate(`/tasks/edit/${task._id}`);
                            handleMenuClose();
                          }}
                        >
                          <i className="ri-check-line"></i>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDelete(task._id);
                            handleMenuClose();
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                )}
              </Box>
            ))
          )}
        </Box>
        {tasks.length > rowsPerPage && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              variant="outlined"
              shape="rounded"
              color="standard"
              siblingCount={2}
              boundaryCount={1}
              sx={{
                "& .MuiPaginationItem-page": {
                  borderRadius: "0",
                  border: "none",
                  fontWeight: 400,
                  color: "grey",
                },

                "& .Mui-selected": {
                  fontWeight: 700,
                  color: "#000",
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Tasks;
