<!-- directory: app/components/templates/HomeTemplate.vue -->
<script setup lang="ts">
import NavBar from '~/components/organisms/Navbar.vue'
import HeroSection from '@/components/organisms/HeroSection.vue'
import AboutSection from '@/components/organisms/AboutSection.vue'
import ProjectsSection from '@/components/organisms/ProjectsSection.vue'
import SkillsSection from '@/components/organisms/SkillsSection.vue'
import TimelineSection from '@/components/organisms/TimelineSection.vue'
import ContactSection from '@/components/organisms/ContactSection.vue'
</script>

<template>
  <!-- Sticky glass navbar -->
  <NavBar />

  <!-- Hero (top anchor) -->
  <div id="top">
    <HeroSection />
  </div>

  <!-- About -->
  <AboutSection id="about" />

  <!-- Projects -->
  <ProjectsSection id="projects" />

  <!-- Skills -->
  <SkillsSection id="skills" />

  <!-- Timeline -->
  <TimelineSection id="timeline" />

  <!-- Contact -->
  <ContactSection id="contact" />
</template>
