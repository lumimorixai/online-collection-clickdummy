/* Presentation-only sign-in. This does not protect public GitHub Pages assets. */
(() => {
  const sessionKey = 'oc-demo-session-v1';
  let signedIn = false;
  try { signedIn = sessionStorage.getItem(sessionKey) === 'active'; } catch {}
  const copy = (de, en, easy) => {
    const language = new URLSearchParams(location.search).get('lang');
    return language === 'en' ? en : language === 'easy' ? (easy || de) : de;
  };
  const eye = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
  window.OC_AUTH = {
    isSignedIn: () => signedIn,
    show() {
      document.body.classList.add('login-visible');
      document.documentElement.lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'de';
      document.getElementById('header').hidden = true;
      document.getElementById('footer').hidden = true;
      document.title = copy('Anmelden', 'Sign in') + ' · Online Collection';
      document.getElementById('main').innerHTML = `
        <div class="login-shell">
          <section class="login-art" aria-label="${copy('Einblicke in die Sammlung', 'Glimpses of the collection')}">
            <div class="login-brand"><span class="brandmark" aria-hidden="true">LM</span><span>LÜBECKER<br>MUSEEN<small>ONLINE COLLECTION</small></span></div>
            <div class="login-artwork"><img class="login-main-image" src="assets/object-11.jpg" alt="${copy('Edvard Munch: Die Söhne des Dr. Max Linde, 1903', 'Edvard Munch: Dr. Max Linde’s sons, 1903')}"><div class="login-art-caption"><span>EDVARD MUNCH · 1903</span><strong>${copy('Die Söhne des Dr. Max Linde', 'Dr. Max Linde’s sons')}</strong></div><img class="login-inset" src="assets/object-12.jpg" alt="${copy('Carl Gustav Carus: Das Atelierfenster', 'Carl Gustav Carus: The studio window')}"></div>
            <div class="login-art-copy"><p class="eyebrow">${copy('KUNST. GESCHICHTE. NEUE PERSPEKTIVEN.', 'ART. HISTORY. NEW PERSPECTIVES.')}</p><h1>${copy('Ein neuer Blick.<br>Auf das, was uns verbindet.', 'A fresh perspective.<br>On what connects us.', 'Bilder entdecken.<br>Geschichten kennenlernen.')}</h1><p>${copy('20 Objekte. Acht Geschichten. Unzählige Entdeckungen.', '20 objects. Eight stories. Countless discoveries.', 'Hier findest du 20 Objekte und acht Geschichten.')}</p></div>
            <span class="login-credit">${copy('Bildquellen: Wikimedia Commons · Public Domain', 'Images: Wikimedia Commons · Public Domain')}</span>
          </section>
          <section class="login-panel">
            <div class="login-panel-top"><span class="login-demo-label">${copy('PRÄSENTATIONSZUGANG', 'PRESENTATION ACCESS')}</span><select id="login-language" aria-label="${copy('Sprache wählen', 'Choose language')}"><option value="de">Deutsch</option><option value="en">English</option><option value="easy">Leichte Sprache</option></select></div>
            <div class="login-form-wrap"><div class="login-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="7" y="14" width="18" height="14" rx="3"/><path d="M11 14V9a5 5 0 0 1 10 0v5M16 20v3"/></svg></div><p class="eyebrow">ONLINE COLLECTION</p><h2>${copy('Schön, dass Sie da sind.', 'Welcome to the collection.', 'Willkommen!')}</h2><p class="login-intro">${copy('Melden Sie sich an und entdecken Sie die Sammlungen der Lübecker Museen.', 'Sign in to explore the collections of Lübeck’s museums.', 'Melde dich an. Dann kannst du die Bilder ansehen.')}</p>
              <form id="demo-login" autocomplete="off"><label for="login-user">${copy('Benutzername', 'Username')}</label><input id="login-user" name="username" autocomplete="off" autocapitalize="none" spellcheck="false" required placeholder="${copy('Ihr Benutzername', 'Your username')}"><div class="login-password-label"><label for="login-password">${copy('Passwort', 'Password')}</label><button type="button" data-auth="help">${copy('Zugangsdaten?', 'Access details?')}</button></div><div class="login-password"><input id="login-password" name="password" type="password" autocomplete="off" required placeholder="${copy('Ihr Passwort', 'Your password')}"><button type="button" data-auth="reveal" aria-label="${copy('Passwort anzeigen', 'Show password')}" aria-pressed="false">${eye}</button></div><p id="login-error" class="login-error" role="alert" hidden></p><button class="login-submit" type="submit">${copy('Sammlung betreten', 'Enter the collection', 'Anmelden')}</button></form>
              <div id="login-help" hidden><span>${copy('Benutzer', 'User')}: <code>gast</code></span><span>${copy('Passwort', 'Password')}: <code>sammlung2026</code></span></div>
            </div><div class="login-panel-bottom"><span>${copy('Lübecker Museen · Gestaltungsvorschlag', 'Lübeck Museums · Design proposal')}</span><span>${copy('Keine Registrierung erforderlich', 'No registration required')}</span></div>
          </section>
        </div>`;
      document.getElementById('login-language').value = new URLSearchParams(location.search).get('lang') || 'de';
    },
    enter() {
      document.body.classList.remove('login-visible');
      document.getElementById('header').hidden = false;
      document.getElementById('footer').hidden = false;
    },
    logout() {
      signedIn = false;
      try { sessionStorage.removeItem(sessionKey); } catch {}
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      document.getElementById('modal').close();
      window.render();
      window.scrollTo(0, 0);
      document.getElementById('login-user').focus();
    }
  };
  document.addEventListener('submit', e => {
    if (e.target.id !== 'demo-login') return;
    e.preventDefault();
    const name = document.getElementById('login-user');
    const password = document.getElementById('login-password');
    const error = document.getElementById('login-error');
    if (name.value.trim().toLowerCase() !== 'gast' || password.value !== 'sammlung2026') {
      error.hidden = false;
      error.textContent = copy('Die Zugangsdaten stimmen nicht. Nutzen Sie den Demozugang „gast“ mit dem Passwort „sammlung2026“.', 'Those credentials do not match. Use “gast” and the password “sammlung2026”.');
      name.setAttribute('aria-invalid', 'true'); password.setAttribute('aria-invalid', 'true');
      name.setAttribute('aria-describedby', 'login-error'); password.setAttribute('aria-describedby', 'login-error');
      password.focus(); return;
    }
    signedIn = true;
    try { sessionStorage.setItem(sessionKey, 'active'); } catch {}
    password.value = '';
    window.render(); window.scrollTo(0, 0); document.getElementById('main').focus();
  });
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-auth]');
    if (!button) return;
    if (button.dataset.auth === 'logout') { window.OC_AUTH.logout(); return; }
    const password = document.getElementById('login-password');
    if (button.dataset.auth === 'help') document.getElementById('login-help').hidden = !document.getElementById('login-help').hidden;
    if (button.dataset.auth === 'reveal') {
      const reveal = password.type === 'password'; password.type = reveal ? 'text' : 'password';
      button.setAttribute('aria-pressed', String(reveal));
      button.setAttribute('aria-label', reveal ? copy('Passwort verbergen','Hide password') : copy('Passwort anzeigen','Show password'));
    }
  });
  document.addEventListener('change', e => {
    if (e.target.id !== 'login-language') return;
    const p = new URLSearchParams(location.search); p.set('lang', e.target.value);
    history.replaceState({}, '', '?' + p.toString());
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
})();
