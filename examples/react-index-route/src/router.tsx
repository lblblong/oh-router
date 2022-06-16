import { Router } from 'oh-router'
import { BookDetailPage } from './pages/book-detail'
import { BookIndexPage } from './pages/book-index'
import { BookListPage } from './pages/book-list'

export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/books',
      element: <BookListPage />,
      children: [
        {
          index: true,
          element: <BookIndexPage />,
        },
        {
          path: ':name',
          element: <BookDetailPage />,
        },
      ],
    },
  ],
})
