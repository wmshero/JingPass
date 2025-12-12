

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface PositionOption {
  value: string;
  text: string;
}

interface PositionOptions {
  [key: string]: PositionOption[];
}

interface InterviewConfig {
  scope: string;
  industry: string;
  position: string;
  difficulties: string[];
  duration: number;
  questionCount: number;
}

const InterviewCreatePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 侧边栏状态
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // 表单状态
  const [selectedQuestionScope, setSelectedQuestionScope] = useState('industry');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [interviewDuration, setInterviewDuration] = useState('30');
  const [questionCount, setQuestionCount] = useState('10');
  
  // 设备测试状态
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMicTesting, setIsMicTesting] = useState(false);
  
  // 媒体流引用
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  
  // 岗位选项数据
  const positionOptions: PositionOptions = {
    'tech': [
      { value: 'frontend', text: '前端开发' },
      { value: 'backend', text: '后端开发' },
      { value: 'fullstack', text: '全栈开发' },
      { value: 'product', text: '产品经理' },
      { value: 'ui-ux', text: 'UI/UX设计师' }
    ],
    'finance': [
      { value: 'investment', text: '投资顾问' },
      { value: 'risk', text: '风险管理' },
      { value: 'accounting', text: '会计' },
      { value: 'banking', text: '银行柜员' }
    ],
    'education': [
      { value: 'teacher', text: '教师' },
      { value: 'education-consultant', text: '教育顾问' },
      { value: 'training', text: '培训师' }
    ],
    'healthcare': [
      { value: 'doctor', text: '医生' },
      { value: 'nurse', text: '护士' },
      { value: 'medical-rep', text: '医药代表' }
    ],
    'consulting': [
      { value: 'management-consultant', text: '管理咨询' },
      { value: 'it-consultant', text: 'IT咨询' },
      { value: 'strategy', text: '战略咨询' }
    ]
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 创建模拟面试';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 清理媒体流
  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
        cameraStreamRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
    };
  }, []);

  // 侧边栏切换
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 题目范围选择
  const handleQuestionScopeChange = (value: string) => {
    setSelectedQuestionScope(value);
    if (value !== 'industry') {
      setSelectedIndustry('');
      setSelectedPosition('');
    }
  };

  // 行业选择变化
  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setSelectedPosition('');
  };

  // 难度选择切换
  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties(prev => {
      if (prev.includes(difficulty)) {
        return prev.filter(d => d !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
  };

  // 摄像头测试
  const handleCameraTest = async () => {
    if (isCameraActive) {
      // 停止摄像头
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
        cameraStreamRef.current = null;
      }
      setIsCameraActive(false);
    } else {
      // 启动摄像头
      try {
        console.log('需要调用第三方接口实现摄像头访问功能');
        // 注释：此功能需要调用设备摄像头API，在原型阶段仅做UI展示
        
        // 模拟成功状态
        setIsCameraActive(true);
        
        // 实际项目中，这里会调用 navigator.mediaDevices.getUserMedia
        // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // cameraStreamRef.current = stream;
        // setIsCameraActive(true);
      } catch (error) {
        console.error('摄像头访问失败:', error);
        alert('摄像头访问失败，请检查权限设置');
      }
    }
  };

  // 麦克风测试
  const handleMicTest = async () => {
    if (isMicTesting) {
      // 停止麦克风测试
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      setIsMicTesting(false);
    } else {
      // 开始麦克风测试
      try {
        console.log('需要调用第三方接口实现麦克风访问功能');
        // 注释：此功能需要调用设备麦克风API，在原型阶段仅做UI展示
        
        // 模拟成功状态
        setIsMicTesting(true);
        
        // 实际项目中，这里会调用 navigator.mediaDevices.getUserMedia
        // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // micStreamRef.current = stream;
        // setIsMicTesting(true);
      } catch (error) {
        console.error('麦克风访问失败:', error);
        alert('麦克风访问失败，请检查权限设置');
      }
    }
  };

  // 表单提交
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填项
    if (selectedQuestionScope === 'industry' && (!selectedIndustry || !selectedPosition)) {
      alert('请选择行业和岗位');
      return;
    }
    
    if (selectedDifficulties.length === 0) {
      alert('请至少选择一个难度级别');
      return;
    }
    
    // 构建面试配置
    const interviewConfig: InterviewConfig = {
      scope: selectedQuestionScope,
      industry: selectedIndustry,
      position: selectedPosition,
      difficulties: selectedDifficulties,
      duration: parseInt(interviewDuration),
      questionCount: parseInt(questionCount)
    };
    
    // 跳转到模拟面试页面
    const configParam = encodeURIComponent(JSON.stringify(interviewConfig));
    navigate(`/interview-simulation?config=${configParam}`);
  };

  // 取消按钮
  const handleCancel = () => {
    if (confirm('确定要取消创建面试吗？')) {
      navigate('/home');
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
                src="https://s.coze.cn/image/sch_S4GCsY8/" 
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
          <Link to="/question-bank" className={`${styles.navItem} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary`}>
            <i className="fas fa-book w-5"></i>
            {!isSidebarCollapsed && <span>题库</span>}
          </Link>
          <Link to="/interview-create" className={`${styles.navItem} ${styles.navItemActive} flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium`}>
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">创建模拟面试</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-primary">首页</Link>
                  <span className="mx-2">/</span>
                  <span>模拟面试</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 配置表单区 */}
          <div className="bg-white rounded-xl shadow-card p-6 mb-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* 题目范围选择 */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-text-primary">题目范围</label>
                <div className="space-y-3">
                  <div 
                    className={`${styles.radioOption} border border-gray-200 rounded-lg p-4 cursor-pointer ${
                      selectedQuestionScope === 'industry' ? styles.selected : ''
                    }`}
                    onClick={() => handleQuestionScopeChange('industry')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {selectedQuestionScope === 'industry' && (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">按行业/岗位</h4>
                        <p className="text-sm text-text-secondary">选择特定行业和岗位的题目</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`${styles.radioOption} border border-gray-200 rounded-lg p-4 cursor-pointer ${
                      selectedQuestionScope === 'favorite' ? styles.selected : ''
                    }`}
                    onClick={() => handleQuestionScopeChange('favorite')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {selectedQuestionScope === 'favorite' && (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">我的收藏</h4>
                        <p className="text-sm text-text-secondary">使用收藏夹中的题目</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`${styles.radioOption} border border-gray-200 rounded-lg p-4 cursor-pointer ${
                      selectedQuestionScope === 'custom' ? styles.selected : ''
                    }`}
                    onClick={() => handleQuestionScopeChange('custom')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {selectedQuestionScope === 'custom' && (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">自定义题目</h4>
                        <p className="text-sm text-text-secondary">手动选择题目</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 行业/岗位选择 */}
              {selectedQuestionScope === 'industry' && (
                <>
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-text-primary">行业选择</label>
                    <select 
                      value={selectedIndustry}
                      onChange={(e) => handleIndustryChange(e.target.value)}
                      className={`w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                    >
                      <option value="">请选择行业</option>
                      <option value="tech">互联网</option>
                      <option value="finance">金融</option>
                      <option value="education">教育</option>
                      <option value="healthcare">医疗健康</option>
                      <option value="consulting">咨询</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-text-primary">岗位选择</label>
                    <select 
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className={`w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                    >
                      {!selectedIndustry ? (
                        <option value="">请先选择行业</option>
                      ) : (
                        <>
                          <option value="">请选择岗位</option>
                          {positionOptions[selectedIndustry]?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </>
              )}

              {/* 难度选择 */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-text-primary">难度选择</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'easy', label: '初级' },
                    { value: 'medium', label: '中级' },
                    { value: 'hard', label: '高级' }
                  ].map((difficulty) => (
                    <button 
                      key={difficulty.value}
                      type="button" 
                      onClick={() => handleDifficultyToggle(difficulty.value)}
                      className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                        selectedDifficulties.includes(difficulty.value)
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-star text-tertiary mr-1"></i>
                      {difficulty.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 面试设置 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label htmlFor="interview-duration" className="block text-sm font-semibold text-text-primary">面试时长</label>
                  <select 
                    id="interview-duration"
                    value={interviewDuration}
                    onChange={(e) => setInterviewDuration(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="15">15分钟</option>
                    <option value="30">30分钟</option>
                    <option value="45">45分钟</option>
                    <option value="60">60分钟</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label htmlFor="question-count" className="block text-sm font-semibold text-text-primary">题目数量</label>
                  <select 
                    id="question-count"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${styles.formInput}`}
                  >
                    <option value="5">5题</option>
                    <option value="10">10题</option>
                    <option value="15">15题</option>
                    <option value="20">20题</option>
                  </select>
                </div>
              </div>

              {/* 设备测试 */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-text-primary">设备测试</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-text-primary">摄像头测试</h4>
                    <div className={`${styles.cameraPreview} ${isCameraActive ? 'active' : ''}`}>
                      {!isCameraActive ? (
                        <div className="text-center">
                          <i className="fas fa-video text-2xl mb-2"></i>
                          <p>点击开始测试</p>
                        </div>
                      ) : (
                        <video></video>
                      )}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleCameraTest}
                      className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <i className={`fas ${isCameraActive ? 'fa-stop' : 'fa-video'} mr-2`}></i>
                      {isCameraActive ? '关闭摄像头' : '测试摄像头'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-text-primary">麦克风测试</h4>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      {!isMicTesting ? (
                        <>
                          <i className="fas fa-microphone text-2xl text-gray-400 mb-2"></i>
                          <p className="text-sm text-text-secondary">点击开始测试</p>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-microphone text-2xl text-secondary mb-2"></i>
                          <p className="text-sm text-secondary">正在测试中...</p>
                          <p className="text-xs text-text-secondary mt-1">请说话测试音量</p>
                        </>
                      )}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleMicTest}
                      className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <i className={`fas ${isMicTesting ? 'fa-stop' : 'fa-microphone'} mr-2`}></i>
                      {isMicTesting ? '停止测试' : '测试麦克风'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-text-primary rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <i className="fas fa-play mr-2"></i>开始面试
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewCreatePage;

