export type ModalRoute =
  | { type: 'program'; id: string }
  | { type: 'article'; id: string }
  | { type: 'journal' }
  | { type: 'guide' }
  | { type: 'planner' }
  | { type: 'quiz' }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' };

export type DownloadRequest =
  | { kind: 'guide' }
  | { kind: 'planner'; completed: string[] }
  | { kind: 'program'; programId: string; completed: string[] }
  | { kind: 'recipe'; articleId: string; servings: number };