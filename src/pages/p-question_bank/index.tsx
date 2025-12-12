

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface Question {
  id: string;
  title: string;
  industry: string;
  position: string;
  difficulty: '初级' | '中级' | '高级';
  isFavorited: boolean;
  description: string;
}

type SortField = 'title' | 'industry' | 'position' | 'difficulty' | 'id';
type SortOrder = 'asc' | 'desc';

const QuestionBankPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 模拟题目数据
  const [mockQuestions] = useState<Question[]>([
    {
      id: 'q001',
      title: '请介绍一下你的项目经验',
      industry: '互联网',
      position: '产品经理',
      difficulty: '中级',
      isFavorited: true,
      description: '详细描述你参与过的项目，包括项目背景、你的角色、遇到的挑战以及最终成果。'
    },
    {
      id: 'q002',
      title: '如何处理工作中的冲突？',
      industry: '通用',
      position: '通用',
      difficulty: '初级',
      isFavorited: false,
      description: '请分享一个你在工作中遇到的冲突案例，以及你是如何解决的。'
    },
    {
      id: 'q003',
      title: '描述一下你的职业规划',
      industry: '通用',
      position: '通用',
      difficulty: '中级',
      isFavorited: true,
      description: '谈谈你未来3-5年的职业发展规划和目标。'
    },
    {
      id: 'q004',
      title: 'React和Vue的主要区别是什么？',
      industry: '互联网',
      position: '前端开发',
      difficulty: '高级',
      isFavorited: false,
      description: '详细比较React和Vue两个框架的核心差异，包括设计理念、性能特点等。'
    },
    {
      id: 'q005',
      title: '如何进行用户需求分析？',
      industry: '互联网',
      position: '产品经理',
      difficulty: '中级',
      isFavorited: false,
      description: '请描述你进行用户需求分析的方法和流程。'
    },
    {
      id: 'q006',
      title: '数据库索引优化策略有哪些？',
      industry: '互联网',
      position: '后端开发',
      difficulty: '高级',
      isFavorited: true,
      description: '详细介绍数据库索引的优化方法和最佳实践。'
    },
    {
      id: 'q007',
      title: '如何与团队成员有效沟通？',
      industry: '通用',
      position: '通用',
      difficulty: '初级',
      isFavorited: false,
      description: '分享你在团队协作中的沟通技巧和经验。'
    },
    {
      id: 'q008',
      title: '设计一个移动端支付界面',
      industry: '互联网',
      position: 'UI设计师',
      difficulty: '中级',
      isFavorited: false,
      description: '请描述你会如何设计一个用户友好的移动端支付界面。'
    },
    {
      id: 'q009',
      title: '销售业绩下滑时你会怎么做？',
      industry: '金融',
      position: '销售',
      difficulty: '中级',
      isFavorited: true,
      description: '分析可能的原因并提出改进策略。'
    },
    {
      id: 'q010',
      title: '如何制定产品运营策略？',
      industry: '互联网',
      position: '运营',
      difficulty: '高级',
      isFavorited: false,
      description: '详细说明产品运营策略的制定过程和关键要素。'
    },
    {
      id: 'q011',
      title: 'JavaScript闭包的理解和应用',
      industry: '互联网',
      position: '前端开发',
      difficulty: '高级',
      isFavorited: false,
      description: '深入解释JavaScript闭包的概念、用途和注意事项。'
    },
    {
      id: 'q012',
      title: '如何评估产品的用户体验？',
      industry: '互联网',
      position: '产品经理',
      difficulty: '中级',
      isFavorited: true,
      description: '介绍用户体验评估的方法和指标。'
    },
    {
      id: 'q013',
      title: '微服务架构的优缺点分析',
      industry: '互联网',
      position: '后端开发',
      difficulty: '高级',
      isFavorited: false,
      description: '全面分析微服务架构的优势和潜在问题。'
    },
    {
      id: 'q014',
      title: '如何建立良好的客户关系？',
      industry: '金融',
      position: '销售',
      difficulty: '初级',
      isFavorited: false,
      description: '分享你在客户关系管理方面的经验和技巧。'
    },
    {
      id: 'q015',
      title: 'UI设计中的色彩搭配原则',
      industry: '互联网',
      position: 'UI设计师',
      difficulty: '中级',
      isFavorited: true,
      description: '详细介绍UI设计中的色彩理论和搭配技巧。'
    },
    {
      id: 'q016',
      title: '如何进行有效的时间管理？',
      industry: '通用',
      position: '通用',
      difficulty: '初级',
      isFavorited: false,
      description: '分享你的时间管理方法和工具。'
    },
    {
      id: 'q017',
      title: 'Python装饰器的实现原理',
      industry: '互联网',
      position: '后端开发',
      difficulty: '高级',
      isFavorited: false,
      description: '深入讲解Python装饰器的工作原理和应用场景。'
    },
    {
      id: 'q018',
      title: '如何制定产品路线图？',
      industry: '互联网',
      position: '产品经理',
      difficulty: '高级',
      isFavorited: true,
      description: '详细说明产品路线图的制定过程和关键要素。'
    },
    {
      id: 'q019',
      title: '前端性能优化的常用方法',
      industry: '互联网',
      position: '前端开发',
      difficulty: '中级',
      isFavorited: false,
      description: '介绍前端性能优化的各种技术和最佳实践。'
    },
    {
      id: 'q020',
      title: '如何进行市场竞品分析？',
      industry: '互联网',
      position: '运营',
      difficulty: '中级',
      isFavorited: false,
      description: '详细说明竞品分析的方法和流程。'
    }
  ]);

  // 状态管理
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  // 搜索和筛选状态
  const [questionSearchTerm, setQuestionSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState('');
  const [sortSelectValue, setSortSelectValue] = useState('latest');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 题库';
    return () => { document.title = originalTitle; };
  }, []);

  // 初始化和筛选逻辑
  useEffect(() => {
    filterQuestions();
  }, [questionSearchTerm, selectedIndustry, selectedPosition, selectedDifficulty, favoriteFilter, sortField, sortOrder]);

  // 筛选题目
  const filterQuestions = () => {
    let filteredQuestions = [...mockQuestions];

    // 应用搜索筛选
    if (questionSearchTerm) {
      const searchTermLower = questionSearchTerm.toLowerCase();
      filteredQuestions = filteredQuestions.filter(question =>
        question.title.toLowerCase().includes(searchTermLower) ||
        question.description.toLowerCase().includes(searchTermLower)
      );
    }

    // 应用行业筛选
    if (selectedIndustry) {
      filteredQuestions = filteredQuestions.filter(question => question.industry === selectedIndustry);
    }

    // 应用岗位筛选
    if (selectedPosition) {
      filteredQuestions = filteredQuestions.filter(question => question.position === selectedPosition);
    }

    // 应用难度筛选
    if (selectedDifficulty) {
      filteredQuestions = filteredQuestions.filter(question => question.difficulty === selectedDifficulty);
    }

    // 应用收藏筛选
    if (favoriteFilter) {
      filteredQuestions = filteredQuestions.filter(question =>
        favoriteFilter === 'favorited' ? question.isFavorited : !question.isFavorited
      );
    }

    // 应用排序
    sortQuestions(filteredQuestions);

    setCurrentQuestions(filteredQuestions);
    setCurrentPage(1); // 重置到第一页
    setSelectedQuestionIds([]); // 清空选择
  };

  // 排序题目
  const sortQuestions = (questions: Question[]) => {
    questions.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'industry':
          aValue = a.industry;
          bValue = b.industry;
          break;
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'difficulty':
          const difficultyOrder = { '初级': 1, '中级': 2, '高级': 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // 处理排序选择
  const handleSortSelectChange = (value: string) => {
    setSortSelectValue(value);
    if (value === 'latest') {
      setSortField('id');
      setSortOrder('desc');
    } else if (value === 'popular') {
      setSortField('id'); // 模拟热度排序
      setSortOrder('desc');
    } else if (value === 'difficulty-asc') {
      setSortField('difficulty');
      setSortOrder('asc');
    } else if (value === 'difficulty-desc') {
      setSortField('difficulty');
      setSortOrder('desc');
    }
  };

  // 处理表头排序
  const handleHeaderSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageQuestionIds = getCurrentPageQuestions().map(q => q.id);
      setSelectedQuestionIds(currentPageQuestionIds);
    } else {
      setSelectedQuestionIds([]);
    }
  };

  // 处理单选
  const handleSelectQuestion = (questionId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestionIds(prev => [...prev, questionId]);
    } else {
      setSelectedQuestionIds(prev => prev.filter(id => id !== questionId));
    }
  };

  // 获取当前页题目
  const getCurrentPageQuestions = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return currentQuestions.slice(startIndex, endIndex);
  };

  // 获取难度样式类
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-yellow-100 text-yellow-800';
      case '高级': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 切换收藏状态
  const toggleFavorite = (questionId: string) => {
    // 在实际项目中，这里应该调用API
    console.log('Toggle favorite for question:', questionId);
  };

  // 批量收藏
  const handleBatchFavorite = () => {
    if (selectedQuestionIds.length === 0) {
      alert('请先选择要收藏的题目');
      return;
    }
    
    // 在实际项目中，这里应该调用API
    console.log('Batch favorite questions:', selectedQuestionIds);
    alert(`成功收藏了 ${selectedQuestionIds.length} 个题目`);
    setSelectedQuestionIds([]);
  };

  // 清除筛选
  const handleClearFilters = () => {
    setQuestionSearchTerm('');
    setSelectedIndustry('');
    setSelectedPosition('');
    setSelectedDifficulty('');
    setFavoriteFilter('');
    setSortSelectValue('latest');
    setSortField('id');
    setSortOrder('desc');
  };

  // 预览题目
  const previewQuestion = (questionId: string) => {
    const question = mockQuestions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setIsQuestionModalVisible(true);
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setIsQuestionModalVisible(false);
    setSelectedQuestion(null);
  };

  // 分页计算
  const totalPages = Math.ceil(currentQuestions.length / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, currentQuestions.length);

  // 生成页码
  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border-light h-16 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* 左侧：Logo和菜单切换 */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
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
              onClick={() => navigate('/user-profile')}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
            >
              <img 
                src="https://s.coze.cn/image/LphJfwMUxgc/" 
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
            className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}
          >
            <i className="fas fa-home w-5"></i>
            {!isSidebarCollapsed && <span>首页</span>}
          </Link>
          <Link 
            to="/question-bank" 
            className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}
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
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">题库</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>题库</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 工具栏区域 */}
          <div className="bg-white rounded-xl shadow-card p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* 搜索和筛选 */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
                {/* 搜索框 */}
                <div className="relative flex-1 max-w-md">
                  <input 
                    type="text" 
                    placeholder="搜索题目关键词..." 
                    value={questionSearchTerm}
                    onChange={(e) => setQuestionSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg ${styles.searchInput}`}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                
                {/* 行业筛选 */}
                <select 
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                >
                  <option value="">全部行业</option>
                  <option value="互联网">互联网</option>
                  <option value="金融">金融</option>
                  <option value="教育">教育</option>
                  <option value="医疗">医疗</option>
                  <option value="制造业">制造业</option>
                </select>
                
                {/* 岗位筛选 */}
                <select 
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                >
                  <option value="">全部岗位</option>
                  <option value="前端开发">前端开发</option>
                  <option value="后端开发">后端开发</option>
                  <option value="产品经理">产品经理</option>
                  <option value="UI设计师">UI设计师</option>
                  <option value="销售">销售</option>
                  <option value="运营">运营</option>
                </select>
                
                {/* 难度筛选 */}
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                >
                  <option value="">全部难度</option>
                  <option value="初级">初级</option>
                  <option value="中级">中级</option>
                  <option value="高级">高级</option>
                </select>
                
                {/* 收藏筛选 */}
                <select 
                  value={favoriteFilter}
                  onChange={(e) => setFavoriteFilter(e.target.value)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                >
                  <option value="">全部状态</option>
                  <option value="favorited">已收藏</option>
                  <option value="not-favorited">未收藏</option>
                </select>
              </div>
              
              {/* 排序和操作 */}
              <div className="flex items-center space-x-4">
                {/* 排序选择 */}
                <select 
                  value={sortSelectValue}
                  onChange={(e) => handleSortSelectChange(e.target.value)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                >
                  <option value="latest">最新</option>
                  <option value="popular">最热</option>
                  <option value="difficulty-asc">难度升序</option>
                  <option value="difficulty-desc">难度降序</option>
                </select>
                
                {/* 批量操作 */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleBatchFavorite}
                    className="px-3 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <i className="fas fa-bookmark mr-1"></i>批量收藏
                  </button>
                  <button 
                    onClick={handleClearFilters}
                    className="px-3 py-2 text-sm text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    清除筛选
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 数据展示区域 */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            {/* 表格头部操作 */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={getCurrentPageQuestions().length > 0 && selectedQuestionIds.length === getCurrentPageQuestions().length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-text-secondary">全选</span>
                  </label>
                  <span className="text-sm text-text-secondary">共 <span>{currentQuestions.length}</span> 条记录</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">每页显示</span>
                  <select 
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* 表格 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider w-12">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                      onClick={() => handleHeaderSort('title')}
                    >
                      题目名称 <i className={`fas ${sortField === 'title' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                      onClick={() => handleHeaderSort('industry')}
                    >
                      所属行业 <i className={`fas ${sortField === 'industry' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                      onClick={() => handleHeaderSort('position')}
                    >
                      所属岗位 <i className={`fas ${sortField === 'position' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                      onClick={() => handleHeaderSort('difficulty')}
                    >
                      难度 <i className={`fas ${sortField === 'difficulty' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      收藏状态
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageQuestions().map((question) => (
                    <tr key={question.id} className={styles.tableRow}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          value={question.id}
                          checked={selectedQuestionIds.includes(question.id)}
                          onChange={(e) => handleSelectQuestion(question.id, e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link 
                          to={`/question-detail?questionId=${question.id}`} 
                          className="text-primary hover:text-blue-700 font-medium"
                        >
                          {question.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary">
                        {question.industry}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary">
                        {question.position}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyClass(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <i className={`fas fa-bookmark ${question.isFavorited ? 'text-tertiary' : 'text-gray-300'}`}></i>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => previewQuestion(question.id)}
                          className="text-primary hover:text-blue-700"
                        >
                          <i className="fas fa-eye mr-1"></i>预览
                        </button>
                        <button 
                          onClick={() => toggleFavorite(question.id)}
                          className={`text-text-secondary hover:text-tertiary ${styles.favoriteBtn}`}
                        >
                          <i className="fas fa-bookmark mr-1"></i>{question.isFavorited ? '取消收藏' : '收藏'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 分页区域 */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">
                  显示第 <span>{startItem}</span> - <span>{endItem}</span> 条，共 <span>{currentQuestions.length}</span> 条
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="flex items-center space-x-1">
                  {generatePageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm border rounded ${
                        page === currentPage 
                          ? 'bg-primary text-white border-primary' 
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-text-secondary">跳转到</span>
                  <input 
                    type="number" 
                    min="1" 
                    max={totalPages}
                    defaultValue={currentPage}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= totalPages) {
                        setCurrentPage(value);
                      }
                    }}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                  />
                  <button 
                    onClick={() => {
                      const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                      if (input) {
                        const value = parseInt(input.value);
                        if (value >= 1 && value <= totalPages) {
                          setCurrentPage(value);
                        }
                      }
                    }}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                  >
                    跳转
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 题目详情模态弹窗 */}
      {isQuestionModalVisible && selectedQuestion && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">{selectedQuestion.title}</h3>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <i className="fas fa-times text-gray-400"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">题目描述</h4>
                  <p className="text-text-secondary">{selectedQuestion.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{selectedQuestion.industry}</span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{selectedQuestion.position}</span>
                  <span className={`px-2 py-1 text-xs ${getDifficultyClass(selectedQuestion.difficulty)}`}>{selectedQuestion.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBankPage;

