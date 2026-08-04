/*
  Nguồn dữ liệu tin tức / thông báo MXV dùng chung cho:
  - Trang chủ (index.html): tự render thẻ tin ở #newsGrid và #mxvList
  - Trang chi tiết (bai-viet.html?slug=...): tự render nội dung đầy đủ

  MUỐN THÊM BÀI MỚI: thêm 1 object vào mảng ARTICLES bên dưới rồi
  commit/push — không cần sửa index.html hay bai-viet.html.

  Các trường dùng chung:
    slug      : định danh duy nhất, dùng trong URL bai-viet.html?slug=...
    type      : "news" (Tin tức 24/7) | "mxv" (Tin điều hành MXV)
    title     : tiêu đề
    date      : "dd/mm/yyyy"
    body      : nội dung đầy đủ (chuỗi HTML, có thể nhiều thẻ <p>)

  Riêng "news":
    category  : nhãn nhóm hàng hiển thị trên tag, VD "Kim loại"
    tagClass  : class màu cho tag ("", "red", "amber", "green")
    excerpt   : đoạn tóm tắt ngắn (chỉ hiển thị ở thẻ tin nổi bật)
    meta2     : mục phụ hiển thị cạnh ngày (VD "Bản tin sáng")
    thumb     : emoji hiển thị ở thẻ tin nổi bật
    feature   : true nếu là tin nổi bật (thẻ lớn bên trái) — chỉ 1 tin nên đặt true

  Riêng "mxv":
    note      : ghi chú hiệu lực/áp dụng hiển thị dưới tiêu đề

  Tùy chọn (news hoặc mxv):
    attachment: { name, url } — hiện 1 khối "file đính kèm/nguồn tham
    khảo" cuối bài, có nút "Xem" mở url trong tab mới. Dùng để dẫn tới
    văn bản gốc/PDF khi không tiện đăng lại toàn văn.
*/

