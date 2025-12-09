/* style.css - Colle ce fichier à la racine (style.css) */

:root{
  --bg: #f6f7fb;
  --card: #ffffff;
  --accent: #2b6ef6; /* bleu principal */
  --accent-2: #ffd24a; /* jaune accent (pour maillot) */
  --muted: #6b7280;
  --radius: 12px;
  --shadow: 0 8px 24px rgba(16,24,40,0.06);
  --max-width: 1100px;
  --glass: rgba(255,255,255,0.6);
}

*{box-sizing: border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(180deg, #f8fafc 0%, var(--bg) 100%);
  color:#111827;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  line-height:1.5;
}

/* Container */
.container{
  width:90%;
  max-width:var(--max-width);
  margin:0 auto;
  padding:28px 0;
}

/* Header */
.site-header{
  background: white;
  border-bottom:1px solid rgba(15,23,42,0.04);
  position:sticky;
  top:0;
  z-index:50;
}
.header-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
}

/* Brand */
.brand{
  display:inline-block;
  font-weight:700;
  color:var(--accent);
  text-decoration:none;
  font-size:1.05rem;
}

/* Nav */
.main-nav ul{
  list-style:none;
  display:flex;
  gap:8px;
  margin:0;
  padding:0;
}
.main-nav a{
  display:inline-block;
  padding:10px 12px;
  color:var(--muted);
  text-decoration:none;
  border-radius:8px;
  transition:all .18s ease;
}
.main-nav a:hover, .main-nav a.active{
  background: linear-gradient(90deg, rgba(43,110,246,0.08), rgba(255,210,74,0.06));
  color:var(--accent);
  transform:translateY(-2px);
}

/* Mobile nav toggle */
.nav-toggle{
  display:none;
  border:0;
  background:transparent;
  padding:8px;
  cursor:pointer;
}
.hamburger{
  width:22px;
  height:2px;
  background:#111827;
  position:relative;
  display:block;
}
.hamburger::before, .hamburger::after{
  content:"";
  position:absolute;
  left:0;
  width:22px;
  height:2px;
  background:#111827;
  transition:transform .18s;
}
.hamburger::before{top:-7px}
.hamburger::after{top:7px}

/* Pages */
.pages{min-height:calc(100vh - 120px)}
.page{display:none; padding:40px 0}
.page.active{display:block; animation:fadeUp .36s ease both}

/* Hero */
.hero{
  display:flex;
  gap:28px;
  align-items:center;
  padding:40px 0;
}
.profile-figure{margin:0}
.profile-photo{
  width:200px;
  height:auto;
  border-radius:14px;
  object-fit:cover;
  box-shadow:var(--shadow);
  border:3px solid rgba(255,255,255,0.9);
  display:block;
}
.hero-text h1{
  margin:0 0 8px;
  font-size:1.9rem;
  color: #0f172a;
}
.hero-text p{margin:0 0 18px;color:var(--muted)}
.hero-ctas{display:flex;gap:12px}

/* Buttons */
.btn{
  display:inline-block;
  text-decoration:none;
  padding:10px 14px;
  border-radius:10px;
  cursor:pointer;
  border:0;
  font-weight:600;
}
.btn.primary{
  background:var(--accent);
  color:white;
  box-shadow:0 8px 20px rgba(43,110,246,0.12);
}
.btn.ghost{
  background:transparent;
  border:1px solid rgba(15,23,42,0.06);
  color:var(--accent);
}

/* Page inner layout */
.page-inner{padding:18px 0}
.back-home{
  background:transparent;
  border:0;
  color:var(--muted);
  margin-bottom:18px;
  cursor:pointer;
}

/* Cards */
.card{
  background:var(--card);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  padding:18px;
  margin-bottom:18px;
  border:1px solid rgba(15,23,42,0.03);
}
.form-card input, .form-card textarea{
  width:100%;
  padding:10px 12px;
  border-radius:10px;
  border:1px solid rgba(15,23,42,0.06);
  margin-top:8px;
  margin-bottom:12px;
  font-size:0.95rem;
}

/* Grids */
.grid-2{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:16px;
}
.grid-3{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:16px;
}

/* Footer */
.site-footer{padding:22px 0;color:var(--muted);text-align:center}

/* Responsive */
@media (max-width:900px){
  .grid-2{grid-template-columns:1fr}
  .grid-3{grid-template-columns:1fr}
  .hero{flex-direction:column; text-align:center}
  .hero-text{max-width:700px}
}

/* Small screens: mobile nav */
@media (max-width:780px){
  .main-nav{
    position:fixed;
    inset:60px 16px auto 16px;
    right:16px;
    left:16px;
    background:var(--card);
    border-radius:12px;
    padding:12px;
    box-shadow:0 16px 40px rgba(2,6,23,0.12);
    transform:scaleY(0);
    transform-origin:top center;
    transition:transform .2s ease;
    z-index:60;
  }
  .main-nav.show{transform:scaleY(1)}
  .main-nav ul{flex-direction:column; gap:6px}
  .nav-toggle{display:block}
}

/* Small animations */
@keyframes fadeUp{
  from{opacity:0; transform:translateY(10px)}
  to{opacity:1; transform:translateY(0)}
}

/* Utilities */
.text-center{text-align:center}
.muted{color:var(--muted)}
