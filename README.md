# project1-demo-jhipster
## Sinh viên thực hiện: Vũ Văn Hùng
## Giảng viên hướng dẫn: ThS.Nguyễn Đức Tiến

### Jhipster là gì?
JHipster là một công cụ dùng để tạo nhanh các ứng dụng web và mobile bằng cách kết hợp các công nghệ như Spring Boot, Angular, React...

### Cài đặt Jhipster
1. Cài đặt JDK version 20
    [Download JDK version 20](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html)

   Thêm biến môi trường JAVA_HOME
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/01a431f5-387f-40a5-a008-3393e1c21b16)
2. Cài đặt Nodejs version 20.10.0
   [Download Nodejs version 20.10.0](https://nodejs.org/en/blog/release/v20.10.0)
3. Cài đặt Git
   [Download Git](https://git-scm.com/downloads)
4. Cài đặt generator-jhipster
   `npm install -g generator-jhipster`
### Demo Tạo project bằng Jhipster sử dụng PostgreSql
1. Tạo project demo_jhipster
   ```
   mkdir demo_jhipster
   cd demo_jhipster
   jhipster
   ```
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/30bcbcc1-4643-433f-af00-2a3156d11610)

2. Tạo các entity

    Định nghĩa tập thực thể trong [JDL Studio](https://start.jhipster.tech/jdl-studio/)
   
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/e3b75c2c-29ab-4323-a8fd-4bbb85237a9f)
   
   Tải về và copy vào source code

    Chạy lệnh `jhipster jdl jhipster-jdl.jdl` (jhipster-jdl.jdl là file vừa tải)
   
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/9044ef76-4fea-4bf4-ac2d-8118ed64f4ca)
   
   Có conflict, nhấn **a** và **Enter** để ghi đè tất cả file conflict
   
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/3c7165fa-8585-4057-82da-fbd6f4a63b11)
   
4. Tạo Database và connect source code với Database
   [Tải PostgreSql](https://www.enterprisedb.com/downloads/postgres-postgresq4. Khởi chạy Project
   
   Chạy lệnh `mvnw` để khởi động
   
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/12923150-c177-49ef-b582-470c6f146a6a)
   
   Thành công sẽ Hiện dòng text sau
   
   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/5fb36b0b-b7ec-419b-a8ca-a96ff4b76389)

   Chạy `npm start` để khởi động FrontEnd

   Hình minh họa web đã tạo:

   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/26f3b9d0-105b-43ee-989f-68aad9c7fe57)

   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/a05777d6-d68d-4ec4-a449-dc9f8fe88132)

   ![image](https://github.com/vhung11/project1-demo-jhipster/assets/132033226/94ff4817-b08d-4771-b044-0a137103a783)


#### Một số ưu - nhược điểm của JHipster:

Ưu điểm:

- Tạo dự án nhanh chóng, tiết kiệm thời gian phát triển.

- Cung cấp mẫu project mẫu hóa với nhiều tính năng cơ bản đã được tích hợp sẵn.

- Hỗ trợ nhiều ngôn ngữ lập trình phổ biến và công nghệ hiện đại.

- Có community hỗ trợ lớn với nhiều tài liệu hướng dẫn.

- Theo dõi tiến độ dự án và quản lý code tốt với các thiết lập mặc định.

- Dễ sử dụng cho cả người mới và kinh nghiệm.

Nhược điểm:

- Tính linh hoạt có thể bị hạn chế do sử dụng mẫu định sẵn.

- Phụ thuộc vào community nên không phải lúc nào cũng có hỗ trợ kịp thời.

- Có thể phát sinh bug khi sử dụng các tính năng mới chưa ổn định.

- Không phù hợp với các dự án quy mô lớn yêu cầu tùy chỉnh nhiều.

- Chi phí bản quyền cao nếu sử dụng các tính năng premium.

Nên cân nhắc kỹ yêu cầu dự án trước khi sử dụng JHipster.



