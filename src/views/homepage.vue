<template>
  <div class="home">
    <a class="skip-link" href="#about">Skip to content</a>
    <SiteNav
      :sections="navSections"
      :active="active"
      :scrolled="scrolled"
      :progress="progress"
      :cv-url="profile.cvUrl"
    />

    <main>
      <!-- Hero -->
      <section id="top" class="hero container">
        <div class="hero-copy">
          <p v-reveal class="status">
            <span class="pulse" aria-hidden="true"></span>
            {{ profile.status }} · Auckland
          </p>
          <h1 v-reveal="80" class="hero-title">
            <span class="hello">Hi, I'm</span>
            {{ profile.name }}<span class="dot">.</span>
          </h1>
          <p v-reveal="160" class="hero-role">
            Full-stack developer building
            <span class="typed">{{ typed }}</span><span class="caret" aria-hidden="true"></span>
          </p>
          <p v-reveal="240" class="hero-lead">{{ profile.headline }}</p>
          <div v-reveal="320" class="hero-cta">
            <a class="btn btn-primary" :href="profile.cvUrl" target="_blank" rel="noopener">
              <AppIcon name="download" :size="18" />
              Download CV
            </a>
            <a class="btn btn-ghost" href="#experience" @click.prevent="scrollToId('experience')">
              See my work
              <AppIcon name="arrow-right" :size="18" />
            </a>
          </div>
          <div v-reveal="400" class="socials">
            <a class="icon-btn" :href="profile.links.github" target="_blank" rel="noopener" aria-label="GitHub">
              <AppIcon name="github" />
            </a>
            <a class="icon-btn" :href="profile.links.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
              <AppIcon name="linkedin" />
            </a>
            <button class="icon-btn" type="button" aria-label="Copy email address" @click="copyEmail">
              <AppIcon :name="copied ? 'check' : 'mail'" />
            </button>
            <button class="icon-btn" type="button" aria-label="Share this site" @click="shareSite">
              <AppIcon name="share" />
            </button>
          </div>
        </div>

        <aside v-reveal="220" v-spotlight class="hero-card glass" aria-label="Quick facts">
          <div class="card-top">
            <div class="avatar-ring">
              <img :src="avatar" alt="Likai's avatar" width="76" height="76" />
            </div>
            <div>
              <p class="card-name">{{ profile.name }} <span>· {{ profile.nickname }}</span></p>
              <p class="card-meta"><AppIcon name="map-pin" :size="14" />{{ profile.location }}</p>
            </div>
          </div>
          <div class="now">
            <div class="now-cell">
              <span class="now-label">Local time</span>
              <span class="now-value">{{ time || '--:--' }}</span>
              <span class="now-sub">{{ date }}</span>
            </div>
            <div class="now-cell">
              <span class="now-label">Weather</span>
              <span class="now-value">{{ weather ? weather.icon + ' ' + weather.temp + '°' : '—' }}</span>
              <span class="now-sub">{{ weather ? weather.label : 'Auckland' }}</span>
            </div>
          </div>
          <ul class="facts plain-list">
            <li v-for="fact in profile.facts" :key="fact.label">
              <strong>{{ fact.value }}</strong>
              <span>{{ fact.label }}</span>
            </li>
          </ul>
          <p class="quote">
            <em>“{{ profile.quote.latin }}”</em>
            <span>{{ profile.quote.chinese }}</span>
          </p>
        </aside>

        <a class="scroll-cue" href="#about" aria-label="Scroll to About" @click.prevent="scrollToId('about')">
          <span></span>
        </a>
      </section>

      <!-- About -->
      <section id="about" class="section container">
        <header v-reveal class="section-head">
          <span class="eyebrow">About</span>
          <h2 class="section-title">A developer who likes <br />the whole picture.</h2>
        </header>
        <div class="about-grid">
          <div v-reveal class="about-copy">
            <p v-for="(paragraph, i) in about.paragraphs" :key="i">{{ paragraph }}</p>
            <div class="interests">
              <span class="interests-label">Off the clock</span>
              <div class="chips">
                <template v-for="item in about.interests" :key="item.label">
                  <router-link v-if="item.to" :to="item.to" class="chip chip-link">
                    <span aria-hidden="true">{{ item.emoji }}</span>{{ item.label }}
                  </router-link>
                  <span v-else class="chip"><span aria-hidden="true">{{ item.emoji }}</span>{{ item.label }}</span>
                </template>
              </div>
            </div>
          </div>
          <div class="strengths">
            <article
              v-for="(item, i) in about.strengths"
              :key="item.title"
              v-reveal="i * 90"
              v-spotlight
              class="strength glass"
            >
              <span class="strength-icon"><AppIcon :name="item.icon" :size="20" /></span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="section container">
        <header v-reveal class="section-head">
          <span class="eyebrow">Experience</span>
          <h2 class="section-title">Two internships, two very <br />different starting points.</h2>
        </header>
        <ol class="timeline plain-list">
          <li v-for="(job, i) in experience" :key="job.company" v-reveal="i * 100" class="timeline-item">
            <span class="timeline-dot" aria-hidden="true"></span>
            <article v-spotlight class="job glass">
              <header class="job-head">
                <div>
                  <h3>{{ job.company }}</h3>
                  <p class="job-role">{{ job.role }} <span>· {{ job.place }}</span></p>
                </div>
                <span class="period">{{ job.period }}</span>
              </header>
              <p class="job-summary">{{ job.summary }}</p>
              <ul class="points plain-list">
                <li v-for="point in job.points" :key="point">{{ point }}</li>
              </ul>
              <div class="chips">
                <span v-for="tech in job.tech" :key="tech" class="chip">{{ tech }}</span>
              </div>
            </article>
          </li>
        </ol>
        <p v-reveal class="footnote">
          Both were internal systems, so the code isn't public — I'm happy to walk through the architecture and trade-offs in an interview.
        </p>
      </section>

      <!-- Projects -->
      <section id="projects" class="section container">
        <header v-reveal class="section-head">
          <span class="eyebrow">Projects</span>
          <h2 class="section-title">Things I've built.</h2>
        </header>

        <article v-reveal v-spotlight class="featured glass">
          <div class="featured-intro">
            <span class="featured-tag">Featured · {{ featured.period }}</span>
            <h3>{{ featured.name }}</h3>
            <p class="featured-kind">{{ featured.kind }}</p>
            <p class="featured-role">{{ featured.role }}</p>
            <p class="featured-summary">{{ featured.summary }}</p>
            <div class="chips">
              <span v-for="tech in featured.tech" :key="tech" class="chip">{{ tech }}</span>
            </div>
            <a class="btn btn-ghost btn-sm featured-link" :href="featured.url" target="_blank" rel="noopener">
              {{ featured.linkLabel }}
              <AppIcon name="arrow-up-right" :size="16" />
            </a>
          </div>
          <ul class="featured-points plain-list">
            <li v-for="point in featured.points" :key="point">
              <AppIcon name="check-circle" :size="18" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>

        <div class="project-grid">
          <article
            v-for="(project, i) in otherProjects"
            :key="project.name"
            v-reveal="i * 100"
            v-spotlight
            class="project glass"
          >
            <span class="project-kind">{{ project.kind }}</span>
            <h3>{{ project.name }}</h3>
            <p>{{ project.summary }}</p>
            <div class="chips">
              <span v-for="tech in project.tech" :key="tech" class="chip">{{ tech }}</span>
            </div>
            <a v-if="project.url" class="project-link" :href="project.url" target="_blank" rel="noopener">
              {{ project.linkLabel || 'Open' }}
              <AppIcon name="arrow-up-right" :size="15" />
            </a>
          </article>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="section container">
        <header v-reveal class="section-head">
          <span class="eyebrow">Skills</span>
          <h2 class="section-title">Tools I reach for.</h2>
          <p class="section-lead">Hover or tap a skill to see where I've actually used it.</p>
        </header>
        <div class="skills-grid">
          <article
            v-for="(group, i) in skillGroups"
            :key="group.title"
            v-reveal="i * 70"
            class="skill-group glass"
          >
            <h3>{{ group.title }}</h3>
            <div class="chips">
              <button
                v-for="skill in group.skills"
                :key="skill.name"
                type="button"
                class="chip skill-chip"
                :class="{ active: activeSkill && activeSkill.name === skill.name }"
                @mouseenter="selectSkill(group, skill)"
                @focus="selectSkill(group, skill)"
                @click="selectSkill(group, skill)"
              >{{ skill.name }}</button>
            </div>
            <p class="used-in" aria-live="polite">
              <template v-if="activeSkill && activeSkill.group === group.title">
                <strong>{{ activeSkill.name }}</strong> → {{ activeSkill.where.join(' · ') }}
              </template>
              <template v-else>&nbsp;</template>
            </p>
          </article>
        </div>
        <p v-reveal class="also-used">
          Also worked with: <span>{{ alsoUsed.join(' · ') }}</span>
        </p>
      </section>

      <!-- Education -->
      <section id="education" class="section container">
        <header v-reveal class="section-head">
          <span class="eyebrow">Education</span>
          <h2 class="section-title">Where I studied.</h2>
        </header>
        <div class="edu-grid">
          <article
            v-for="(item, i) in education"
            :key="item.school"
            v-reveal="i * 100"
            v-spotlight
            class="edu glass"
            :class="{ 'edu-main': item.courses }"
          >
            <span class="period">{{ item.period }}</span>
            <h3>{{ item.school }}</h3>
            <p class="edu-degree">{{ item.degree }}</p>
            <p v-if="item.highlight" class="edu-highlight">★ {{ item.highlight }}</p>
            <div v-if="item.courses" class="chips">
              <span v-for="course in item.courses" :key="course" class="chip">{{ course }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="section container">
        <div v-reveal v-spotlight class="contact glass">
          <span class="eyebrow">Contact</span>
          <h2 class="section-title">Let's talk.</h2>
          <p class="section-lead">
            I'm looking for graduate and junior developer roles in Auckland. If you're hiring — or just want to talk about a project — my inbox is open.
          </p>
          <div class="email-row">
            <a class="email" :href="'mailto:' + profile.email">{{ profile.email }}</a>
            <button class="btn btn-ghost btn-sm" type="button" @click="copyEmail">
              <AppIcon :name="copied ? 'check' : 'copy'" :size="16" />
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <div class="contact-actions">
            <a class="btn btn-primary" :href="profile.cvUrl" target="_blank" rel="noopener">
              <AppIcon name="download" :size="18" />
              Download CV
            </a>
            <a class="btn btn-ghost" :href="profile.links.linkedin" target="_blank" rel="noopener">
              <AppIcon name="linkedin" :size="18" />
              LinkedIn
            </a>
            <a class="btn btn-ghost" :href="profile.links.github" target="_blank" rel="noopener">
              <AppIcon name="github" :size="18" />
              GitHub
            </a>
          </div>
          <p class="contact-time">
            It's <strong>{{ time || '--:--' }}</strong> in Auckland right now.
          </p>
        </div>
      </section>
    </main>

    <footer class="footer container">
      <p class="footer-quote"><em>{{ profile.quote.latin }}</em> · {{ profile.quote.chinese }}</p>
      <p>
        © {{ year }} {{ profile.name }} · Built with Vue 3 &amp; Vite ·
        <router-link to="/music">Late-night playlist →</router-link>
      </p>
    </footer>

    <transition name="fade">
      <button v-if="showTop" class="to-top icon-btn" type="button" aria-label="Back to top" @click="toTop">
        <AppIcon name="arrow-up" />
      </button>
    </transition>

    <transition name="toast">
      <div v-if="toast" class="toast" role="status">{{ toast }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteNav from '@/components/SiteNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import avatar from '@/components/images/PhoneBillCute.jpg'
import { profile, about, experience, projects, skillGroups, alsoUsed, education, navSections } from '@/data/profile'
import { useAucklandNow } from '@/composables/useAucklandNow'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useTyping } from '@/composables/useTyping'

const { time, date, weather } = useAucklandNow({ timeZone: profile.timeZone, ...profile.coordinates })
const { active, scrolled, progress, showTop } = useScrollSpy(navSections.map((section) => section.id))
const typed = useTyping(profile.typing)

const featured = projects.find((project) => project.featured)
const otherProjects = projects.filter((project) => !project.featured)
const year = new Date().getFullYear()

const activeSkill = ref(null)
const selectSkill = (group, skill) => {
  activeSkill.value = { group: group.title, ...skill }
}

const toast = ref('')
let toastTimer = null
const showToast = (message) => {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 2400)
}

