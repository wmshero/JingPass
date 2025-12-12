

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface UserProfile {
  name: string;
  gender: string;
  education: string;
  school: string;
  industry: string;
  position: string;
  salary: string;
  experience: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '张同学',
    gender: 'male',
    education: 'bachelor',
    school: '北京大学',
    industry: 'internet',
    position: 'product-manager',
    salary: '20k-30k',
    experience: '1-3-years'
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>(userProfile);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 个人中心';
    return () => { document.title = originalTitle; };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: keyof PasswordForm, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOriginalProfile(userProfile);
    alert('个人信息保存成功！');
  };

  const handleProfileCancel = () => {
    if (confirm('确定要取消修改吗？未保存的更改将丢失。')) {
      setUserProfile(originalProfile);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('请填写完整的密码信息');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('新密码和确认密码不一致');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('新密码长度至少6位');
      return;
    }
    
    setIsPasswordLoading(true);
    
    // 模拟密码修改操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsPasswordLoading(false);
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    alert('密码修改成功！');
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleAvatarUpload = () => {
    console.log('需要调用第三方接口实现头像上传功能');
    // 注释：此功能需要文件上传API，在原型阶段仅做UI展示
  };

  const handleChangePhone = () => {
    console.log('需要调用第三方接口实现手机号修改功能');
    // 注释：此功能需要短信验证API，在原型阶段仅做UI展示
    alert('手机号修改功能开发中...');
  };

  const handleChangeEmail = () => {
    console.log('需要调用第三方接口实现邮箱修改功能');
    // 注释：此功能需要邮件验证API，在原型阶段仅做UI展示
    alert('邮箱修改功能开发中...');
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handlePasswordCancel();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border-light h-16 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* 左侧：Logo和菜单切换 */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSidebarToggle}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-sm"></i>
              </div>
              <h1 className="text-xl font-bold text-text-primary">面经通</h1>
            </div>
          </div>
          
          {/* 中间：搜索框 */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索题目、技巧..." 
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg ${styles.searchInput}`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          {/* 右侧：通知和用户 */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <img 
                src="https://s.coze.cn/image/y3VGjPri7ok/" 
                alt="用户头像" 
                className="w-8 h-8 rounded-full"
                data-category="人物"
              />
              <span className="text-sm font-medium text-text-primary hidden md:block">张同学</span>
              <i className="fas fa-chevron-down text-xs text-gray-400 hidden md:block"></i>
            </div>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-border-light transition-all duration-300 z-40 ${
        isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}>
        <nav className="p-4 space-y-2">
          <Link 
            to="/home" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-home w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>首页</span>
          </Link>
          <Link 
            to="/question-bank" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-book w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>题库</span>
          </Link>
          <Link 
            to="/interview-create" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-video w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>模拟面试</span>
          </Link>
          <Link 
            to="/interview-history" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-history w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>历史记录</span>
          </Link>
          <Link 
            to="/learning-center" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-graduation-cap w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>学习中心</span>
          </Link>
          <Link 
            to="/user-profile" 
            className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}
          >
            <i className="fas fa-user w-5"></i>
            <span className={isSidebarCollapsed ? 'hidden' : ''}>个人中心</span>
          </Link>
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded
      }`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">个人中心</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <span className="mx-2">{'>'}</span>
                  <span>个人中心</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 个人信息表单 */}
          <form onSubmit={handleProfileSubmit} className="space-y-8">
            {/* 个人基本信息 */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
                <i className="fas fa-user-circle text-primary mr-3"></i>
                个人基本信息
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 头像上传 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-3">头像</label>
                  <div className="flex items-center space-x-6">
                    <div className={styles.avatarUpload}>
                      <img 
                        src="https://s.coze.cn/image/uhb_ew05KAc/" 
                        alt="用户头像" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                        data-category="人物"
                      />
                      <div className={styles.avatarOverlay} onClick={handleAvatarUpload}>
                        <i className="fas fa-camera text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-2">点击头像更换</p>
                      <p className="text-xs text-text-secondary">支持 JPG、PNG 格式，文件大小不超过 2MB</p>
                    </div>
                  </div>
                </div>

                {/* 姓名 */}
                <div>
                  <label htmlFor="user-name" className="block text-sm font-medium text-text-primary mb-2">姓名</label>
                  <input 
                    type="text" 
                    id="user-name" 
                    value={userProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                    placeholder="请输入姓名"
                  />
                </div>

                {/* 性别 */}
                <div>
                  <label htmlFor="user-gender" className="block text-sm font-medium text-text-primary mb-2">性别</label>
                  <select 
                    id="user-gender" 
                    value={userProfile.gender}
                    onChange={(e) => handleProfileChange('gender', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                {/* 学历 */}
                <div>
                  <label htmlFor="user-education" className="block text-sm font-medium text-text-primary mb-2">学历</label>
                  <select 
                    id="user-education" 
                    value={userProfile.education}
                    onChange={(e) => handleProfileChange('education', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="high-school">高中及以下</option>
                    <option value="associate">大专</option>
                    <option value="bachelor">本科</option>
                    <option value="master">硕士</option>
                    <option value="doctor">博士</option>
                  </select>
                </div>

                {/* 毕业院校 */}
                <div>
                  <label htmlFor="user-school" className="block text-sm font-medium text-text-primary mb-2">毕业院校</label>
                  <input 
                    type="text" 
                    id="user-school" 
                    value={userProfile.school}
                    onChange={(e) => handleProfileChange('school', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                    placeholder="请输入毕业院校"
                  />
                </div>
              </div>
            </section>

            {/* 求职意向 */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
                <i className="fas fa-briefcase text-secondary mr-3"></i>
                求职意向
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 目标行业 */}
                <div>
                  <label htmlFor="target-industry" className="block text-sm font-medium text-text-primary mb-2">目标行业</label>
                  <select 
                    id="target-industry" 
                    value={userProfile.industry}
                    onChange={(e) => handleProfileChange('industry', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="internet">互联网</option>
                    <option value="finance">金融</option>
                    <option value="education">教育</option>
                    <option value="healthcare">医疗健康</option>
                    <option value="manufacturing">制造业</option>
                    <option value="consulting">咨询</option>
                    <option value="retail">零售</option>
                  </select>
                </div>

                {/* 目标岗位 */}
                <div>
                  <label htmlFor="target-position" className="block text-sm font-medium text-text-primary mb-2">目标岗位</label>
                  <select 
                    id="target-position" 
                    value={userProfile.position}
                    onChange={(e) => handleProfileChange('position', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="frontend-dev">前端开发</option>
                    <option value="backend-dev">后端开发</option>
                    <option value="fullstack-dev">全栈开发</option>
                    <option value="product-manager">产品经理</option>
                    <option value="ui-ux">UI/UX设计师</option>
                    <option value="data-analyst">数据分析师</option>
                    <option value="marketing">市场营销</option>
                    <option value="sales">销售</option>
                  </select>
                </div>

                {/* 期望薪资 */}
                <div>
                  <label htmlFor="expected-salary" className="block text-sm font-medium text-text-primary mb-2">期望薪资（月薪）</label>
                  <select 
                    id="expected-salary" 
                    value={userProfile.salary}
                    onChange={(e) => handleProfileChange('salary', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="5k-10k">5K-10K</option>
                    <option value="10k-15k">10K-15K</option>
                    <option value="15k-20k">15K-20K</option>
                    <option value="20k-30k">20K-30K</option>
                    <option value="30k-50k">30K-50K</option>
                    <option value="50k+">50K以上</option>
                  </select>
                </div>

                {/* 工作经验 */}
                <div>
                  <label htmlFor="work-experience" className="block text-sm font-medium text-text-primary mb-2">工作经验</label>
                  <select 
                    id="work-experience" 
                    value={userProfile.experience}
                    onChange={(e) => handleProfileChange('experience', e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="">请选择</option>
                    <option value="no-experience">无经验</option>
                    <option value="1-3-years">1-3年</option>
                    <option value="3-5-years">3-5年</option>
                    <option value="5-10-years">5-10年</option>
                    <option value="10+years">10年以上</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 账号安全 */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
                <i className="fas fa-shield-alt text-tertiary mr-3"></i>
                账号安全
              </h3>
              
              <div className="space-y-4">
                {/* 绑定手机 */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-info bg-opacity-10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-mobile-alt text-info"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">绑定手机</p>
                      <p className="text-xs text-text-secondary">用于登录和找回密码</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary">138****8888</span>
                    <button 
                      type="button" 
                      onClick={handleChangePhone}
                      className="px-3 py-1 text-sm text-primary hover:text-blue-700 border border-primary rounded-lg hover:bg-primary hover:bg-opacity-10"
                    >
                      修改
                    </button>
                  </div>
                </div>

                {/* 绑定邮箱 */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-secondary"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">绑定邮箱</p>
                      <p className="text-xs text-text-secondary">用于登录和接收通知</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary">zhang***@example.com</span>
                    <button 
                      type="button" 
                      onClick={handleChangeEmail}
                      className="px-3 py-1 text-sm text-primary hover:text-blue-700 border border-primary rounded-lg hover:bg-primary hover:bg-opacity-10"
                    >
                      修改
                    </button>
                  </div>
                </div>

                {/* 修改密码 */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-lock text-danger"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">登录密码</p>
                      <p className="text-xs text-text-secondary">定期修改密码保护账号安全</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowPasswordModal(true)}
                    className="px-3 py-1 text-sm text-primary hover:text-blue-700 border border-primary rounded-lg hover:bg-primary hover:bg-opacity-10"
                  >
                    修改
                  </button>
                </div>
              </div>
            </section>

            {/* 操作按钮 */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button 
                type="button" 
                onClick={handleProfileCancel}
                className="px-6 py-2 text-sm font-medium text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? '保存中...' : '保存修改'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 修改密码模态框 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50">
          <div className={styles.modalBackdrop} onClick={handleModalBackdropClick}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`bg-white rounded-xl shadow-xl w-full max-w-md ${styles.modalEnter}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">修改密码</h3>
                  <button 
                    type="button" 
                    onClick={handlePasswordCancel}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-text-primary mb-2">当前密码</label>
                    <input 
                      type="password" 
                      id="current-password" 
                      value={passwordForm.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                      placeholder="请输入当前密码"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-text-primary mb-2">新密码</label>
                    <input 
                      type="password" 
                      id="new-password" 
                      value={passwordForm.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                      placeholder="请输入新密码"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-text-primary mb-2">确认新密码</label>
                    <input 
                      type="password" 
                      id="confirm-password" 
                      value={passwordForm.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                      placeholder="请再次输入新密码"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button 
                      type="button" 
                      onClick={handlePasswordCancel}
                      className="px-4 py-2 text-sm text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      取消
                    </button>
                    <button 
                      type="submit" 
                      disabled={isPasswordLoading}
                      className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isPasswordLoading ? '修改中...' : '保存'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;

