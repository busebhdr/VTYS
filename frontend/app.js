let token = localStorage.getItem("token");
let expiresAt = localStorage.getItem("expires_at");

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: username,
        password: password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("login-error-message").innerText = data.detail || "Login failed.";
      return;
    }

    token = data.access_token;
    expiresAt = data.expires_at;
    localStorage.setItem("token", token);
    localStorage.setItem("expires_at", expiresAt);
    window.location = "index.html";

  } catch (err) {
    document.getElementById("login-error-message").innerText = "Login error.";
  }
}

async function register(event) {
  event.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  try {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: username,
        password: password
      })
    });

    if (!res.ok) {
      const data = await res.json();
      document.getElementById("signup-error-message").innerText = data.detail || "Registration failed.";
      return;
    }

    alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    toggleForms();

  } catch (err) {
    document.getElementById("signup-error-message").innerText = "Registration error.";
  }
}

async function addTodo() {
  const title = document.getElementById("new-todo").value;
  const res = await fetch("http://localhost:8000/todos?title=" + title, {
    method: "POST",
    headers: { Authorization: "Bearer " + token }
  });

  if (!res.ok) {
    alert("Görev eklenemedi. Giriş süresi dolmuş olabilir.");
    logout();
    return;
  }

  window.location.reload();
}

async function loadTodos() {
  const res = await fetch("http://localhost:8000/todos", {
    headers: { Authorization: "Bearer " + token }
  });

  if (!res.ok) {
    console.warn("Yetkisiz! Token geçersiz ya da süresi dolmuş.");
    logout();
    return;
  }

  const todos = await res.json();

  if (!Array.isArray(todos)) {
    console.error("Beklenmeyen veri yapısı:", todos);
    logout();
    return;
  }

  const ul = document.getElementById("todo-list");
  if (ul) {
    ul.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      ul.appendChild(li);
    });
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expires_at");
  window.location = "login.html";
}

function startCountdown() {
  const expiresAt = localStorage.getItem("expires_at");
  const countdownEl = document.getElementById("countdown");

  if (!expiresAt || !countdownEl) {
    console.warn("Sayaç başlatılamadı: expiresAt veya countdown elementi yok.");
    return;
  }

  const expireTime = new Date(expiresAt).getTime();
  if (isNaN(expireTime)) {
    console.warn("Sayaç başlatılamadı: geçersiz tarih formatı:", expiresAt);
    return;
  }

  let timer;  // ✅ önce timer değişkenini tanımla!

  function update() {
    const now = new Date().getTime();
    const diff = expireTime - now;

    if (diff <= 0) {
      countdownEl.textContent = "Token süresi doldu. Çıkış yapılıyor...";
      clearInterval(timer);  // ✅ şimdi timer'a erişebiliriz
      setTimeout(() => {
        logout();
      }, 2000);
      return;
    }

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    countdownEl.textContent = `Token süresi: ${minutes}dk ${seconds}sn`;
  }

  timer = setInterval(update, 1000);  // ✅ Timer'ı çalıştır
  update();                           // ✅ İlk güncellemeyi başlat
}


if (window.location.pathname.includes("index.html")) {
  loadTodos();
  startCountdown();
  console.log("startCountdown() çalıştı!");
}

