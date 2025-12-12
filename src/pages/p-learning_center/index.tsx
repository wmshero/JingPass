

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface LearningContent {
  id: string;
  type: 'article' | 'video';
  category: 'interview-tips' | 'common-questions';
  title: string;
  description: string;
  imageUrl: string;
  publishDate: string;
  views: string;
  likes: number;
  progress: number;
  isCompleted: boolean;
}

const LearningCenter: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [contentSearchTerm, setContentSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jumpToPage, setJumpToPage] = useState('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 学习中心';
    return () => { document.title = originalTitle; };
  }, []);

  // 学习内容数据
  const learningContentList: LearningContent[] = [
    {
      id: 'content1',
      type: 'article',
      category: 'interview-tips',
      title: '简历优化的5个关键要点',
      description: '学会如何制作一份优秀的简历，突出你的核心优势，让招聘经理眼前一亮。本文将从简历结构、内容优化、关键词使用等方面为你详细讲解。',
      imageUrl: 'https://s.coze.cn/image/VTWsLY6ahHw/',
      publishDate: '2024-01-15',
      views: '1.2k 阅读',
      likes: 89,
      progress: 75,
      isCompleted: false
    },
    {
      id: 'content2',
      type: 'video',
      category: 'interview-tips',
      title: '行为面试的STAR法则详解',
      description: '掌握STAR法则，让你的面试回答更具逻辑性和说服力。通过实际案例演示，学会如何在面试中完美运用这一技巧。',
      imageUrl: 'https://s.coze.cn/image/7qboqbc2zgY/',
      publishDate: '2024-01-14',
      views: '856 播放',
      likes: 67,
      progress: 45,
      isCompleted: false
    },
    {
      id: 'content3',
      type: 'article',
      category: 'common-questions',
      title: '如何做好自我介绍？',
      description: '自我介绍是面试的第一步，也是最重要的环节之一。学会如何在30秒内展现自己的核心价值，给面试官留下深刻印象。',
      imageUrl: 'https://s.coze.cn/image/2rdSSWOdcHk/',
      publishDate: '2024-01-13',
      views: '945 阅读',
      likes: 56,
      progress: 100,
      isCompleted: true
    },
    {
      id: 'content4',
      type: 'video',
      category: 'common-questions',
      title: '技术面试常见问题及解答策略',
      description: '全面解析技术岗位面试中的常见问题，包括算法、数据结构、项目经验等方面，助你从容应对技术面试。',
      imageUrl: 'https://s.coze.cn/image/46ykCv9vQ3o/',
      publishDate: '2024-01-12',
      views: '1.5k 播放',
      likes: 123,
      progress: 0,
      isCompleted: false
    },
    {
      id: 'content5',
      type: 'article',
      category: 'interview-tips',
      title: '薪资谈判的艺术与技巧',
      description: '掌握薪资谈判的关键技巧，了解市场行情，学会如何提出合理的薪资要求，争取到满意的薪酬待遇。',
      imageUrl: 'https://s.coze.cn/image/rWKzv4mFdRs/',
      publishDate: '2024-01-11',
      views: '789 阅读',
      likes: 45,
      progress: 0,
      isCompleted: false
    }
  ];

  // 筛选和排序内容
  const filteredAndSortedContent = React.useMemo(() => {
    let filteredContent = learningContentList.filter(item => {
      const matchesSearch = contentSearchTerm === '' || 
        item.title.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(contentSearchTerm.toLowerCase());
      
      const matchesType = typeFilter === '' || item.type === typeFilter;
      const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    });

    if (sortBy === 'popular') {
      filteredContent.sort((a, b) => b.likes - a.likes);
    } else {
      // 最新发布排序（按日期倒序）
      filteredContent.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    }

    return filteredContent;
  }, [learningContentList, contentSearchTerm, typeFilter, categoryFilter, sortBy]);

  // 处理侧边栏切换
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 处理内容卡片点击
  const handleContentCardClick = (contentId: string) => {
    navigate(`/learning-detail?contentId=${contentId}`);
  };

  // 处理全局搜索
  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = (e.target as HTMLInputElement).value;
      if (searchTerm) {
        console.log('全局搜索:', searchTerm);
      }
    }
  };

  // 处理分页
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredAndSortedContent.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleJumpToPage = () => {
    const pageNum = Number(jumpToPage);
    const totalPages = Math.ceil(filteredAndSortedContent.length / pageSize);
    if (pageNum && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // 处理通知点击
  const handleNotificationClick = () => {
    console.log('打开通知');
  };

  // 处理用户菜单点击
  const handleUserMenuClick = () => {
    navigate('/user-profile');
  };

  // 渲染内容卡片
  const renderContentCard = (content: LearningContent) => {
    const typeLabel = content.type === 'article' ? '文章' : '视频';
    const categoryLabel = content.category === 'interview-tips' ? '面试技巧' : '常见问题';
    const typeColorClass = content.type === 'article' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-tertiary bg-opacity-10 text-tertiary';
    const categoryColorClass = content.category === 'interview-tips' ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-info bg-opacity-10 text-info';
    const progressBarColorClass = content.progress > 0 ? 'bg-primary' : 'bg-gray-300';
    const progressText = content.isCompleted ? '已完成' : content.progress === 0 ? '未开始' : `${content.progress}%`;

    return (
      <div 
        key={content.id}
        className={`${styles.contentCard} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
        onClick={() => handleContentCardClick(content.id)}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={content.imageUrl}
              alt={`${content.title}配图`}
              className="w-20 h-16 object-cover rounded-lg"
              data-category="商业科技"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 ${typeColorClass} text-xs font-medium rounded-full`}>
                {typeLabel}
              </span>
              <span className={`px-2 py-1 ${categoryColorClass} text-xs font-medium rounded-full`}>
                {categoryLabel}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2 hover:text-primary cursor-pointer">
              {content.title}
            </h3>
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {content.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span><i className="fas fa-calendar mr-1"></i>{content.publishDate}</span>
                <span>
                  <i className={`fas ${content.type === 'article' ? 'fa-eye' : 'fa-play'} mr-1`}></i>
                  {content.views}
                </span>
                <span><i className="fas fa-thumbs-up mr-1"></i>{content.likes} 点赞</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`${progressBarColorClass} h-1.5 rounded-full`}
                    style={{ width: `${content.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-text-secondary">{progressText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                onKeyPress={handleGlobalSearchKeyPress}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          {/* 右侧：通知和用户 */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-gray-100"
            >
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full"></span>
            </button>
            <div 
              onClick={handleUserMenuClick}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
            >
              <img 
                src="https://s.coze.cn/image/0EMJCuAY3n4/" 
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
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-border-light ${isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded} transition-all duration-300 z-40`}>
        <nav className="p-4 space-y-2">
          <Link 
            to="/home" 
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
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
            className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}
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
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">学习中心</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>学习中心</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 工具栏区域 */}
          <div className="bg-white rounded-xl shadow-card p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* 搜索框 */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="搜索学习内容..." 
                    value={contentSearchTerm}
                    onChange={(e) => setContentSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg ${styles.searchInput}`}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              
              {/* 筛选和排序 */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="type-filter" className="text-sm font-medium text-text-secondary">类型：</label>
                  <select 
                    id="type-filter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="">全部类型</option>
                    <option value="article">文章</option>
                    <option value="video">视频</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="category-filter" className="text-sm font-medium text-text-secondary">分类：</label>
                  <select 
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="">全部分类</option>
                    <option value="interview-tips">面试技巧</option>
                    <option value="common-questions">常见问题</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-select" className="text-sm font-medium text-text-secondary">排序：</label>
                  <select 
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="latest">最新发布</option>
                    <option value="popular">最受欢迎</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 学习内容列表 */}
          <div className="space-y-4 mb-8">
            {filteredAndSortedContent.map(renderContentCard)}
          </div>

          {/* 分页区域 */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-card p-4">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>共 <span className="font-medium text-text-primary">{filteredAndSortedContent.length}</span> 条记录</span>
              <div className="flex items-center space-x-2">
                <span>每页显示</span>
                <select 
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className={`px-2 py-1 border border-gray-300 rounded ${styles.filterSelect}`}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span>条</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded active`}>1</button>
              <button className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded`}>2</button>
              <button className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded`}>3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded`}>5</button>
              <button 
                onClick={handleNextPage}
                className={`${styles.paginationButton} px-3 py-1 border border-gray-300 rounded`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span>跳转到</span>
              <input 
                type="number" 
                min="1" 
                max={Math.ceil(filteredAndSortedContent.length / pageSize)}
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <span>页</span>
              <button 
                onClick={handleJumpToPage}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-600"
              >
                跳转
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningCenter;

