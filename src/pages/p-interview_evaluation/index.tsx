

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface EvaluationScores {
  expression: number;
  logic: number;
  knowledge: number;
  response: number;
}

const InterviewEvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [evaluationScores, setEvaluationScores] = useState<EvaluationScores>({
    expression: 4.5,
    logic: 4.0,
    knowledge: 4.8,
    response: 3.8
  });
  const [selfComment, setSelfComment] = useState('整体表现不错，表达流畅，专业知识掌握扎实。但在应变能力方面还有提升空间，需要加强对突发问题的应对训练。');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 面试评估';
    return () => { document.title = originalTitle; };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStarClick = (dimension: keyof EvaluationScores, rating: number) => {
    const score = rating;
    setEvaluationScores(prev => ({
      ...prev,
      [dimension]: score
    }));
  };

  const handleStarHover = (event: React.MouseEvent<HTMLElement>, dimension: keyof EvaluationScores, rating: number, isEnter: boolean) => {
    const stars = event.currentTarget.parentElement?.querySelectorAll('.star');
    if (stars) {
      stars.forEach((star, index) => {
        const starElement = star as HTMLElement;
        if (isEnter) {
          if (index <= rating - 1) {
            starElement.style.color = '#F59E0B';
          } else if (!starElement.classList.contains('active')) {
            starElement.style.color = '#D1D5DB';
          }
        } else {
          if (starElement.classList.contains('active')) {
            starElement.style.color = '#F59E0B';
          } else {
            starElement.style.color = '#D1D5DB';
          }
        }
      });
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
  };

  const handleShareFeedback = () => {
    alert('分享功能正在开发中，敬请期待！');
  };

  const handleBackToHistory = () => {
    navigate(-1);
  };

  const calculateOverallScore = () => {
    const scores = Object.values(evaluationScores);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return average.toFixed(1);
  };

  const renderStars = (dimension: keyof EvaluationScores, currentScore: number) => {
    return (
      <div className={styles.starRating} onMouseLeave={(e) => handleStarHover(e, dimension, 0, false)}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <i
            key={rating}
            className={`fas fa-star star ${rating <= currentScore ? 'active' : ''}`}
            onClick={() => handleStarClick(dimension, rating)}
            onMouseEnter={(e) => handleStarHover(e, dimension, rating, true)}
          />
        ))}
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
                src="https://s.coze.cn/image/tRermGecVf0/" 
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">面试评估</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <span className="mx-2">{'>'}</span>
                  <Link to="/interview-history" className="hover:text-primary">历史记录</Link>
                  <span className="mx-2">{'>'}</span>
                  <span>面试评估</span>
                </nav>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleShareFeedback}
                  className="px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <i className="fas fa-share-alt mr-2"></i>分享反馈
                </button>
                <button 
                  onClick={handleBackToHistory}
                  className="px-4 py-2 border border-gray-300 text-text-primary rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>返回历史
                </button>
              </div>
            </div>
          </div>

          {/* 面试基本信息 */}
          <section className="mb-8">
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-text-secondary mb-1">面试日期</p>
                  <p className="text-lg font-semibold text-text-primary">2024年1月15日 14:30</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-secondary mb-1">面试时长</p>
                  <p className="text-lg font-semibold text-text-primary">25分钟</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-secondary mb-1">题目数量</p>
                  <p className="text-lg font-semibold text-text-primary">8题</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-secondary mb-1">综合评分</p>
                  <p className="text-lg font-semibold text-primary">{calculateOverallScore()}分</p>
                </div>
              </div>
            </div>
          </section>

          {/* 视频回放区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">面试回放</h3>
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className={styles.videoContainer}>
                <video className={styles.videoPlayer} controls>
                  <source src="https://s.coze.cn/video/interview_sample.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-text-secondary">点击播放按钮观看您的面试回放</p>
              </div>
            </div>
          </section>

          {/* 自评区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">自我评价</h3>
            <div className="bg-white rounded-xl shadow-card p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* 表达能力 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-text-primary">表达能力</label>
                    <span className="text-sm font-semibold text-primary">{evaluationScores.expression}分</span>
                  </div>
                  {renderStars('expression', evaluationScores.expression)}
                </div>

                {/* 逻辑思维 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-text-primary">逻辑思维</label>
                    <span className="text-sm font-semibold text-primary">{evaluationScores.logic}分</span>
                  </div>
                  {renderStars('logic', evaluationScores.logic)}
                </div>

                {/* 专业知识 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-text-primary">专业知识</label>
                    <span className="text-sm font-semibold text-primary">{evaluationScores.knowledge}分</span>
                  </div>
                  {renderStars('knowledge', evaluationScores.knowledge)}
                </div>

                {/* 应变能力 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-text-primary">应变能力</label>
                    <span className="text-sm font-semibold text-primary">{evaluationScores.response}分</span>
                  </div>
                  {renderStars('response', evaluationScores.response)}
                </div>

                {/* 自评文字 */}
                <div>
                  <label htmlFor="self-comment" className="block text-sm font-medium text-text-primary mb-3">自我评价</label>
                  <textarea 
                    id="self-comment" 
                    name="self-comment" 
                    rows={4} 
                    value={selfComment}
                    onChange={(e) => setSelfComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请描述您对本次面试的感受和需要改进的地方..."
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>保存中...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>保存自评
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* AI分析反馈区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">AI分析反馈</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 关键词提取 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-tags text-primary mr-2"></i>
                  关键词分析
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">团队合作</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-xs text-text-secondary">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">项目管理</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="text-xs text-text-secondary">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">技术能力</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-tertiary h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <span className="text-xs text-text-secondary">90%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">沟通技巧</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-info h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-xs text-text-secondary">78%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 语速分析 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-microphone text-secondary mr-2"></i>
                  语速分析
                </h4>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-text-secondary mb-1">平均语速</p>
                    <p className="text-2xl font-bold text-text-primary">125字/分钟</p>
                    <p className="text-xs text-secondary">正常范围：100-150字/分钟</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-text-primary mb-2">语速波动</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">开始阶段</span>
                        <span className="text-xs font-medium text-text-primary">110字/分钟</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">中间阶段</span>
                        <span className="text-xs font-medium text-text-primary">135字/分钟</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">结束阶段</span>
                        <span className="text-xs font-medium text-text-primary">120字/分钟</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 情绪分析 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-heart text-danger mr-2"></i>
                  情绪分析
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">自信度</p>
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                          <path className="text-primary" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-text-primary">85%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">紧张度</p>
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                          <path className="text-secondary" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="25, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-text-primary">25%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">积极性</p>
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                          <path className="text-tertiary" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-text-primary">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI建议 */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <i className="fas fa-lightbulb text-tertiary mr-2"></i>
                  AI改进建议
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-comment text-primary text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">表达流畅度</p>
                      <p className="text-xs text-text-secondary mt-1">建议在回答时适当放慢语速，增加停顿，让表达更加从容自然。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-brain text-secondary text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">逻辑结构</p>
                      <p className="text-xs text-text-secondary mt-1">回答问题时可以采用总分总的结构，先给出结论，再展开说明。</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-tertiary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-clock text-tertiary text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">时间控制</p>
                      <p className="text-xs text-text-secondary mt-1">建议合理分配每题的回答时间，避免在某个问题上花费过多时间。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 综合报告区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">综合评估报告</h3>
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 优势分析 */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                    <i className="fas fa-thumbs-up text-secondary mr-2"></i>
                    主要优势
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">专业知识掌握扎实</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">表达清晰有条理</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">自信度高，表现从容</span>
                    </div>
                  </div>
                </div>

                {/* 待改进 */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                    <i className="fas fa-exclamation-triangle text-tertiary mr-2"></i>
                    待改进
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-tertiary rounded-full"></div>
                      <span className="text-sm text-text-secondary">应变能力需要提升</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-tertiary rounded-full"></div>
                      <span className="text-sm text-text-secondary">语速控制需要加强</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-tertiary rounded-full"></div>
                      <span className="text-sm text-text-secondary">时间分配需要优化</span>
                    </div>
                  </div>
                </div>

                {/* 总体评价 */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                    <i className="fas fa-star text-primary mr-2"></i>
                    总体评价
                  </h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{calculateOverallScore()}</div>
                    <div className="text-sm text-text-secondary mb-3">优秀</div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-xs text-text-secondary">
                        本次面试表现优秀，专业能力突出，表达流畅。建议在应变能力和时间控制方面进行针对性训练，有望在真实面试中取得更好成绩。
                      </p>
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

export default InterviewEvaluationPage;

