# TERROIR DIRECT — Hướng dẫn cài đặt môi trường trên Windows

---

## Tổng quan phần mềm cần cài

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                                                                 │
│  Node.js 18+          → chạy JavaScript ngoài trình duyệt      │
│  npm                  → cài thư viện JS (đi kèm Node.js)       │
│  VSCode               → code editor                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                         BACKEND                                 │
│                                                                 │
│  JDK 21               → chạy Java                              │
│  Gradle               → build tool (đi kèm trong project)      │
│  IntelliJ IDEA / VSCode → code editor cho Java                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       INFRASTRUCTURE                            │
│                                                                 │
│  Docker Desktop       → chạy PostgreSQL, Redis, MinIO, ES      │
│  Git                  → quản lý source code                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       TRÌNH DUYỆT                               │
│                                                                 │
│  Chrome / Edge / Firefox (bản mới)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. JDK 21
### Tải
Tải file `.msi` cho Windows x64.
Chạy file `.msi`, nhấn Next cho tới khi xong.
### Cấu hình biến môi trường
1. Nhấn `Win + R`, gõ `sysdm.cpl`, nhấn Enter
2. Tab **Advanced** → nút **Environment Variables**
3. Ở mục **System variables**:
   - Nhấn **New**:
     ```
     Variable name:  JAVA_HOME
     Variable value: C:\Program Files\Java\jdk-21
     ```
     (Đường dẫn thực tế phụ thuộc vào nơi bạn cài, kiểm tra thư mục `C:\Program Files\Java\`)
   - Tìm biến **Path** trong danh sách, nhấn **Edit**, nhấn **New**, thêm:
     ```
     %JAVA_HOME%\bin
     ```
4. Nhấn OK tất cả.
### Kiểm tra
Mở PowerShell mới:

```
java -version
javac -version
```
Kết quả mong đợi:

```
java version "21.0.2" 2024-01-16 LTS
javac 21.0.2
```
---
## 4. Docker Desktop
### Yêu cầu hệ thống
- Windows 10/11 bản 64-bit
- Bật Virtualization trong BIOS (thường đã bật sẵn)
- Bật WSL 2
### Bật WSL 2
Mở PowerShell với quyền **Administrator** (chuột phải → Run as Administrator):

```powershell
wsl --install
```
Khởi động lại máy sau lệnh này.
Sau khi khởi động lại, mở PowerShell kiểm tra:

```
wsl --version
```

### Tải Docker Desktop

```
https://www.docker.com/products/docker-desktop/
```
Tải file `.exe` cho Windows.
Chạy file `.exe`. Đánh dấu ô **"Use WSL 2 instead of Hyper-V"**. Nhấn OK và chờ cài xong. Khởi động lại máy nếu được yêu cầu.
### Khởi động
Sau khi cài, Docker Desktop tự chạy (biểu tượng cá voi ở thanh taskbar). 
Chờ cho đến khi trạng thái hiện "Docker Desktop is running".
### Kiểm tra
Mở PowerShell:

```
docker --version
docker compose version
```
Kết quả mong đợi:

```
Docker version 25.0.3, build ...
Docker Compose version v2.24.5
```

---

## 6. IntelliJ IDEA (tùy chọn, thay VSCode cho backend)
Chọn **Community Edition** (miễn phí) hoặc **Ultimate** (có Micronaut support tốt hơn).
Chạy file `.exe`, nhấn Next. Đánh dấu ô "Add launchers dir to the PATH" và ".java" association.

---
## 7. Kiểm tra tổng — Mở PowerShell chạy lần lượt

```powershell
java -version
docker --version
docker compose version
code --version
```
Kết quả mong đợi (phiên bản cụ thể có thể khác):

```
java version "21.0.2" 2024-01-16 LTS
Docker version 25.0.3
Docker Compose version v2.24.5
1.86.2
```
Nếu tất cả 7 lệnh đều ra kết quả → môi trường đã sẵn sàng.

---
## 8. Chạy project đầy đủ (frontend + backend)
### Terminal 1 — Chạy infrastructure

```powershell
cd terroir-direct-api
docker compose up -d
```
Chờ Docker tải image và khởi động (lần đầu mất 3-10 phút). Kiểm tra:

```powershell
docker ps
```
Phải thấy 4 container đang chạy:

```
CONTAINER     IMAGE                    PORTS
postgres      postgres:16              0.0.0.0:5432->5432/tcp
redis         redis:7-alpine           0.0.0.0:6379->6379/tcp
minio         minio/minio              0.0.0.0:9000->9000/tcp, 9001->9001/tcp
elasticsearch elasticsearch:8.12.0     0.0.0.0:9200->9200/tcp
```
### Terminal 2 — Chạy backend

```powershell
cd terroir-direct-api
.\gradlew.bat run
```
Lần đầu Gradle tải dependencies (mất 3-5 phút). 
Sau đó mỗi lần chạy mất vài giây.
Khi thấy dòng sau → backend đã sẵn sàng:

```
Startup completed in xxxms. Server Running: http://localhost:8080
```
### Terminal 3 — Chạy frontend

```powershell
cd terroir-direct
npm install
npm run dev
```
Khi thấy:

```
VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```
---

## 9. Chạy chỉ frontend (không cần backend)
Nếu chưa có backend, frontend có sẵn mock data. Chỉ cần:

```powershell
cd terroir-direct
npm install
npm run dev
```
Mở `http://localhost:3000`. Không cần Docker, không cần Java, không cần database.

---
## 11. Tóm tắt port sử dụng

```
Port 3000   → Frontend Vue (npm run dev)
Port 8080   → Backend Micronaut (gradlew run)
Port 5432   → PostgreSQL (Docker)
Port 6379   → Redis (Docker)
Port 9000   → MinIO API (Docker)
Port 9001   → MinIO Console (Docker)
Port 9200   → Elasticsearch (Docker)
```
---

## 12. Tóm tắt dung lượng ổ đĩa

```
Git                     ~50 MB
Node.js + npm          ~100 MB
JDK 21                 ~300 MB
Docker Desktop           ~3 GB
VSCode                 ~300 MB
IntelliJ IDEA (CE)       ~1 GB (tùy chọn)
Docker images (4 cái)    ~3 GB (tải lần đầu)
node_modules           ~300 MB
Gradle cache           ~500 MB
─────────────────────────────
Tổng ước tính          ~8-9 GB
```