const copied = ref(false)
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    showToast('Email copied — ' + profile.email)
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.location.href = 'mailto:' + profile.email
  }
}

const shareSite = async () => {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Likai Xu — Full-Stack Developer', url: profile.siteUrl })
    } catch {
      // Visitor closed the share sheet.
    }
    return
  }
  try {
    await navigator.clipboard.writeText(profile.siteUrl)
    showToast('Link copied to clipboard')
  } catch {
    showToast('The link is ' + profile.siteUrl)
  }
}

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', '#' + id)
}

const toTop = () => {
  window.scrollTo({ top: 0 })
  history.replaceState(null, '', window.location.pathname)
}
</script>

<style scoped>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
  transform: translateY(-160%);
  transition: transform 0.2s;
}

.skip-link:focus {
  transform: none;
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  align-items: center;
  gap: clamp(32px, 6vw, 80px);
  padding-top: calc(var(--nav-h) + 40px);
  padding-bottom: 96px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.9rem 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--ink);
  background: rgba(110, 231, 168, 0.1);
  border: 1px solid rgba(110, 231, 168, 0.28);
}

.pulse {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ok);
}

.pulse::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--ok);
  animation: ping 2s ease-out infinite;
}

@keyframes ping {
  from { transform: scale(0.6); opacity: 0.9; }
  to { transform: scale(1.8); opacity: 0; }
}

