type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}

type Comments = Comment[];

type CommentsByGuitar = Record<number, Comments>;

export type {Comment, Comments, CommentsByGuitar};
