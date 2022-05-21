import { Link, Outlet } from 'oh-router-react'

export const BookListPage = () => {
  return (
    <div>
      <h4>Book List</h4>
      <ul>
        <li>
          <Link to="/books/The Old Man and the Sea">
            《The Old Man and the Sea》
          </Link>
        </li>
        <li>
          <Link to="/books/The adventures of Robinson Crusoe">
            《The adventures of Robinson Crusoe》
          </Link>
        </li>
      </ul>

      <h4>Book Detail</h4>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