window.ARTICLES = [
  // ===== TIN TỨC 24/7 =====
  {
    slug: "bac-vuot-moc-60-usd",
    type: "news",
    category: "Kim loại",
    tagClass: "",
    feature: true,
    thumb: "🥇",
    title: "Bạc vượt mốc 60 USD/oz: dòng tiền trú ẩn quay lại kim loại quý trước kỳ họp Fed",
    excerpt: "Giá bạc trên bảng MXV tiếp tục neo trên vùng 60, trong khi vàng thế giới giằng co quanh đỉnh. Nhà đầu tư chờ tín hiệu lãi suất từ Fed trong tuần này…",
    date: "26/07/2026",
    meta2: "Bản tin sáng",
    body: `
      <p>Giá bạc giao dịch liên thông trên bảng MXV tiếp tục duy trì trên vùng 60 USD/oz trong phiên sáng nay, phản ánh dòng tiền trú ẩn quay trở lại nhóm kim loại quý. Trong khi đó, giá vàng thế giới giằng co quanh vùng đỉnh gần nhất khi giới đầu tư thận trọng chờ đợi các tín hiệu mới về lộ trình lãi suất.</p>
      <p>Diễn biến này diễn ra ngay trước thềm kỳ họp chính sách tiền tệ của Cục Dự trữ Liên bang Mỹ (Fed) — sự kiện được thị trường hàng hóa theo dõi sát sao vì tác động trực tiếp đến chi phí cơ hội của việc nắm giữ kim loại quý không sinh lãi suất.</p>
      <p>Ở nhóm kim loại cơ bản, đồng chịu áp lực nhẹ trước các số liệu sản xuất công nghiệp mới công bố từ Trung Quốc — nền kinh tế tiêu thụ kim loại lớn nhất thế giới.</p>
    `
  },
  {
    slug: "dau-wti-hoi-phuc-ton-kho",
    type: "news",
    category: "Năng lượng",
    tagClass: "red",
    title: "Dầu WTI hồi phục nhờ tồn kho Mỹ giảm mạnh hơn dự báo",
    excerpt: "Giá dầu WTI hồi phục sau báo cáo tồn kho dầu thô thương mại của Mỹ giảm mạnh hơn dự báo, hỗ trợ tâm lý thị trường năng lượng.",
    date: "26/07/2026",
    body: `
      <p>Giá dầu WTI ghi nhận nhịp hồi phục trong phiên gần nhất sau khi báo cáo tồn kho dầu thô thương mại của Mỹ cho thấy mức giảm mạnh hơn so với dự báo chung của giới phân tích, qua đó hỗ trợ tâm lý thị trường năng lượng.</p>
      <p>Số liệu tồn kho là một trong những chỉ báo cung - cầu ngắn hạn được nhà đầu tư theo dõi sát mỗi tuần, đặc biệt trong giai đoạn thị trường dầu thô còn nhiều biến số từ phía nguồn cung lẫn nhu cầu tiêu thụ toàn cầu.</p>
      <p>Diễn biến giá dầu trong các phiên tới nhiều khả năng tiếp tục bám sát các số liệu tồn kho định kỳ cũng như những thông tin liên quan đến chính sách sản lượng của các nước xuất khẩu dầu mỏ.</p>
    `
  },
  {
    slug: "ca-phe-noi-dia-lap-dinh",
    type: "news",
    category: "Nguyên liệu CN",
    tagClass: "amber",
    title: "Cà phê nội địa lập đỉnh mới, Robusta London điều chỉnh nhẹ",
    excerpt: "Giá cà phê thu mua nội địa lập đỉnh mới trong khi hợp đồng Robusta London điều chỉnh nhẹ sau chuỗi tăng liên tiếp.",
    date: "26/07/2026",
    body: `
      <p>Giá cà phê thu mua tại thị trường nội địa tiếp tục lập đỉnh mới, trong khi hợp đồng Robusta trên Sở Giao dịch London điều chỉnh nhẹ sau chuỗi phiên tăng liên tiếp trước đó — diễn biến thường thấy khi thị trường quốc tế bước vào nhịp nghỉ kỹ thuật.</p>
      <p>Chênh lệch giữa giá nội địa và giá liên thông quốc tế tiếp tục là yếu tố được các thương nhân và nhà đầu tư theo dõi sát, trong bối cảnh nguồn cung nội địa vẫn còn nhiều điểm cần quan sát thêm.</p>
      <p>Nhóm nguyên liệu công nghiệp khác như hồ tiêu, cao su tiếp tục vận động theo diễn biến chung của nhóm hàng nông sản nhiệt đới.</p>
    `
  },
  {
    slug: "dau-tuong-tang-phien-ba",
    type: "news",
    category: "Nông sản",
    tagClass: "green",
    title: "Đậu tương tăng phiên thứ ba nhờ lo ngại thời tiết Midwest",
    excerpt: "Đậu tương tăng phiên thứ ba liên tiếp nhờ lo ngại thời tiết tại Midwest; lúa mì và ngô đi lên theo.",
    date: "26/07/2026",
    body: `
      <p>Giá đậu tương ghi nhận phiên tăng thứ ba liên tiếp khi thị trường lo ngại điều kiện thời tiết tại khu vực Midwest (Mỹ) có thể ảnh hưởng đến năng suất mùa vụ trong giai đoạn sinh trưởng quan trọng. Lúa mì và ngô cũng đi lên theo diễn biến chung của nhóm nông sản.</p>
      <p>Yếu tố thời tiết luôn là biến số nhạy cảm đối với nhóm nông sản trong giai đoạn mùa vụ, khi những thay đổi về lượng mưa hay nhiệt độ có thể tác động trực tiếp đến kỳ vọng sản lượng.</p>
      <p>Báo cáo mùa vụ định kỳ từ Bộ Nông nghiệp Mỹ (USDA) trong thời gian tới sẽ là dữ liệu quan trọng giúp thị trường đánh giá lại triển vọng cung - cầu nhóm hàng này.</p>
    `
  },
  {
    slug: "nhan-dinh-tuan-27-31-07",
    type: "news",
    category: "Phân tích",
    tagClass: "",
    title: "Nhận định tuần 27–31/07: 3 sự kiện vĩ mô cần theo dõi",
    excerpt: "Tổng hợp 3 sự kiện vĩ mô đáng chú ý trong tuần có thể tác động đến biến động giá các nhóm hàng hóa phái sinh.",
    date: "25/07/2026",
    body: `
      <p>Tuần giao dịch 27–31/07 được dự báo sẽ có nhiều biến động đáng chú ý trên thị trường hàng hóa phái sinh, khi một loạt sự kiện vĩ mô quan trọng cùng diễn ra trong thời gian ngắn.</p>
      <p><strong>1. Kỳ họp chính sách lãi suất:</strong> quyết định và phát biểu định hướng chính sách tiền tệ tiếp tục là tâm điểm, ảnh hưởng trực tiếp đến nhóm kim loại quý và tỷ giá đồng USD.</p>
      <p><strong>2. Số liệu tồn kho năng lượng:</strong> các báo cáo tồn kho dầu thô và khí tự nhiên định kỳ sẽ là dữ liệu quan trọng cho nhóm năng lượng.</p>
      <p><strong>3. Báo cáo mùa vụ nông sản:</strong> cập nhật về tình hình sản xuất và dự báo sản lượng có thể tạo biến động cho nhóm đậu tương, lúa mì, ngô.</p>
      <p>Nhà đầu tư nên theo dõi sát lịch kinh tế trong tuần và cân nhắc quản trị rủi ro chặt chẽ trước các thời điểm công bố dữ liệu quan trọng.</p>
    `
  },
  {
    slug: "dau-tuong-giam-manh-tuan-giao-dich",
    type: "news",
    category: "Nông sản",
    tagClass: "green",
    title: "Giá đậu tương giảm mạnh 5,6% trong tuần giao dịch vừa qua",
    excerpt: "Đậu tương hợp đồng tháng 09/2026 mất 5,6% trong tuần khi khối lượng bán áp đảo, dù Trung Quốc đã mua thêm đậu nành Mỹ cuối tháng 7.",
    date: "03/08/2026",
    attachment: { name: "Nguồn: commodities.vn", url: "https://commodities.vn/gia-dau-tuong-giam-manh-5-6-trong-tuan-giao-dich-vua-qua/" },
    body: `
      <p>Giá đậu tương hợp đồng kỳ hạn tháng 09/2026 giảm mạnh 5,6% (tương đương khoảng 70 điểm) trong tuần giao dịch vừa qua, khi khối lượng bán ra áp đảo lực mua và xóa sạch phần tăng đã ghi nhận ở tuần trước đó.</p>
      <p>Diễn biến giảm diễn ra dù các cơ quan chính phủ Trung Quốc đã mua ít nhất 14 lô đậu nành Mỹ (ước tính khoảng 840.000 tấn) vào cuối tháng 7. Tuy nhiên, giá chào bán từ Brazil vẫn rẻ hơn khiến phần lớn nhà nhập khẩu thương mại tiếp tục ưu tiên nguồn cung Nam Mỹ, hạn chế tác động tích cực từ lực mua của Trung Quốc lên giá.</p>
      <p>Về mặt kỹ thuật, vùng 1160–1175 đang đóng vai trò hỗ trợ gần nhất; nếu ngưỡng này bị phá vỡ, giá có thể tiếp tục điều chỉnh về vùng 1150.</p>
    `
  },

  // ===== TIN ĐIỀU HÀNH MXV =====
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
