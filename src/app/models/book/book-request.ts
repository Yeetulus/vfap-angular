export default interface BookRequest  {
  bookId: number,
  title: string
  pages: number,
  releaseDate: Date,
  genreId: number,
  authorIds: number[],
};
