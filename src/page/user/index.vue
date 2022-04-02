<template>
  <div class="project">
    <project-header></project-header>
    <div class="project-container">
      <management-list></management-list>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>
