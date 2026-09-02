<template>
  <div id="app" class="bg-light min-vh-100">
    <!-- NAVBAR DE BOOTSTRAP -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div class="container-fluid px-4">
        
        <!-- BRAND / LOGO -->
        <router-link class="navbar-brand d-flex align-items-center fw-bold" to="/forwards">
          <i class="fa-solid fa-futbol fs-4 me-2"></i>
          <span>Footballers Base</span>
        </router-link>

        <!-- BOTÓN HAMBURGUESA MÓVIL -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- ENLACES DE NAVEGACIÓN -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav nav-pills gap-1 mt-2 mt-lg-0">
            <li class="nav-item" v-for="item in items" :key="item.label">
              <router-link 
                :to="item.to" 
                class="nav-link px-3 py-1 text-white text-center rounded"
                active-class="active fw-bold text-dark bg-white"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </nav>

    <!-- VISTA PRINCIPAL (Con :key para forzar la actualización al cambiar de ruta) -->
    <main>
      <router-view :key="$route.fullPath"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      items: [
        { label: "Forwards", to: "/forwards" },
        { label: "Midfielders", to: "/midfielders" },
        { label: "Defenders", to: "/defenders" },
        { label: "Goalkeepers", to: "/goalkeepers" }
      ]
    };
  }
};
</script>

<style>
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f8f9fa;
}

.nav-link {
  transition: all 0.2s ease-in-out;
  opacity: 0.85;
}

.nav-link:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* Pestaña Activa: Fondo blanco con texto oscuro totalmente legible */
.nav-link.active {
  opacity: 1 !important;
  color: #0d6efd !important; /* Color azul de Bootstrap */
  background-color: #ffffff !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
</style>