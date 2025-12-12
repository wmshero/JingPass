

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface InterviewRecord {
  id: string;
  date: string;
  duration: string;
  questions: number;
  selfEvaluation: 'evaluated' | 'pending' | 'interrupted';
  aiFeedback: 'evaluated' | 'pending';
}

const InterviewHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [evaluationFilter, setEvaluationFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 模拟数据
  const [interviewRecords] = useState<InterviewRecord[]>([
    { id: 'interview-001', date: '2024-01-15 14:30', duration: '30分钟', questions: 8, selfEvaluation: 'evaluated', aiFeedback: 'evaluated' },
    { id: 'interview-002', date: '2024-01-14 16:45', duration: '25分钟', questions: 6, selfEvaluation: 'pending', aiFeedback: 'evaluated' },
    { id: 'interview-003', date: '2024-01-13 09:20', duration: '40分钟', questions: 10, selfEvaluation: 'evaluated', aiFeedback: 'evaluated' },
    { id: 'interview-004', date: '2024-01-12 11:15', duration: '15分钟', questions: 4, selfEvaluation: 'pending', aiFeedback: 'evaluated' },
    { id: 'interview-005', date: '2024-01-11 15:30', duration: '20分钟', questions: 5, selfEvaluation: 'evaluated', aiFeedback: 'evaluated' },
    { id: 'interview-006', date: '2024-01-10 10:00', duration: '10分钟', questions: 3, selfEvaluation: 'pending', aiFeedback: 'pending' },
    { id: 'interview-007', date: '2024-01-09 13:20', duration: '5分钟', questions: 2, selfEvaluation: 'pending', aiFeedback: 'pending' },
    { id: 'interview-008', date: '2024-01-08 16:10', duration: '25分钟', questions: 7, selfEvaluation: 'evaluated', aiFeedback: 'evaluated' },
    { id: 'interview-009', date: '2024-01-07 11:45', duration: '35分钟', questions: 9, selfEvaluation: 'evaluated', aiFeedback: 'evaluated' },
    { id: 'interview-010', date: '2024-01-06 14:20', duration: '18分钟', questions: 4, selfEvaluation: 'pending', aiFeedback: 'evaluated' },
  ]);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 面试历史';
    return () => { document.title = originalTitle; };
  }, []);

  // 筛选逻辑
  const filteredRecords = interviewRecords.filter(record => {
    const matchesSearch = record.date.toLowerCase().includes(historySearchTerm.toLowerCase());
    const matchesStatus = !statusFilter || 
      (statusFilter === 'completed' && (record.selfEvaluation === 'evaluated' || record.selfEvaluation === 'pending')) ||
      (statusFilter === 'interrupted' && record.selfEvaluation === 'interrupted');
    const matchesEvaluation = !evaluationFilter || 
      (evaluationFilter === 'evaluated' && record.selfEvaluation === 'evaluated') ||
      (evaluationFilter === 'pending' && record.selfEvaluation === 'pending');
    
    return matchesSearch && matchesStatus && matchesEvaluation;
  });

  // 排序逻辑
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    switch (sortFilter) {
      case 'date-asc':
        return a.date.localeCompare(b.date);
      case 'date-desc':
        return b.date.localeCompare(a.date);
      case 'duration-asc':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'duration-desc':
        return parseInt(b.duration) - parseInt(a.duration);
      case 'questions-asc':
        return a.questions - b.questions;
      case 'questions-desc':
        return b.questions - a.questions;
      default:
        return 0;
    }
  });

  // 分页逻辑
  const totalPages = Math.ceil(sortedRecords.length / pageSize);
  const paginatedRecords = sortedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleViewDetail = (interviewId: string) => {
    navigate(`/interview-evaluation?interviewId=${interviewId}`);
  };

  const handleSort = (field: string) => {
    const newSort = sortFilter.startsWith(field) && sortFilter.endsWith('desc') 
      ? `${field}-asc` 
      : `${field}-desc`;
    setSortFilter(newSort);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'interrupted':
        return styles.statusInterrupted;
      case 'evaluated':
        return styles.statusEvaluated;
      case 'pending':
        return styles.statusPending;
      default:
        return styles.statusPending;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'interrupted':
        return '已中断';
      case 'evaluated':
        return '已自评';
      case 'pending':
        return '未自评';
      default:
        return '未自评';
    }
  };

  const getAiFeedbackText = (status: string) => {
    switch (status) {
      case 'evaluated':
        return '已生成';
      case 'pending':
        return '处理中';
      default:
        return '未生成';
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
            <Link to="/user-profile" className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <img 
                src="https://s.coze.cn/image/UeMB6iYkwgE/" 
                alt="用户头像" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-text-primary hidden md:block">张同学</span>
              <i className="fas fa-chevron-down text-xs text-gray-400 hidden md:block"></i>
            </Link>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-border-light transition-all duration-300 z-40 ${isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
        <nav className="p-4 space-y-2">
          <Link to="/home" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-home w-5"></i>
            {!isSidebarCollapsed && <span>首页</span>}
          </Link>
          <Link to="/question-bank" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-book w-5"></i>
            {!isSidebarCollapsed && <span>题库</span>}
          </Link>
          <Link to="/interview-create" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-video w-5"></i>
            {!isSidebarCollapsed && <span>模拟面试</span>}
          </Link>
          <Link to="/interview-history" className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}>
            <i className="fas fa-history w-5"></i>
            {!isSidebarCollapsed && <span>历史记录</span>}
          </Link>
          <Link to="/learning-center" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-graduation-cap w-5"></i>
            {!isSidebarCollapsed && <span>学习中心</span>}
          </Link>
          <Link to="/user-profile" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-user w-5"></i>
            {!isSidebarCollapsed && <span>个人中心</span>}
          </Link>
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded}`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">面试历史</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>历史记录</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 工具栏区域 */}
          <section className="bg-white rounded-xl shadow-card p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* 搜索框 */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input 
                    type="text" 
                    value={historySearchTerm}
                    onChange={(e) => setHistorySearchTerm(e.target.value)}
                    placeholder="搜索面试日期、题目关键词..." 
                    className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg ${styles.searchInput}`}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              
              {/* 筛选器 */}
              <div className="flex flex-wrap items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="status-filter" className="text-sm font-medium text-text-secondary">面试状态：</label>
                  <select 
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="">全部</option>
                    <option value="completed">已完成</option>
                    <option value="interrupted">已中断</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="evaluation-filter" className="text-sm font-medium text-text-secondary">自评状态：</label>
                  <select 
                    id="evaluation-filter"
                    value={evaluationFilter}
                    onChange={(e) => setEvaluationFilter(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="">全部</option>
                    <option value="evaluated">已自评</option>
                    <option value="pending">未自评</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-filter" className="text-sm font-medium text-text-secondary">排序：</label>
                  <select 
                    id="sort-filter"
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${styles.filterSelect}`}
                  >
                    <option value="date-desc">按日期倒序</option>
                    <option value="date-asc">按日期正序</option>
                    <option value="duration-desc">按时长倒序</option>
                    <option value="duration-asc">按时长正序</option>
                    <option value="questions-desc">按题目数量倒序</option>
                    <option value="questions-asc">按题目数量正序</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* 数据展示区域 */}
          <section className="bg-white rounded-xl shadow-card overflow-hidden">
            {/* 表格头部 */}
            <div className="px-6 py-4 border-b border-border-light">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">面试记录</h3>
                <div className="text-sm text-text-secondary">
                  共 <span className="font-medium text-primary">{filteredRecords.length}</span> 条记录
                </div>
              </div>
            </div>
            
            {/* 表格内容 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                      onClick={() => handleSort('date')}
                    >
                      面试日期
                      <i className="fas fa-sort ml-1"></i>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                      onClick={() => handleSort('duration')}
                    >
                      时长
                      <i className="fas fa-sort ml-1"></i>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-primary"
                      onClick={() => handleSort('questions')}
                    >
                      题目数量
                      <i className="fas fa-sort ml-1"></i>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">自评状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">AI反馈状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedRecords.map((record) => (
                    <tr key={record.id} className={styles.tableRow}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {record.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {record.questions}题
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(record.selfEvaluation)}`}>
                          {getStatusText(record.selfEvaluation)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(record.aiFeedback)}`}>
                          {getAiFeedbackText(record.aiFeedback)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetail(record.id)}
                          className="text-primary hover:text-blue-700 mr-3"
                        >
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 分页区域 */}
            <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">
                  每页显示
                </span>
                <select 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1 border border-gray-300 rounded ${styles.filterSelect}`}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-text-secondary">
                  条，共 <span>{totalPages}</span> 页
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <span 
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1 
                        ? 'bg-primary text-white' 
                        : 'border border-gray-300 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    {index + 1}
                  </span>
                ))}
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default InterviewHistoryPage;

