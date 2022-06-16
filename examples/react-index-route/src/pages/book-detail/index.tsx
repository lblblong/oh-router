import { useParams } from 'oh-router-react'

export const BookDetailPage = () => {
  const { name } = useParams<'name'>()

  return <div>The name of the book is《{name}》</div>
}
