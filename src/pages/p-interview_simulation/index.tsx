

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface InterviewConfig {
  totalQuestions: number;
  totalTime: number;
  questionTime: number;
  currentQuestionIndex: number;
  questions: string[];
}

const InterviewSimulation: React.FC = () => {
  const navigate = useNavigate();
  
  // 面试配置
  const [interviewConfig] = useState<InterviewConfig>({
    totalQuestions: 5,
    totalTime: 15 * 60, // 15分钟，单位秒
    questionTime: 3 * 60, // 每题3分钟，单位秒
    currentQuestionIndex: 0,
    questions: [
      '请介绍一下你自己，包括你的教育背景、工作经历以及为什么想要申请这个职位。',
      '描述一个你在工作中遇到的挑战，以及你是如何克服它的。',
      '你认为自己最大的优点和缺点是什么？',
      '你对我们公司有什么了解？为什么想要加入我们？',
      '你期望的薪资范围是多少？为什么？'
    ]
  });

  // 状态变量
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTotalTime, setRemainingTotalTime] = useState(interviewConfig.totalTime);
  const [remainingQuestionTime, setRemainingQuestionTime] = useState(interviewConfig.questionTime);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(true);
  const [countdownNumber, setCountdownNumber] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [videoPosition, setVideoPosition] = useState({ x: window.innerWidth - 200 - 24, y: window.innerHeight - 150 - 96 });

  // Refs
  const totalTimerRef = useRef<number | null>(null);
  const questionTimerRef = useRef<number | null>(null);
  const userMediaStreamRef = useRef<MediaStream | null>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, left: 0, top: 0 });

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 模拟面试';
    return () => { document.title = originalTitle; };
  }, []);

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 更新进度条
  const getProgress = (): number => {
    return ((currentQuestionIndex + 1) / interviewConfig.totalQuestions) * 100;
  };

  // 开始计时器
  const startTimers = () => {
    // 总计时器
    totalTimerRef.current = window.setInterval(() => {
      if (!isPaused && remainingTotalTime > 0) {
        setRemainingTotalTime(prev => {
          if (prev <= 1) {
            endInterview();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    // 题目计时器
    questionTimerRef.current = window.setInterval(() => {
      if (!isPaused && remainingQuestionTime > 0) {
        setRemainingQuestionTime(prev => {
          if (prev <= 1) {
            nextQuestion();
            return interviewConfig.questionTime;
          }
          return prev - 1;
        });
      }
    }, 1000);
  };

  // 停止计时器
  const stopTimers = () => {
    if (totalTimerRef.current) {
      clearInterval(totalTimerRef.current);
      totalTimerRef.current = null;
    }
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
  };

  // 下一题
  const nextQuestion = () => {
    if (currentQuestionIndex < interviewConfig.totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setRemainingQuestionTime(interviewConfig.questionTime);
    } else {
      endInterview();
    }
  };

  // 结束面试
  const endInterview = () => {
    stopTimers();
    setIsRecording(false);
    
    // 停止视频流
    if (userMediaStreamRef.current) {
      userMediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // 模拟保存面试数据并跳转到评估页
    const interviewId = 'interview_' + Date.now();
    console.log('面试结束，保存面试ID:', interviewId);
    
    // 跳转到评估页面
    navigate(`/interview-evaluation?interviewId=${interviewId}`);
  };

  // 开始视频录制
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
      }
      userMediaStreamRef.current = stream;
      setIsRecording(true);
      console.log('视频录制已开始');
    } catch (error) {
      console.error('获取媒体设备失败:', error);
      alert('无法访问摄像头和麦克风，请检查权限设置。');
      // 跳回创建面试页面
      navigate('/interview-create');
    }
  };

  // 拖拽视频窗口
  const setupVideoDrag = () => {
    const handleMouseDown = (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      if (videoContainerRef.current) {
        videoContainerRef.current.classList.add(styles.dragging);
      }
      
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        left: videoPosition.x,
        top: videoPosition.y
      };
      
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      let newLeft = dragStartRef.current.left + deltaX;
      let newTop = dragStartRef.current.top + deltaY;
      
      // 限制在窗口内
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 200));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - 150));
      
      setVideoPosition({ x: newLeft, y: newTop });
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (videoContainerRef.current) {
          videoContainerRef.current.classList.remove(styles.dragging);
        }
      }
    };

    useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);

    return handleMouseDown;
  };

  const handleMouseDown = setupVideoDrag();

  // 倒计时开始
  useEffect(() => {
    if (!showCountdownModal) return;

    const countdownInterval = setInterval(() => {
      setCountdownNumber(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowCountdownModal(false);
          startVideoRecording();
          startTimers();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showCountdownModal]);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isPaused && !showCountdownModal) {
        nextQuestion();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (isPaused) {
          setIsPaused(false);
          setShowPauseModal(false);
        } else {
          setIsPaused(true);
          setShowPauseModal(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, showCountdownModal]);

  // 清理资源
  useEffect(() => {
    return () => {
      stopTimers();
      if (userMediaStreamRef.current) {
        userMediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部计时器区域 */}
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm z-40 p-4">
        <div className="flex items-center justify-between">
          {/* 左侧：面试状态和进度 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-danger rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">录制中</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">题目</span>
              <span className="text-lg font-bold">{currentQuestionIndex + 1}</span>
              <span className="text-sm">/</span>
              <span className="text-lg font-bold">{interviewConfig.totalQuestions}</span>
            </div>
          </div>
          
          {/* 中间：总计时器 */}
          <div className="text-center">
            <p className="text-xs text-gray-400">总时长</p>
            <p className={`${styles.timerDisplay} text-white`}>{formatTime(remainingTotalTime)}</p>
          </div>
          
          {/* 右侧：每题计时器 */}
          <div className="text-center">
            <p className="text-xs text-gray-400">剩余时间</p>
            <p className={`${styles.timerDisplay} text-white ${remainingQuestionTime <= 30 ? styles.countdownAnimation : ''}`}>
              {formatTime(remainingQuestionTime)}
            </p>
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-primary h-2 rounded-full ${styles.progressBar}`}
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          {/* 题目显示区域 */}
          <div className="mb-8">
            <h2 className={`${styles.questionDisplay} text-white`}>
              {interviewConfig.questions[currentQuestionIndex]}
            </h2>
          </div>
          
          {/* 操作按钮区域 */}
          <div className="flex justify-center space-x-4">
            <button 
              className={styles.btnPrimary}
              onClick={nextQuestion}
            >
              <i className="fas fa-arrow-right mr-2"></i>
              下一题
            </button>
            <button 
              className={styles.btnSecondary}
              onClick={() => {
                setIsPaused(true);
                setShowPauseModal(true);
              }}
            >
              <i className="fas fa-pause mr-2"></i>
              暂停
            </button>
            <button 
              className={styles.btnDanger}
              onClick={() => setShowEndModal(true)}
            >
              <i className="fas fa-stop mr-2"></i>
              结束面试
            </button>
          </div>
        </div>
      </main>

      {/* 视频录制窗口 */}
      <div 
        ref={videoContainerRef}
        className={styles.videoContainer}
        style={{ left: `${videoPosition.x}px`, top: `${videoPosition.y}px` }}
        onMouseDown={handleMouseDown}
      >
        <video 
          ref={videoElementRef}
          className="w-full h-full object-cover" 
          autoPlay 
          muted
        ></video>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs">
          <i className="fas fa-video mr-1 text-danger"></i>
          录制中
        </div>
      </div>

      {/* 暂停弹窗 */}
      {showPauseModal && (
        <div className={styles.fullscreenOverlay}>
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-tertiary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-pause text-tertiary text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">面试已暂停</h3>
            <p className="text-text-secondary mb-6">点击继续按钮重新开始计时</p>
            <div className="flex space-x-4">
              <button 
                className={styles.btnPrimary}
                style={{ flex: 1 }}
                onClick={() => {
                  setIsPaused(false);
                  setShowPauseModal(false);
                }}
              >
                <i className="fas fa-play mr-2"></i>
                继续
              </button>
              <button 
                className={styles.btnSecondary}
                style={{ flex: 1 }}
                onClick={() => {
                  setIsPaused(false);
                  setShowPauseModal(false);
                }}
              >
                <i className="fas fa-times mr-2"></i>
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 结束确认弹窗 */}
      {showEndModal && (
        <div className={styles.fullscreenOverlay}>
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-danger bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-danger text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">确认结束面试？</h3>
            <p className="text-text-secondary mb-6">面试将立即结束，无法恢复</p>
            <div className="flex space-x-4">
              <button 
                className={styles.btnDanger}
                style={{ flex: 1 }}
                onClick={endInterview}
              >
                <i className="fas fa-stop mr-2"></i>
                确认结束
              </button>
              <button 
                className={styles.btnSecondary}
                style={{ flex: 1 }}
                onClick={() => setShowEndModal(false)}
              >
                <i className="fas fa-times mr-2"></i>
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 倒计时开始弹窗 */}
      {showCountdownModal && (
        <div className={styles.fullscreenOverlay}>
          <div className="text-center">
            <div className="w-32 h-32 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl font-bold text-primary">{countdownNumber}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">面试即将开始</h3>
            <p className="text-gray-300">请准备好回答第一个问题</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulation;

