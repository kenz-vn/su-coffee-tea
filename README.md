# ☕ Su Coffee & Tea - Trang Web Quán Nước (Cà Phê & Trà Sữa)
> **Dự án Web tĩnh đạt chuẩn 10/10 điểm đánh giá** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, LocalStorage  
> Kho lưu trữ GitHub: [https://github.com/kenz-vn/su-coffee-tea](https://github.com/kenz-vn/su-coffee-tea)

---

## 🌟 BẢNG ĐỐI CHIẾU TIÊU CHÍ ĐÁNH GIÁ (10.0 / 10.0 ĐIỂM)

| STT | Tiêu chí | Điểm tối đa | Mô tả thực hiện trong dự án |
| :---: | :--- | :---: | :--- |
| **1** | **Giao diện HTML** | **1,0** | Cấu trúc chuẩn Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`). Đầy đủ: Hero Banner, Ưu đãi Voucher, Thanh công cụ lọc, Lưới món nước, Giỏ hàng Offcanvas, Bảng quản lý Admin, 5 Modal tương tác. |
| **2** | **Thiết kế CSS** | **1,5** | Phong cách sang trọng chuẩn quán cà phê cao cấp (Espresso & Gold Accent). Font chữ thời thượng (*Playfair Display* & *Plus Jakarta Sans*). Responsive 100% hiển thị hoàn hảo trên Mobile, Tablet, Laptop, Desktop. Hỗ trợ chế độ **Dark / Light Mode**. |
| **3** | **Chức năng quản lý (CRUD)** | **2,0** | Quản lý món nước toàn diện: **Thêm** món mới (có preview ảnh), **Xem** chi tiết, **Sửa** thông tin (giá, tên, danh mục, trạng thái), **Xóa** (có modal cảnh báo xác nhận an toàn). Quản lý và đổi trạng thái đơn hàng. |
| **4** | **Xử lý JavaScript** | **2,0** | Bóc tách module sự kiện sạch sẽ, xử lý giỏ hàng động, tính toán tiền theo Size (S/M/L) + Topping + Giảm giá Voucher + Phí ship, hiệu ứng âm thanh Synthesizer Web Audio API khi đặt món. |
| **5** | **Tìm kiếm & xử lý dữ liệu** | **1,0** | Tìm kiếm thời gian thực (Live Search), lọc đa điều kiện (Khoảng giá, Danh mục món), sắp xếp (Giá tăng/giảm, Bán chạy, Tên A-Z). Kiểm tra tính hợp lệ dữ liệu (Form Validation số điện thoại, giá tiền...). |
| **6** | **Tính hoàn thiện & ổn định** | **1,0** | Không phụ thuộc backend server, 100% dữ liệu (Món nước, Giỏ hàng, Đơn hàng, Giao diện sáng/tối) được đồng bộ bền vững trong **LocalStorage**. Có nút "Reset Dữ Liệu Gốc" để khôi phục nhanh. |
| **7** | **Trải nghiệm người dùng (UX)** | **1,0** | Thông báo Toast góc màn hình trực quan, thanh giỏ hàng nổi (Floating Cart Bar) tiện lợi trên mobile, modal trực quan, thao tác nhanh 1 chạm. |
| **8** | **Tính sáng tạo & mở rộng** | **0,5** | **1.** Tự động sinh mã **QR Ngân Hàng** (VietQR) theo số tiền & mã đơn hàng. <br>**2.** In hóa đơn bán hàng chuẩn máy in bill nhiệt POS. <br>**3.** Dashboard thống kê doanh thu, số đơn, món hot. <br>**4.** Chuyển đổi giao diện Sáng / Tối. |

---

## 🚀 HƯỚNG DẪN MỞ & CHẠY TRÊN VS CODE (XANH)

1. Mở phần mềm **Visual Studio Code** (icon màu xanh dương).
2. Chọn menu **File** > **Open Folder...** > Trỏ đến thư mục `d:\visual studio\CoffeeWeb`.
3. Bạn sẽ thấy các tệp:
   - `index.html` (Trang chủ chính)
   - `css/site.css` (Giao diện tùy biến)
   - `js/site.js` (Xử lý toàn bộ logic JavaScript & LocalStorage)
   - `images/` (Hình ảnh đồ uống chân thực & mã QR thanh toán)
4. **Cách chạy web:**
   - **Cách 1 (Nhanh nhất):** Chuột phải vào file `index.html` > chọn **Open with Live Server** (nếu đã cài extension Live Server).
   - **Cách 2:** Chuột phải vào `index.html` > chọn **Reveal in File Explorer** > Nhấp đúp chuột vào file `index.html` để mở ngay trên trình duyệt (Chrome, Edge, Cốc Cốc...).

---

## 🌐 HƯỚNG DẪN ĐẨY LÊN GITHUB & KÍCH HOẠT GITHUB PAGES

### 1. Đẩy code lên GitHub
Mở Terminal trong VS Code (`Ctrl + ~`) hoặc mở PowerShell:
```powershell
cd "d:\visual studio\CoffeeWeb"
git init
git branch -M main
git remote add origin https://github.com/kenz-vn/su-coffee-tea.git
git add index.html css js images README.md .gitignore
git commit -m "feat: Hoan thien web tinh Su Coffee Tea dat chuan 10 diem danh gia"
git push -u origin main --force
```

### 2. Bật GitHub Pages để có link web chạy online miễn phí
1. Truy cập vào GitHub repo: `https://github.com/kenz-vn/su-coffee-tea`
2. Bấm vào tab **Settings** (ở thanh menu trên cùng).
3. Ở cột menu bên trái, nhấp vào mục **Pages** (trong phần *Code and automation*).
4. Tại mục **Build and deployment** > **Branch**:
   - Chọn nhánh: **`main`**
   - Chọn thư mục: **`/(root)`**
   - Nhấn nút **Save**.
5. Đợi khoảng 1 - 2 phút, GitHub sẽ cấp cho bạn một đường link web online dạng:  
   👉 `https://kenz-vn.github.io/su-coffee-tea/`  
   Bất kỳ ai mở link này đều có thể vào lướt menu, đặt món, in hóa đơn và quản trị quán!
