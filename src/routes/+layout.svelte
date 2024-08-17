<script>
  import '../app.css';
  import { Toaster } from '$lib/components/ui/sonner';
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
  <a href="/todo" aria-current={$page.url.pathname === '/todo'}>todo</a>
  <a href="/scorecard" aria-current={$page.url.pathname === '/scorecard'}>scorecard</a>
</nav>

<Toaster />

<div class="p-2"><slot></slot></div>

<style>
  nav {
    position: relative;
    display: flex;
    gap: 1em;
    padding: 1em;
    background: var(--bg-2);
    z-index: 2;
    margin: 0 0 1em 0;
    border-radius: var(--border-radius);
  }

  nav a {
    text-decoration: none;
  }

  nav a[aria-current='true'] {
    border-bottom: 2px solid;
  }
</style>