.hero-title {
  margin-top: 1.4rem;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3.4rem, 9vw, 6.6rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-shadow: 0 6px 40px rgba(0, 0, 0, 0.35);
}

.hello {
  display: block;
  margin-bottom: 0.6rem;
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink-3);
}

.dot {
  color: var(--accent);
}

.hero-role {
  margin-top: 1.2rem;
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 500;
  color: var(--ink);
  min-height: 2.2em;
}

.typed {
  color: var(--accent);
}

.caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 3px;
  vertical-align: -0.15em;
  background: var(--accent);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-lead {
  max-width: 54ch;
  margin-top: 1rem;
  font-size: 1.05rem;
  color: var(--ink-2);
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.hero-card {
  padding: 1.5rem;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-ring {
  padding: 3px;
  border-radius: 50%;
  background: conic-gradient(from 200deg, var(--accent), var(--sea), var(--accent));
  flex-shrink: 0;
}

.avatar-ring img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0d1422;
}

.card-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
}

.card-name span {
  font-weight: 400;
  color: var(--ink-3);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.2rem;
  font-size: 0.875rem;
  color: var(--ink-3);
}

.now {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.now-cell {
  display: grid;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
}

.now-label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.now-value {
  margin-top: 0.15rem;
  font-size: 1.6rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}

.now-sub {
  font-size: 0.8rem;
  color: var(--ink-3);
}

.facts {
  display: grid;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.facts li {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--line);
  font-size: 0.92rem;
}

.facts strong {
  min-width: 2.6rem;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1;
  color: var(--accent);
}

.quote {
  display: grid;
  gap: 0.15rem;
  margin-top: 1.1rem;
  font-size: 0.9rem;
  color: var(--ink-3);
}

.quote em {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--sea);
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 26px;
  height: 42px;
  margin-left: -13px;
  border-radius: 999px;
  border: 1.5px solid var(--line-strong);
}

