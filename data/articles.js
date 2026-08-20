/*
  Nguồn dữ liệu Tin điều hành MXV, dùng chung cho:
  - Trang chủ (index.html): tự render danh sách ở #mxvList
  - Trang chi tiết (bai-viet.html?slug=...): tự render nội dung đầy đủ
  - Trang danh sách (danh-sach.html): tự render toàn bộ, sắp xếp mới nhất trước

  MUỐN THÊM BÀI MỚI: thêm 1 object vào mảng ARTICLES bên dưới rồi
  commit/push — không cần sửa index.html, bai-viet.html hay danh-sach.html.

  Các trường:
    slug       : định danh duy nhất, dùng trong URL bai-viet.html?slug=...
    type       : "mxv" (cố định)
    title      : tiêu đề
    date       : "dd/mm/yyyy"
    note       : ghi chú hiệu lực/áp dụng hiển thị dưới tiêu đề
    body       : nội dung đầy đủ (chuỗi HTML, có thể nhiều thẻ <p>)
    attachment : tùy chọn — { name, url } hiện khối "file đính kèm/nguồn
                 tham khảo" cuối bài, có nút "Xem" mở url trong tab mới.
                 Dùng để dẫn tới văn bản gốc/PDF khi không tiện đăng lại
                 toàn văn.
*/

