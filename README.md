
# 🛒 VTYS Dersi – Giriş Sistemi Web Uygulaması

Bu proje, VTYS (Veritabanı Yönetim Sistemleri) dersi kapsamında iki geliştirici tarafından hazırlanmış basit bir giriş/kayıt sistemi uygulamasıdır. Projede hem frontend hem de backend bileşenleri Flask ve HTML/CSS/JS ile geliştirilmiş, kullanıcı yönetimi odaklı bir yapı oluşturulmuştur. Projede görev dağılımı aşağıdaki gibidir.

---

## 👥 Görev Dağılımı

### 👩‍💻 Geliştirici 1 – Buse  (Veritabanı ve Oturum Yönetimi)

- `models.py`: Kullanıcı modeli
- `database.py`: Veritabanı bağlantısı ve yapılandırma
- `app.js`: Frontend tarafında oturum kontrolü ve işlemler
- `logIn.css`: Giriş sayfası stil dosyası

✅ **Yapılanlar:**
- SQLite veritabanı ile kullanıcı modeli oluşturuldu.
- Kullanıcı verileri ile etkileşimli işlemler yapıldı.
- Giriş ekranı görsel olarak hazırlandı ve işlevsel hale getirildi.

---

### 👩‍💻 Geliştirici 2 – Nursena  (Giriş & Kayıt Akışı)

- `main.py`: Uygulamanın ana Flask sunucusu
- `auth.py`: Giriş ve kayıt işlemleri için backend route’ları
- `login.html`: Kullanıcı arayüzü (formlar)
- `index.html`: Ana sayfa arayüzü

✅ **Yapılanlar:**
- Flask ile kullanıcı kayıt ve giriş route’ları yazıldı.
- HTML ile arayüz tasarımları yapıldı.
- Başarılı girişlerde yönlendirme ve oturum yönetimi sağlandı.

---

## ⚙️ Kullanılan Teknolojiler

- ✅ Python 3 & Flask
- ✅ HTML5, CSS3, JavaScript
- ✅ SQLite (Flask-SQLAlchemy)
- ✅ JWT (isteğe bağlı güvenlik katmanı)

---

## 🚀 Projeyi Çalıştırmak İçin

1. Terminalden `VTYS/backend/` klasörüne gidin.
2. Gerekli paketleri yükleyin:
   ```bash
   pip install flask flask_sqlalchemy
3. python main.py dosyasını çalıştırın
4. Tarayıcınızdan http://localhost:5000 adresine giderek uygulamayı test edin.
