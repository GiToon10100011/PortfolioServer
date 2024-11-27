import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { commentsList } from "./comments";
import { v4 as uuidv4 } from "uuid";
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/comments/:projectId", ((req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const head = commentsList.getProjectHead(projectId);
  res.json({ head });
}) as RequestHandler);

app.post("/api/comments/:projectId", ((req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const newComment = {
    id: uuidv4(),
    projectId, // Add projectId to the comment
    ...req.body,
    createdAt: new Date().toLocaleDateString(),
  };

  commentsList.insertLast(projectId, newComment);
  res.json({ head: commentsList.getProjectHead(projectId) });
}) as RequestHandler);

app.delete("/api/comments/:projectId/:commentId", ((
  req: Request,
  res: Response
) => {
  const { projectId, commentId } = req.params;
  let current = commentsList.getProjectHead(projectId);
  let index = 0;

  while (current) {
    if (current.data.id === commentId) {
      commentsList.deleteAt(projectId, index);
      return res.json({ head: commentsList.getProjectHead(projectId) });
    }
    current = current.next;
    index++;
  }

  res.status(404).json({ message: "Comment not found" });
}) as RequestHandler);

app.put("/api/comments/:projectId/:commentId", ((
  req: Request,
  res: Response
) => {
  const { projectId, commentId } = req.params;
  const updates = req.body;
  let current = commentsList.getProjectHead(projectId);
  let index = 0;

  while (current) {
    if (current.data.id === commentId) {
      const updatedComment = {
        ...current.data,
        ...updates,
        id: commentId, // Preserve the original ID
        projectId, // Preserve the project ID
        createdAt: current.data.createdAt, // Preserve the original creation date
      };

      commentsList.updateAt(projectId, index, updatedComment);
      return res.json({ head: commentsList.getProjectHead(projectId) });
    }
    current = current.next;
    index++;
  }

  res.status(404).json({ message: "Comment not found" });
}) as RequestHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