.scroll-cue span {
  position: absolute;
  left: 50%;
  top: 8px;
  width: 4px;
  height: 8px;
  margin-left: -2px;
  border-radius: 2px;
  background: var(--ink-2);
  animation: wheel 1.8s ease-in-out infinite;
}

@keyframes wheel {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(14px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}

/* ---------- About ---------- */
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

.about-copy p {
  font-size: 1.05rem;
}

.about-copy p + p {
  margin-top: 1.1rem;
}

.interests {
  margin-top: 2rem;
}

.interests-label {
  display: block;
  margin-bottom: 0.7rem;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.chip-link {
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.chip-link:hover {
  color: var(--ink);
  border-color: var(--accent);
  background: var(--accent-soft);
}

.strengths {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.strength {
  padding: 1.35rem;
  border-radius: var(--radius);
}

.strength:hover {
  transform: translateY(-4px);
}

.strength-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: var(--accent);
  background: var(--accent-soft);
}

.strength h3 {
  margin-top: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}

.strength p {
  margin-top: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--ink-2);
}

/* ---------- Experience ---------- */
.timeline {
  position: relative;
  display: grid;
  gap: 1.5rem;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 6px;
  width: 1px;
  background: linear-gradient(180deg, var(--accent), var(--sea) 60%, transparent);
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  top: 30px;
  left: calc(-2rem + 1px);
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 5px rgba(246, 178, 107, 0.15);
}

.job {
  padding: clamp(1.25rem, 3vw, 2rem);
}

.job-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.job-head h3 {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--ink);
}

.job-role {
  margin-top: 0.15rem;
  font-weight: 500;
  color: var(--ink-2);
}

.job-role span {
  font-weight: 400;
  color: var(--ink-3);
}

.period {
  flex-shrink: 0;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--sea);
  background: var(--sea-soft);
}