window.ARTICLES = [
  {
    slug: "685-qd-tgd-mxv-ky-quy-bac-comex",
    type: "mxv",
    title: "685/QĐ/TGĐ-MXV: Điều chỉnh mức ký quỹ giao dịch mặt hàng Bạc (COMEX)",
    date: "19/08/2026",
    note: "Hiệu lực từ ngày 19/08/2026, thay thế Quyết định 666/QĐ/TGĐ-MXV ngày 10/08/2026",
    attachment: { name: "Toàn văn Quyết định 685/QĐ/TGĐ-MXV (PDF - MXV)", url: "https://mxv.com.vn/van-ban/f3053/685qd-vv-ban-hanh-muc-ky-quy-giao-dich-hang-hoa-tai-so-giao-dich-hang-hoa-viet-nam.pdf" },
    body: `
      <p>Căn cứ Quyết định số 685/QĐ/TGĐ-MXV của Sở Giao dịch Hàng hóa Việt Nam (MXV), thay thế Quyết định số 666/QĐ/TGĐ-MXV ngày 10/08/2026, MXV thông báo mức ký quỹ giao dịch mới áp dụng cho các mặt hàng Bạc trên Sở COMEX như sau:</p>
      <p><strong>1. Bảng mức ký quỹ áp dụng</strong></p>
      <ul>
        <li><b>Bạc</b> (mã SIE, COMEX, nhóm Kim loại) — mức ký quỹ ban đầu: 36.367 USD</li>
        <li><b>Bạc mini</b> (mã MQI, COMEX, nhóm Kim loại) — mức ký quỹ ban đầu: 18.212 USD</li>
        <li><b>Bạc micro</b> (mã SIL, COMEX, nhóm Kim loại) — mức ký quỹ ban đầu: 7.273 USD</li>
      </ul>
      <p><strong>2. Quy định ký quỹ tại MXV</strong></p>
      <ul>
        <li>Tỷ lệ ký quỹ: mức ký quỹ ban đầu và duy trì tại MXV bằng 120% mức ký quỹ ban đầu tại các Sở Giao dịch hàng hóa liên thông.</li>
        <li>Quy đổi ngoại tệ: theo tỷ giá quy đổi do MXV công bố theo từng thời điểm.</li>
        <li>Mức ký quỹ khách hàng: Thành viên kinh doanh có thể thiết lập mức ký quỹ ban đầu và duy trì cho khách hàng trực thuộc nhưng không thấp hơn mức quy định của MXV.</li>
      </ul>
      <p><strong>3. Thời gian hiệu lực:</strong> kể từ ngày 19/08/2026.</p>
      <p><strong>4. Khuyến nghị quản trị tài khoản:</strong> nhà đầu tư nên theo dõi tỷ lệ an toàn tài khoản và số dư ký quỹ trên phần mềm giao dịch CQG để chủ động thích ứng với mức ký quỹ mới; bổ sung ký quỹ kịp thời hoặc cân đối khối lượng hợp đồng đang nắm giữ nhằm phòng ngừa rủi ro Call Margin / Force Close khi thị trường biến động mạnh.</p>
      <p><em>Mọi thắc mắc và yêu cầu hỗ trợ chi tiết, Quý Khách hàng vui lòng liên hệ đội ngũ ATB Commodity.</em></p>
    `
  },
  {
    slug: "ap-dung-ty-gia-ngoai-te-22-07-2026",
    type: "mxv",
    title: "Thông báo áp dụng tỷ giá ngoại tệ kể từ ngày 22/07/2026",
    date: "22/07/2026",
    note: "Theo quyết định của Sở Giao dịch Hàng hóa Việt Nam (MXV)",
    body: `
      <p>Sở Giao dịch Hàng hóa Việt Nam (MXV) thông báo áp dụng tỷ giá ngoại tệ mới cho các giao dịch hàng hóa phái sinh, có hiệu lực từ các phiên giao dịch kể từ ngày 22/07/2026.</p>
      <p><em>Đây là bản tin dẫn nguồn theo quyết định của MXV. Bảng tỷ giá chi tiết theo từng loại ngoại tệ vui lòng liên hệ đội ngũ ATB Commodity để được cung cấp và cập nhật chính xác.</em></p>
    `
  },
  {
    slug: "646-qd-tgd-mxv-muc-ky-quy-giao-dich-hang-hoa",
    type: "mxv",
    title: "646/QĐ/TGĐ-MXV: Quyết định ban hành mức ký quỹ giao dịch hàng hóa tại Sở Giao dịch Hàng hóa Việt Nam",
    date: "24/07/2026",
    note: "Xem chi tiết mức ký quỹ theo từng hợp đồng tại văn bản gốc",
    attachment: { name: "Văn bản quyết định 646/QĐ/TGĐ-MXV (nguồn: hct.vn)", url: "https://hct.vn/tin-tuc-mxv/646-qd-tgd-mxv-quyet-dinh-ban-hanh-muc-ky-quy-giao-dich-hang-hoa-tai-so-giao-dich-hang-hoa-viet-nam-6743" },
    body: `
      <p>Sở Giao dịch Hàng hóa Việt Nam (MXV) ban hành quyết định số 646/QĐ/TGĐ-MXV quy định mức ký quỹ giao dịch hàng hóa áp dụng tại Sở.</p>
      <p><em>Đây là bản tin dẫn nguồn. Mức ký quỹ cụ thể theo từng hợp đồng, ngày hiệu lực và phạm vi áp dụng chi tiết vui lòng xem tại văn bản gốc ở khối đính kèm bên dưới, hoặc liên hệ đội ngũ ATB Commodity để được hỗ trợ tra cứu.</em></p>
    `
  },
  {
    slug: "dieu-chinh-ky-quy-kim-loai-nang-luong",
    type: "mxv",
    title: "Quyết định điều chỉnh mức ký quỹ giao dịch một số hợp đồng nhóm Kim loại và Năng lượng",
    date: "25/07/2026",
    note: "Hiệu lực từ phiên giao dịch ngày 28/07/2026",
    body: `
      <p>Sở Giao dịch Hàng hóa Việt Nam (MXV) thông báo quyết định điều chỉnh mức ký quỹ giao dịch áp dụng cho một số hợp đồng thuộc nhóm Kim loại và Năng lượng, có hiệu lực từ phiên giao dịch ngày 28/07/2026.</p>
      <p>Nhà đầu tư đang nắm giữ vị thế hoặc có kế hoạch giao dịch các hợp đồng thuộc 2 nhóm hàng này cần lưu ý cập nhật mức ký quỹ mới để đảm bảo tài khoản đáp ứng đủ điều kiện duy trì vị thế theo quy định.</p>
      <p><em>Đây là bản tóm tắt thông báo. Vui lòng tham khảo văn bản chính thức từ MXV hoặc liên hệ đội ngũ ATB Commodity để được cung cấp chi tiết mức ký quỹ áp dụng cho từng hợp đồng cụ thể.</em></p>
    `
  },
  {
    slug: "lich-nghi-giao-dich-thang-08-2026",
    type: "mxv",
    title: "Thông báo lịch nghỉ giao dịch của các Sở Giao dịch quốc tế liên thông tháng 08/2026",
    date: "23/07/2026",
    note: "Áp dụng cho CME Group, ICE US, ICE EU, TOCOM",
    body: `
      <p>Sở Giao dịch Hàng hóa Việt Nam (MXV) thông báo lịch nghỉ giao dịch của các Sở Giao dịch quốc tế liên thông trong tháng 08/2026, áp dụng cho các hợp đồng liên thông với CME Group, ICE US, ICE EU và TOCOM.</p>
      <p>Trong các ngày nghỉ giao dịch tương ứng, hoạt động đặt lệnh đối với những hợp đồng liên thông với các Sở nêu trên sẽ tạm ngưng theo lịch của từng Sở quốc tế.</p>
      <p><em>Nhà đầu tư nên chủ động sắp xếp kế hoạch giao dịch và tham khảo lịch chi tiết từng ngày nghỉ tại thông báo chính thức của MXV.</em></p>
    `
  },
  {
    slug: "gioi-han-vi-the-robusta-09-2026",
    type: "mxv",
    title: "Thông báo giới hạn vị thế đối với hợp đồng Cà phê Robusta kỳ hạn tháng 09/2026",
    date: "21/07/2026",
    note: "Áp dụng từ ngày thông báo đầu tiên",
    body: `
      <p>Sở Giao dịch Hàng hóa Việt Nam (MXV) thông báo áp dụng giới hạn vị thế đối với hợp đồng Cà phê Robusta kỳ hạn tháng 09/2026, có hiệu lực kể từ ngày thông báo đầu tiên.</p>
      <p>Quy định giới hạn vị thế nhằm đảm bảo tính ổn định của thị trường và quản trị rủi ro chung, đặc biệt trong giai đoạn hợp đồng tiến gần đến kỳ đáo hạn.</p>
      <p><em>Nhà đầu tư đang giao dịch hợp đồng Cà phê Robusta kỳ hạn nêu trên cần rà soát vị thế hiện tại để đảm bảo tuân thủ đúng giới hạn theo thông báo chính thức từ MXV.</em></p>
    `
  }
];
