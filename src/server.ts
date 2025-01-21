import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { commentsList } from "./comments";
import { v4 as uuidv4 } from "uuid";
const PORT = 4000;

const app = express();

const corsOptions = {
  origin: "https://jinu-sportfolioconsole.web.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// 기본 CORS 설정
app.use(cors(corsOptions));

// 모든 라우트에 대해 CORS 프리플라이트 설정
app.options("*", cors(corsOptions));

app.use(express.json());

// 각 라우트에 대해 명시적으로 CORS 설정
app.get("/api/comments/:projectId", cors(corsOptions), ((
  req: Request,
  res: Response
) => {
  const projectId = req.params.projectId;
  const head = commentsList.getProjectHead(projectId);
  res.json({ head });
}) as RequestHandler);

app.post("/api/comments/:projectId", cors(corsOptions), ((
  req: Request,
  res: Response
) => {
  const projectId = req.params.projectId;
  const newComment = {
    id: uuidv4(),
    projectId,
    ...req.body,
    createdAt: new Date().toLocaleDateString(),
  };

  commentsList.insertLast(projectId, newComment);
  res.json({ head: commentsList.getProjectHead(projectId) });
}) as RequestHandler);

app.delete("/api/comments/:projectId/:commentId", cors(corsOptions), ((
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

app.put("/api/comments/:projectId/:commentId", cors(corsOptions), ((
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
        id: commentId,
        projectId,
        createdAt: current.data.createdAt,
      };

      commentsList.updateAt(projectId, index, updatedComment);
      return res.json({ head: commentsList.getProjectHead(projectId) });
    }
    current = current.next;
    index++;
  }

  res.status(404).json({ message: "Comment not found" });
}) as RequestHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
