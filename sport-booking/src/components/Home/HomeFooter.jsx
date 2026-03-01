import React from 'react';
import { Clock, ShieldCheck, Calendar, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeFooter = () => {
  return (
    <div className="w-full font-sans">
      
      {/* === PHẦN 1: 3 TÍNH NĂNG NỔI BẬT (Nền tối) === */}
      <div className="bg-[#1e1b4b] py-20 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Cột 1 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-orange-500 rounded-full mb-6">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Đặt sân nhanh chóng 24/7</h3>
            <p className="text-gray-300 text-sm px-4">Hệ thống hoạt động liên tục giúp bạn đặt sân mọi lúc mọi nơi.</p>
          </div>
          {/* Cột 2 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-orange-500 rounded-full mb-6">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Thanh toán an toàn</h3>
            <p className="text-gray-300 text-sm px-4">Cam kết bảo mật thông tin và giao dịch an toàn tuyệt đối.</p>
          </div>
          {/* Cột 3 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-orange-500 rounded-full mb-6">
              <Calendar className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Quản lý lịch dễ dàng</h3>
            <p className="text-gray-300 text-sm px-4">Theo dõi, thay đổi lịch đặt sân chỉ với vài thao tác đơn giản.</p>
          </div>
        </div>
      </div>

      {/* === PHẦN 2: BANNER APP (Nền trắng chứa Banner Gradient) === */}
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-[2.5rem] bg-gradient-to-r from-purple-700 to-pink-500 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center p-8 md:p-16">
            
            {/* Nội dung bên trái */}
            <div className="flex-1 z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Đặt sân mọi lúc mọi nơi với<br/>ứng dụng SportBook
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Tải ngay ứng dụng để nhận ưu đãi đặc biệt cho lần đặt sân đầu tiên của bạn.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                {/* Nút giả lập App Store / Google Play */}
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-600 hover:bg-gray-900 transition">
                   <div className="text-xs text-left">
                      <p>Download on the</p>
                      <p className="text-lg font-bold">App Store</p>
                   </div>
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-600 hover:bg-gray-900 transition">
                   <div className="text-xs text-left">
                      <p>GET IT ON</p>
                      <p className="text-lg font-bold">Google Play</p>
                   </div>
                </button>
              </div>
            </div>

            {/* Hình ảnh điện thoại bên phải (Giả lập bằng CSS nếu chưa có ảnh) */}
            <div className="w-64 h-80 bg-black rounded-3xl border-8 border-gray-800 shadow-xl flex items-center justify-center relative md:-mb-32 md:mr-10 transform rotate-[-5deg]">
               <div className="text-white font-bold text-2xl">App Screen</div>
            </div>
          </div>
        </div>
      </div>

      {/* === PHẦN 3: FOOTER LINKS (Nền trắng) === */}
      <footer className="bg-white pt-10 pb-6 border-t border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
               SportBook
            </h2>
            <p className="text-gray-500 text-sm">
              Nền tảng đặt sân thể thao hàng đầu Việt Nam, giúp kết nối người chơi và chủ sân một cách dễ dàng.
            </p>
            <div className="flex gap-3">
               <button className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 hover:text-orange-500 transition"><Facebook size={18}/></button>
               <button className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 hover:text-orange-500 transition"><Instagram size={18}/></button>
               <button className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 hover:text-orange-500 transition"><Twitter size={18}/></button>
               <button className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 hover:text-orange-500 transition"><Youtube size={18}/></button>
            </div>
          </div>

          {/* Cột 2: Về chúng tôi */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6">Về chúng tôi</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-orange-500 transition">Giới thiệu</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Tuyển dụng</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Điều khoản sử dụng</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-orange-500 transition">Hướng dẫn đặt sân</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Chính sách đổi trả</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Câu hỏi thường gặp</Link></li>
              <li><Link to="/" className="hover:text-orange-500 transition">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 4: Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6">Đăng ký nhận tin</h3>
            <p className="text-gray-500 text-sm mb-4">Nhận thông tin về các giải đấu và ưu đãi mới nhất.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email của bạn" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500" />
              <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-gray-400 text-sm">© 2026 SportBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeFooter;