

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';
import { QuestionData, MockQuestions } from './types';

const QuestionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);

  // 模拟题目数据
  const mockQuestions: MockQuestions = {
    'q1': {
      title: '请介绍一下你的项目经验',
      description: '请详细介绍你参与过的一个重要项目，包括项目背景、你的角色、遇到的挑战、使用的技术栈以及最终的成果。',
      industry: '互联网',
      position: '产品经理',
      difficulty: '中级',
      time: '5-8分钟'
    },
    'q2': {
      title: '你最大的优点和缺点是什么？',
      description: '请结合具体事例，谈谈你认为自己最大的优点和需要改进的地方。',
      industry: '通用',
      position: '通用',
      difficulty: '初级',
      time: '3-5分钟'
    },
    'q3': {
      title: '为什么选择我们公司？',
      description: '请谈谈你对我们公司的了解，以及为什么希望加入我们。',
      industry: '互联网',
      position: '产品经理',
      difficulty: '中级',
      time: '4-6分钟'
    },
    'q4': {
      title: '描述一次你成功解决冲突的经历',
      description: '请分享一个你在工作中成功处理团队或项目冲突的具体案例。',
      industry: '通用',
      position: '产品经理',
      difficulty: '中级',
      time: '4-7分钟'
    },
    'q5': {
      title: '你对未来3-5年的职业规划是什么？',
      description: '请谈谈你对自己未来职业发展的规划和期望。',
      industry: '通用',
      position: '通用',
      difficulty: '中级',
      time: '3-5分钟'
    }
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 题目详情';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 加载题目数据
  useEffect(() => {
    const questionId = searchParams.get('questionId') || 'q1';
    const question = mockQuestions[questionId];
    if (question) {
      setCurrentQuestion(question);
    }
  }, [searchParams]);

  // 处理侧边栏切换
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 处理收藏按钮点击
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  // 处理答案展开/收起
  const handleAnswerToggle = () => {
    setIsAnswerExpanded(!isAnswerExpanded);
  };

  // 处理相关题目点击
  const handleRelatedQuestionClick = (questionId: string) => {
    navigate(`/question-detail?questionId=${questionId}`);
  };

  // 处理全局搜索
  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = (e.target as HTMLInputElement).value.trim();
      if (searchTerm) {
        navigate(`/question-bank?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  // 获取难度样式类名
  const getDifficultyClassName = (difficulty: string) => {
    switch (difficulty) {
      case '初级':
        return styles.difficultyBeginner;
      case '中级':
        return styles.difficultyIntermediate;
      case '高级':
        return styles.difficultyAdvanced;
      default:
        return styles.difficultyIntermediate;
    }
  };

  if (!currentQuestion) {
    return <div>题目不存在</div>;
  }

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
                onKeyPress={handleGlobalSearch}
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
                src="https://s.coze.cn/image/QDL0igSXTwQ/" 
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
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-border-light transition-all duration-300 z-40 ${
        isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}>
        <nav className="p-4 space-y-2">
          <Link to="/home" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-home w-5"></i>
            {!isSidebarCollapsed && <span>首页</span>}
          </Link>
          <Link to="/question-bank" className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}>
            <i className="fas fa-book w-5"></i>
            {!isSidebarCollapsed && <span>题库</span>}
          </Link>
          <Link to="/interview-create" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-video w-5"></i>
            {!isSidebarCollapsed && <span>模拟面试</span>}
          </Link>
          <Link to="/interview-history" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
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
      <main className={`pt-16 min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded
      }`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">{currentQuestion.title}</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <span className="mx-2">/</span>
                  <Link to="/question-bank" className="hover:text-primary">题库</Link>
                  <span className="mx-2">/</span>
                  <span>{currentQuestion.title}</span>
                </nav>
              </div>
              <button 
                onClick={handleFavoriteToggle}
                className={`${styles.favoriteBtn} p-3 rounded-lg hover:bg-gray-100`}
              >
                <i className={`fas fa-bookmark text-xl ${isFavorited ? `${styles.favoriteBtnActive}` : 'text-text-secondary'}`}></i>
              </button>
            </div>
          </div>

          {/* 题目信息区 */}
          <section className="bg-white rounded-xl shadow-card p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-4">问题描述</h3>
                <div className="prose max-w-none text-text-primary leading-relaxed">
                  <p>{currentQuestion.description}</p>
                  <p className="mt-3">请重点说明：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>项目的业务价值和技术难点</li>
                    <li>你在项目中承担的具体职责</li>
                    <li>如何解决项目中遇到的关键问题</li>
                    <li>项目的最终成果和个人收获</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <i className="fas fa-building mr-1"></i>
                <span>{currentQuestion.industry}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <i className="fas fa-briefcase mr-1"></i>
                <span>{currentQuestion.position}</span>
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyClassName(currentQuestion.difficulty)}`}>
                <i className="fas fa-signal mr-1"></i>
                <span>{currentQuestion.difficulty}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                <i className="fas fa-clock mr-1"></i>
                <span>建议回答时间：{currentQuestion.time}</span>
              </span>
            </div>
          </section>

          {/* 参考答案/思路区 */}
          <section className="bg-white rounded-xl shadow-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">参考答案与思路</h3>
              <button 
                onClick={handleAnswerToggle}
                className={`${styles.answerToggle} flex items-center space-x-1 text-primary hover:text-blue-700`}
              >
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isAnswerExpanded ? 'rotate-180' : ''}`}></i>
                <span>{isAnswerExpanded ? '收起' : '展开'}</span>
              </button>
            </div>
            
            <div className={`${styles.answerContent} ${isAnswerExpanded ? styles.answerContentExpanded : ''}`}>
              <div className="prose max-w-none text-text-primary leading-relaxed">
                <h4 className="text-md font-semibold text-text-primary mb-3">回答思路</h4>
                <p className="mb-4">建议使用STAR法则来组织你的回答：</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-text-primary mb-2">STAR法则</h5>
                  <ul className="space-y-2">
                    <li><strong>S (Situation):</strong> 简要描述项目背景和业务需求</li>
                    <li><strong>T (Task):</strong> 明确你的任务和目标</li>
                    <li><strong>A (Action):</strong> 详细说明你采取的行动和解决方案</li>
                    <li><strong>R (Result):</strong> 量化项目成果和个人收获</li>
                  </ul>
                </div>
                
                <h4 className="text-md font-semibold text-text-primary mb-3">参考回答框架</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h5 className="font-semibold text-text-primary">项目背景</h5>
                    <p>我参与的是一个面向中小企业的SaaS平台开发项目，主要解决企业数字化转型中的数据管理问题...</p>
                  </div>
                  
                  <div className="border-l-4 border-secondary pl-4">
                    <h5 className="font-semibold text-text-primary">我的角色</h5>
                    <p>作为产品经理，我负责需求分析、产品规划、团队协调和项目管理等工作...</p>
                  </div>
                  
                  <div className="border-l-4 border-tertiary pl-4">
                    <h5 className="font-semibold text-text-primary">技术挑战</h5>
                    <p>项目中遇到的主要挑战是如何平衡功能完整性和用户体验，我们通过...</p>
                  </div>
                  
                  <div className="border-l-4 border-info pl-4">
                    <h5 className="font-semibold text-text-primary">项目成果</h5>
                    <p>最终产品上线后，获得了客户的高度认可，用户满意度达到95%，项目按时交付...</p>
                  </div>
                </div>
                
                <h4 className="text-md font-semibold text-text-primary mb-3 mt-6">注意事项</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>避免过于技术化的描述，重点突出业务价值</li>
                  <li>用具体的数据和案例来支撑你的描述</li>
                  <li>展示你的团队协作能力和解决问题的思路</li>
                  <li>保持回答的逻辑性和条理性</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 相关题目推荐区 */}
          <section className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">相关题目推荐</h3>
            <div className="space-y-3">
              <div 
                onClick={() => handleRelatedQuestionClick('q2')}
                className="border border-border-light rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-2">你最大的优点和缺点是什么？</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">通用</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.difficultyBeginner}`}>初级</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400 mt-2"></i>
                </div>
              </div>
              
              <div 
                onClick={() => handleRelatedQuestionClick('q3')}
                className="border border-border-light rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-2">为什么选择我们公司？</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">互联网</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.difficultyIntermediate}`}>中级</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400 mt-2"></i>
                </div>
              </div>
              
              <div 
                onClick={() => handleRelatedQuestionClick('q4')}
                className="border border-border-light rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-2">描述一次你成功解决冲突的经历</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">产品经理</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.difficultyIntermediate}`}>中级</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400 mt-2"></i>
                </div>
              </div>
              
              <div 
                onClick={() => handleRelatedQuestionClick('q5')}
                className="border border-border-light rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-2">你对未来3-5年的职业规划是什么？</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">通用</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.difficultyIntermediate}`}>中级</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400 mt-2"></i>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetailPage;

