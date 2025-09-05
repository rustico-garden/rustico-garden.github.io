// ===== Tema com persistência =====
const themeToggle = document.getElementById('theme-toggle');
const userPref = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light', userPref === 'light');
themeToggle.textContent = userPref === 'light' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
});

// ===== Ano no rodapé =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Filtros da galeria =====
const chips = document.querySelectorAll('.chip');
const items = document.querySelectorAll('.gallery .photo');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    items.forEach(it => {
      const cat = it.dataset.cat;
      if (filter === 'all' || cat.includes(filter)){
        it.style.display = '';
      } else {
        it.style.display = 'none';
      }
    });
  });
});

// ===== Lightbox simples =====
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-caption');
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    const caption = img.closest('figure').querySelector('h3')?.textContent || img.alt;
    lbCap.textContent = caption;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
  });
});
lb.querySelector('.close').addEventListener('click', () => {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
});
lb.addEventListener('click', (e) => {
  if (e.target === lb) {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  }
});

// ===== Envio do formulário via mailto =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const assunto = encodeURIComponent(form.assunto.value.trim());
  const mensagem = encodeURIComponent(form.mensagem.value.trim() + `\n\n— Enviado pelo site`);
  const mailto = `mailto:seuemail@gmail.com?subject=${assunto}&body=De:%20${encodeURIComponent(email)}%0D%0A%0D%0A${mensagem}`;
  window.location.href = mailto;
});
