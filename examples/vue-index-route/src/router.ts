import { Router } from 'oh-router'
import BookDetailPage from './pages/book-detail/index.vue'
import BookIndexPage from './pages/book-index/index.vue'
import BookListPage from './pages/book-list/index.vue'

export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/books',
      element: BookListPage,
      children: [
        {
          index: true,
          element: BookIndexPage,
        },
        {
          path: ':name',
          element: BookDetailPage,
        },
      ],
    },
  ],
})
