<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled || open }">
    <div class="nav-progress" :style="{ transform: 'scaleX(' + progress + ')' }" aria-hidden="true"></div>
    <div class="nav-inner container">
      <a href="#top" class="brand" @click.prevent="go('top')">
        <img :src="avatar" alt="" width="34" height="34" />
        <span>Likai Xu</span>
      </a>

      <nav class="links" aria-label="Sections">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="'#' + section.id"
          :class="{ active: active === section.id }"
          :aria-current="active === section.id ? 'true' : null"
          @click.prevent="go(section.id)"
        >{{ section.label }}</a>
      </nav>

      <div class="actions">
        <a class="btn btn-primary btn-sm" :href="cvUrl" target="_blank" rel="noopener">
          <AppIcon name="download" :size="16" />
          <span>CV</span>
        </a>
        <button
          class="menu-btn"
          type="button"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'x' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <transition name="drop">
      <nav v-if="open" id="mobile-menu" class="mobile-menu" aria-label="Sections">
        <div class="container">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="'#' + section.id"
            :class="{ active: active === section.id }"
            @click.prevent="go(section.id)"
          >
            {{ section.label }}
            <AppIcon name="arrow-right" :size="16" />
          </a>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import avatar from '@/components/images/PhoneBillCute.jpg'

defineProps({
  sections: { type: Array, required: true },
  active: { type: String, default: '' },
  scrolled: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  cvUrl: { type: String, required: true },
})

const open = ref(false)

const go = (id) => {
  open.value = false
  if (id === 'top') {
    window.scrollTo({ top: 0 })
    history.replaceState(null, '', window.location.pathname)
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ block: 'start' })
    history.replaceState(null, '', '#' + id)
  }
}

const onKey = (event) => {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  border-bottom: 1px solid transparent;
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease);
}

.nav.is-scrolled {
  background: rgba(10, 15, 26, 0.74);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom-color: var(--line);
}

.nav-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: linear-gradient(90deg, var(--sea), var(--accent));
  transform-origin: left center;
  transform: scaleX(0);
}

.nav-inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--ink);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.brand img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  object-fit: cover;
}

.links {
  display: flex;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--line);
}

.links a {
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-3);
  transition: color 0.2s, background 0.2s;
}

.links a:hover {
  color: var(--ink);
}

.links a.active {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-btn {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.05);
}

.mobile-menu {
  padding: 0.25rem 0 1.25rem;
}

.mobile-menu .container {
  display: grid;
}

.mobile-menu a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0.25rem;
  font-size: 1.05rem;
  color: var(--ink-2);
  border-bottom: 1px solid var(--line);
}

.mobile-menu a.active {
  color: var(--accent);
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .links {
    display: none;
  }

  .menu-btn {
    display: inline-flex;
  }
}
</style>
