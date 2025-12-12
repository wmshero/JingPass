

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface LearningContent {
  title: string;
  type: string;
  category: string;
  publishDate: string;
  viewCount: string;
  readTime: string;
  rating: string;
  likeCount: string;
  isVideo: boolean;
  videoUrl?: string;
  videoDuration?: string;
  content?: string;
}

const LearningDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 模拟学习内容数据
  const learningContents: Record<string, LearningContent> = {
    'content1': {
      title: '简历优化的5个关键要点',
      type: '文章',
      category: '面试技巧',
      publishDate: '2024年1月15日',
      viewCount: '1,234',
      readTime: '5分钟阅读',
      rating: '4.8 (126评价)',
      likeCount: '89',
      isVideo: false,
      content: '文章内容（已在HTML中硬编码，实际应用中应从API获取）'
    },
    'content2': {
      title: '行为面试的STAR法则详解',
      type: '文章',
      category: '面试技巧',
      publishDate: '2024年1月14日',
      viewCount: '856',
      readTime: '3分钟阅读',
      rating: '4.9 (89评价)',
      likeCount: '67',
      isVideo: false
    },
    'content3': {
      title: '如何回答"你的缺点是什么"？',
      type: '文章',
      category: '常见问题',
      publishDate: '2024年1月13日',
      viewCount: '645',
      readTime: '4分钟阅读',
      rating: '4.7 (103评价)',
      likeCount: '54',
      isVideo: false
    },
    'content4': {
      title: '自我介绍的艺术',
      type: '视频',
      category: '面试技巧',
      publishDate: '2024年1月12日',
      viewCount: '2,543',
      readTime: '8:30 分钟',
      rating: '4.6 (78评价)',
      likeCount: '92',
      isVideo: true,
      videoUrl: 'https://s.coze.cn/image/BAIRyoBaSs0/',
      videoDuration: '8:30'
    }
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 学习内容详情';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 加载内容
  useEffect(() => {
    const contentId = searchParams.get('contentId') || 'content1';
    const content = learningContents[contentId];
    if (content) {
      setCurrentContent(content);
      setLikeCount(parseInt(content.likeCount));
    }
  }, [searchParams]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLikeClick = () => {
    setLikeCount(prev => prev + 1);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: '分享学习内容',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板');
      });
    }
  };

  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = (e.target as HTMLInputElement).value.trim();
      if (searchTerm) {
        navigate(`/learning-center?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  const handleRelatedContentClick = (contentId: string) => {
    navigate(`/learning-detail?contentId=${contentId}`);
  };

  const handleVideoFullscreen = () => {
    const videoPlayer = document.querySelector('#video-player') as HTMLVideoElement;
    if (videoPlayer && videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    }
  };

  if (!currentContent) {
    return <div>加载中...</div>;
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
                onKeyPress={handleGlobalSearch}
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
                src="https://s.coze.cn/image/pHL0W10A96A/" 
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
      <main className={`pt-16 min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded
      }`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">{currentContent.title}</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <span className="mx-2">/</span>
                  <Link to="/learning-center" className="hover:text-primary">学习中心</Link>
                  <span className="mx-2">/</span>
                  <span>{currentContent.title}</span>
                </nav>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <i className="fas fa-eye text-text-secondary text-sm"></i>
                  <span className="text-sm text-text-secondary">{currentContent.viewCount} 次浏览</span>
                </div>
                <p className="text-sm text-text-secondary">{currentContent.publishDate}</p>
              </div>
            </div>
          </div>

          {/* 内容展示区 */}
          <section className="mb-8">
            <div className="bg-white rounded-xl shadow-card p-8">
              {/* 内容信息 */}
              <div className="mb-6 pb-6 border-b border-border-light">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm font-medium rounded-full">
                    {currentContent.type}
                  </span>
                  <span className="px-3 py-1 bg-secondary bg-opacity-10 text-secondary text-sm font-medium rounded-full">
                    {currentContent.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-clock text-text-secondary text-sm"></i>
                    <span className="text-sm text-text-secondary">{currentContent.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-star text-tertiary text-sm"></i>
                    <span className="text-sm text-text-secondary">{currentContent.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart text-danger text-sm"></i>
                    <span className="text-sm text-text-secondary">{likeCount} 人点赞</span>
                  </div>
                </div>
              </div>

              {/* 视频播放器（当内容类型为视频时显示） */}
              {currentContent.isVideo && (
                <div className={`${styles.videoContainer} mb-8`}>
                  <video 
                    id="video-player"
                    className={styles.videoPlayer} 
                    controls 
                    poster="https://s.coze.cn/image/Lr27p0sjWmM/"
                  >
                    <source src={currentContent.videoUrl} type="video/mp4" />
                    您的浏览器不支持视频播放。
                  </video>
                  <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-play"></i>
                        <span>{currentContent.videoDuration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-eye"></i>
                        <span>{currentContent.viewCount} 次观看</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleVideoFullscreen}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <i className="fas fa-expand"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* 文章内容 */}
              {!currentContent.isVideo && (
                <div className={styles.articleContent}>
                  <div className="mb-6">
                    <img 
                      src="https://s.coze.cn/image/uokHPj_5Fi4/" 
                      alt="简历优化文章配图" 
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg text-text-primary leading-relaxed">
                      简历是求职的第一道门槛，一份优秀的简历能够让你在众多候选人中脱颖而出。本文将为你详细介绍简历优化的5个关键要点，帮助你打造一份更具竞争力的求职简历。
                    </p>
                  </div>

                  <h2>1. 明确目标岗位</h2>
                  <p>
                    在撰写简历之前，首先要明确你所申请的岗位要求。仔细阅读招聘启事，了解企业对该岗位的技能要求、经验要求和素质要求。根据这些要求来调整你的简历内容，突出与岗位最相关的技能和经验。
                  </p>
                  
                  <blockquote>
                    "定制化的简历比通用简历的通过率高出30%以上。"
                  </blockquote>

                  <h2>2. 突出成就而非职责</h2>
                  <p>
                    很多求职者在简历中只列出了自己的工作职责，而忽略了最重要的成就。雇主更关心的是你在工作中取得了什么成果，而不是你负责什么工作。
                  </p>
                  
                  <h3>错误示例：</h3>
                  <ul>
                    <li>负责客户关系管理</li>
                    <li>参与产品开发过程</li>
                    <li>处理日常行政工作</li>
                  </ul>
                  
                  <h3>正确示例：</h3>
                  <ul>
                    <li>通过优化客户服务流程，客户满意度提升25%</li>
                    <li>主导开发新产品功能，为公司带来15%的收入增长</li>
                    <li>建立高效的行政管理制度，工作效率提升40%</li>
                  </ul>

                  <h2>3. 使用量化数据</h2>
                  <p>
                    数字是最有说服力的。在描述工作成就时，尽量使用具体的数字和数据来支撑你的说法。这不仅能让简历更具说服力，还能展示你的分析能力和结果导向思维。
                  </p>

                  <h2>4. 优化关键词</h2>
                  <p>
                    现在很多企业都使用ATS（Applicant Tracking System）系统来筛选简历。这些系统会根据关键词来匹配简历与岗位要求。因此，在简历中合理使用行业关键词和岗位相关术语非常重要。
                  </p>

                  <h2>5. 简洁明了</h2>
                  <p>
                    简历不是越长越好。一般来说，应届毕业生的简历控制在1页，有经验的求职者控制在2页以内。保持简历的简洁性，突出重点内容，避免冗长和无关信息。
                  </p>

                  <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-4 mt-6 rounded">
                    <h3 className="font-semibold text-primary mb-2">
                      <i className="fas fa-lightbulb mr-2"></i>
                      小贴士
                    </h3>
                    <p className="text-text-primary">
                      简历完成后，一定要仔细检查语法错误和排版问题。可以请朋友帮忙审阅，或者使用在线工具进行检查。一份没有错误的简历是专业素养的基本体现。
                    </p>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="mt-8 pt-6 border-t border-border-light flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleLikeClick}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-heart text-danger"></i>
                    <span>点赞</span>
                  </button>
                  <button 
                    onClick={handleBookmarkClick}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark text-tertiary`}></i>
                    <span>{isBookmarked ? '已收藏' : '收藏'}</span>
                  </button>
                  <button 
                    onClick={handleShareClick}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-share text-info"></i>
                    <span>分享</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <i className="fas fa-calendar-alt"></i>
                  <span>最后更新：2024年1月15日</span>
                </div>
              </div>
            </div>
          </section>

          {/* 相关内容推荐区 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">相关推荐</h3>
              <Link to="/learning-center" className="text-sm text-primary hover:text-blue-700">查看更多</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                className={`${styles.relatedContentItem} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
                onClick={() => handleRelatedContentClick('content2')}
              >
                <div className="flex items-start space-x-3">
                  <img 
                    src="https://s.coze.cn/image/EJnvQX-rRTE/" 
                    alt="面试技巧文章配图" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-primary bg-opacity-10 text-primary text-xs font-medium rounded-full mb-2">面试技巧</span>
                    <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">行为面试的STAR法则详解</h4>
                    <p className="text-sm text-text-secondary mb-2">学会使用STAR法则，让你的面试回答更有说服力...</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>3分钟阅读</span>
                      <span>1天前</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`${styles.relatedContentItem} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
                onClick={() => handleRelatedContentClick('content3')}
              >
                <div className="flex items-start space-x-3">
                  <img 
                    src="https://s.coze.cn/image/nnWqwm_FibE/" 
                    alt="面试技巧文章配图" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-secondary bg-opacity-10 text-secondary text-xs font-medium rounded-full mb-2">常见问题</span>
                    <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">如何回答"你的缺点是什么"？</h4>
                    <p className="text-sm text-text-secondary mb-2">掌握回答弱点问题的技巧，展现你的自我认知...</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>4分钟阅读</span>
                      <span>2天前</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`${styles.relatedContentItem} bg-white rounded-xl shadow-card p-6 cursor-pointer`}
                onClick={() => handleRelatedContentClick('content4')}
              >
                <div className="flex items-start space-x-3">
                  <img 
                    src="https://s.coze.cn/image/0pKeBlCgFd0/" 
                    alt="面试技巧视频配图" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-tertiary bg-opacity-10 text-tertiary text-xs font-medium rounded-full mb-2">
                      <i className="fas fa-play mr-1"></i>视频
                    </span>
                    <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">自我介绍的艺术</h4>
                    <p className="text-sm text-text-secondary mb-2">学会在30秒内展现你的核心优势...</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>8:30 分钟</span>
                      <span>3天前</span>
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

export default LearningDetailPage;