.job-summary {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.35;
  color: var(--accent);
}

.points {
  display: grid;
  gap: 0.55rem;
  margin: 1rem 0 1.25rem;
}

.points li {
  position: relative;
  padding-left: 1.2rem;
}

.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.68em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sea);
}

.footnote {
  margin-top: 1.5rem;
  padding-left: 2rem;
  font-size: 0.9rem;
  color: var(--ink-3);
}

/* ---------- Projects ---------- */
.featured {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(24px, 4vw, 48px);
  padding: clamp(1.5rem, 4vw, 2.5rem);
}

.featured-tag,
.project-kind {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.featured h3 {
  margin-top: 0.6rem;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 400;
  line-height: 1;
  color: var(--ink);
}

.featured-kind {
  margin-top: 0.6rem;
  color: var(--ink);
  font-weight: 500;
}

.featured-role {
  color: var(--ink-3);
  font-size: 0.92rem;
}

.featured-summary {
  margin: 1rem 0 1.25rem;
}

.featured-link {
  margin-top: 1.5rem;
}

.featured-points {
  display: grid;
  gap: 0.9rem;
  align-content: start;
}

.featured-points li {
  display: flex;
  gap: 0.75rem;
  font-size: 0.95rem;
}

.featured-points li :deep(svg) {
  margin-top: 0.2em;
  color: var(--ok);
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.project {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: var(--radius);
}

.project:hover {
  transform: translateY(-4px);
}

.project h3 {
  margin-top: 0.4rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
}

.project p {
  margin: 0.5rem 0 1rem;
  font-size: 0.95rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
}

.project-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* ---------- Skills ---------- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
}

.skill-group {
  display: flex;
  flex-direction: column;
  grid-column: span 2;
  padding: 1.35rem;
  border-radius: var(--radius);
}

/* 3 + 2 layout: the last two groups share the second row. */
.skill-group:nth-child(n + 4) {
  grid-column: span 3;
}

.skill-group h3 {
  margin-bottom: 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.skill-chip {
  font-size: 0.875rem;
  padding: 0.38rem 0.8rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s var(--ease);
}

.skill-chip:hover,
.skill-chip.active {
  color: var(--accent-ink);
  background: var(--accent);
  border-color: var(--accent);
  transform: translateY(-1px);
}

.used-in {
  margin-top: auto;
  padding-top: 0.9rem;
  min-height: 2.4em;
  font-size: 0.85rem;
  color: var(--ink-3);
}

.used-in strong {
  color: var(--ink);
  font-weight: 600;
}

.also-used {
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--ink-3);
}

.also-used span {
  color: var(--ink-2);
}

/* ---------- Education ---------- */
.edu-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.edu {
  padding: clamp(1.4rem, 3vw, 2rem);
  border-radius: var(--radius);
}

.edu h3 {
  margin-top: 0.9rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--ink);
}

