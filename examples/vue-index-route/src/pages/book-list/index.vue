<template>
  <div>
    <h4>Book List</h4>
    <ul>
      <li>
        <router-link to="/books/The Old Man and the Sea">
          《The Old Man and the Sea》
        </router-link>
      </li>
      <li>
        <router-link to="/books/The adventures of Robinson Crusoe">
          《The adventures of Robinson Crusoe》
        </router-link>
      </li>
    </ul>

    <h4>Book Detail</h4>

    <div>
      <router-outlet />
    </div>
  </div>
</template>
