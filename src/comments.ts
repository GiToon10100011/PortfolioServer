interface IComment {
  id: string;
  content: string;
  username: string;
  createdAt: string;
  projectId: string;
}

class Node {
  constructor(public data: IComment, public next: Node | null = null) {}
}

class CommentLinkedList {
  projectLists: { [projectId: string]: Node | null } = {};
  projectCounts: { [projectId: string]: number } = {};

  constructor() {
    this.projectLists = {};
    this.projectCounts = {};
  }

  insertAt(projectId: string, index: number, data: IComment) {
    if (!this.projectLists[projectId]) {
      this.projectLists[projectId] = null;
      this.projectCounts[projectId] = 0;
    }

    if (index > this.projectCounts[projectId] || index < 0)
      throw new Error("추가할 수 있는 범위를 초과하였습니다.");

    let newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.projectLists[projectId];
      this.projectLists[projectId] = newNode;
    } else {
      let currentNode = this.projectLists[projectId];
      for (let i = 0; i < index - 1; i++) {
        currentNode && (currentNode = currentNode.next);
      }
      newNode.next = currentNode?.next || null;
      currentNode && (currentNode.next = newNode);
    }
    this.projectCounts[projectId]++;
  }

  insertLast(projectId: string, data: IComment) {
    this.insertAt(projectId, this.projectCounts[projectId] || 0, data);
  }

  deleteAt(projectId: string, index: number) {
    if (!this.projectLists[projectId]) return null;

    if (index >= this.projectCounts[projectId] || index < 0)
      throw new Error("제거할 수 있는 범위를 초과하였습니다.");

    let currentNode = this.projectLists[projectId];

    if (index === 0) {
      let deletedNode = this.projectLists[projectId];
      this.projectLists[projectId] = this.projectLists[projectId]?.next || null;
      this.projectCounts[projectId]--;
      return deletedNode;
    } else {
      for (let i = 0; i < index - 1 && currentNode; i++) {
        if (currentNode.next) {
          currentNode = currentNode.next;
        }
      }
      let deletedNode = currentNode?.next || null;
      currentNode && (currentNode.next = currentNode.next?.next || null);
      this.projectCounts[projectId]--;
      return deletedNode;
    }
  }

  getProjectHead(projectId: string): Node | null {
    return this.projectLists[projectId] || null;
  }

  updateAt(projectId: string, index: number, data: IComment) {
    if (!this.projectLists[projectId]) {
      throw new Error("프로젝트를 찾을 수 없습니다.");
    }

    if (index >= this.projectCounts[projectId] || index < 0) {
      throw new Error("수정할 수 있는 범위를 초과하였습니다.");
    }

    let currentNode = this.projectLists[projectId];
    for (let i = 0; i < index && currentNode; i++) {
      if (currentNode.next) {
        currentNode = currentNode.next;
      }
    }

    if (currentNode) {
      currentNode.data = data;
    }
  }
}

export const commentsList = new CommentLinkedList();