.edu-degree {
  color: var(--ink-2);
}

.edu-highlight {
  display: inline-block;
  margin: 0.9rem 0 1rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
}

.edu .period {
  display: inline-block;
}

/* ---------- Contact ---------- */
.contact {
  padding: clamp(2rem, 6vw, 4rem);
  text-align: center;
  background:
    radial-gradient(600px circle at 50% -20%, rgba(246, 178, 107, 0.18), transparent 70%),
    var(--glass);
}

.contact .eyebrow {
  justify-content: center;
}

.contact .section-title {
  font-size: clamp(2.8rem, 7vw, 4.6rem);
}

.contact .section-lead {
  margin-inline: auto;
}

.email-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.email {
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  font-weight: 600;
  color: var(--ink);
  border-bottom: 1px solid var(--accent);
  word-break: break-all;
  transition: color 0.2s;
}

.email:hover {
  color: var(--accent);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.contact-time {
  margin-top: 1.75rem;
  font-size: 0.9rem;
  color: var(--ink-3);
}

.contact-time strong {
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

/* ---------- Footer & floating UI ---------- */
.footer {
  display: grid;
  gap: 0.4rem;
  padding: 2rem 0 6.5rem;
  border-top: 1px solid var(--line);
  text-align: center;
  font-size: 0.85rem;
  color: var(--ink-3);
}

.footer-quote em {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--sea);
}

.footer a {
  color: var(--ink-2);
}

.footer a:hover {
  color: var(--accent);
}

.to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 40;
  width: 48px;
  height: 48px;
  background: rgba(10, 15, 26, 0.74);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 88px;
  z-index: 60;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent-ink);
  background: var(--accent);
  box-shadow: var(--shadow);
  transform: translateX(-50%);
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.25s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s, transform 0.25s var(--ease);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: calc(var(--nav-h) + 48px);
    padding-bottom: 120px;
  }

  .hero-card {
    max-width: 520px;
  }

  .about-grid,
  .featured,
  .edu-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .skill-group,
  .skill-group:nth-child(n + 4) {
    grid-column: span 1;
  }

  .skill-group:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .strengths,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .job-head {
    flex-direction: column;
    gap: 0.6rem;
  }

  .timeline {
    padding-left: 1.4rem;
  }

  .timeline-dot {
    left: calc(-1.4rem + 1px);
  }

  .footnote {
    padding-left: 0;
  }

  .hero-cta .btn {
    flex: 1 1 auto;
  }

  .section-title br {
    display: none;
  }

  .to-top {
    right: 12px;
    bottom: 12px;
  }
}
</style>
