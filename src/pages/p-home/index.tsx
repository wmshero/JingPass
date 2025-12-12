

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const HomePage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 首页';
    return () => { document.title = originalTitle; };
  }, []);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('zh-CN', options));
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleQuickInterview = () => {
    navigate('/interview-create');
  };

  const handleQuickQuestionBank = () => {
    navigate('/question-bank');
  };

  const handleQuickLearning = () => {
    navigate('/learning-center');
  };

  const handleQuickHistory = () => {
    navigate('/interview-history');
  };

  const handleHotQuestionClick = (questionId: string) => {
    navigate(`/question-detail?questionId=${questionId}`);
  };

  const handleLatestTipClick = (contentId: string) => {
    navigate(`/learning-detail?contentId=${contentId}`);
  };

  const handleViewMoreContent = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/learning-center');
  };

  const handleUserMenuClick = () => {
    navigate('/user-profile');
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
            <div 
              onClick={handleUserMenuClick}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
            >
              <img 
                src="https://s.coze.cn/image/qLQrhlwGEdU/" 
                alt="用户头像" 
                className="w-8 h-8 rounded-full"
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
            className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}
          >
            <i className="fas fa-home w-5"></i>
            {!isSidebarCollapsed && <span>首页</span>}
          </Link>
          <Link 
            to="/question-bank" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-book w-5"></i>
            {!isSidebarCollapsed && <span>题库</span>}
          </Link>
          <Link 
            to="/interview-create" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-video w-5"></i>
            {!isSidebarCollapsed && <span>模拟面试</span>}
          </Link>
          <Link 
            to="/interview-history" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-history w-5"></i>
            {!isSidebarCollapsed && <span>历史记录</span>}
          </Link>
          <Link 
            to="/learning-center" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-graduation-cap w-5"></i>
            {!isSidebarCollapsed && <span>学习中心</span>}
          </Link>
          <Link 
            to="/user-profile" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-user w-5"></i>
            {!isSidebarCollapsed && <span>个人中心</span>}
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">欢迎回来，张同学！</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                </nav>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">今天是</p>
                <p className="text-lg font-medium text-text-primary">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* 快速入口区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">快速开始</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                onClick={handleQuickInterview}
                className={`${styles.cardHover} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-video text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">开始模拟面试</h4>
                    <p className="text-sm text-text-secondary">提升面试技能</p>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleQuickQuestionBank}
                className={`${styles.cardHover} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-book text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">浏览题库</h4>
                    <p className="text-sm text-text-secondary">学习面试题目</p>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleQuickLearning}
                className={`${styles.cardHover} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-tertiary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-tertiary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">学习面试技巧</h4>
                    <p className="text-sm text-text-secondary">掌握面试要点</p>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleQuickHistory}
                className={`${styles.cardHover} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-info bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-info text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">查看学习进度</h4>
                    <p className="text-sm text-text-secondary">跟踪成长历程</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 数据概览区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">学习概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">已完成面试</p>
                    <p className="text-2xl font-bold text-text-primary">12</p>
                    <p className="text-xs text-secondary mt-1">
                      <i className="fas fa-arrow-up"></i> +2 本周
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-video text-primary"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">收藏题目</p>
                    <p className="text-2xl font-bold text-text-primary">48</p>
                    <p className="text-xs text-secondary mt-1">
                      <i className="fas fa-arrow-up"></i> +5 本周
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-bookmark text-secondary"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">学习时长</p>
                    <p className="text-2xl font-bold text-text-primary">24.5h</p>
                    <p className="text-xs text-secondary mt-1">
                      <i className="fas fa-arrow-up"></i> +3.2h 本周
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-tertiary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-tertiary"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">连续学习</p>
                    <p className="text-2xl font-bold text-text-primary">7天</p>
                    <p className="text-xs text-secondary mt-1">
                      <i className="fas fa-fire"></i> 保持连击
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-danger bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-check text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 推荐内容区 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">推荐内容</h3>
              <button 
                onClick={handleViewMoreContent}
                className="text-sm text-primary hover:text-blue-700"
              >
                查看更多
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 热门题目 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-fire text-danger mr-2"></i>
                  热门题目
                </h4>
                <div className="space-y-3">
                  <div 
                    onClick={() => handleHotQuestionClick('q001')}
                    className="border-l-4 border-primary pl-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <p className="text-sm font-medium text-text-primary">请介绍一下你的项目经验</p>
                    <p className="text-xs text-text-secondary mt-1">产品经理 · 中级</p>
                  </div>
                  <div 
                    onClick={() => handleHotQuestionClick('q002')}
                    className="border-l-4 border-secondary pl-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <p className="text-sm font-medium text-text-primary">如何处理工作中的冲突？</p>
                    <p className="text-xs text-text-secondary mt-1">通用 · 初级</p>
                  </div>
                  <div 
                    onClick={() => handleHotQuestionClick('q003')}
                    className="border-l-4 border-tertiary pl-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <p className="text-sm font-medium text-text-primary">描述一下你的职业规划</p>
                    <p className="text-xs text-text-secondary mt-1">通用 · 中级</p>
                  </div>
                </div>
              </div>
              
              {/* 最新技巧 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-star text-tertiary mr-2"></i>
                  最新技巧
                </h4>
                <div className="space-y-3">
                  <div 
                    onClick={() => handleLatestTipClick('l001')}
                    className="hover:bg-gray-50 rounded p-3 cursor-pointer"
                  >
                    <img 
                      src="https://s.coze.cn/image/hmJsMVT9Pts/" 
                      alt="面试技巧文章配图" 
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-text-primary">简历优化的5个关键要点</p>
                    <p className="text-xs text-text-secondary mt-1">2小时前</p>
                  </div>
                  <div 
                    onClick={() => handleLatestTipClick('l002')}
                    className="hover:bg-gray-50 rounded p-3 cursor-pointer"
                  >
                    <img 
                      src="https://s.coze.cn/image/4usyKMjirO4/" 
                      alt="面试技巧文章配图" 
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-text-primary">行为面试的STAR法则</p>
                    <p className="text-xs text-text-secondary mt-1">1天前</p>
                  </div>
                </div>
              </div>
              
              {/* 学习路径 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-route text-info mr-2"></i>
                  学习路径
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">基础面试技巧</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-primary h-1.5 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">岗位专项训练</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-secondary h-1.5 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">模拟面试实战</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-gray-300 h-1.5 rounded-full" style={{width: '0%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

