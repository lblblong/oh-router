<template>
  <div>
    <div class="container">
      <router-outlet />
    </div>

    <div class="navBar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 8px;
}

.navBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #dfdfdf;
}
</style>
