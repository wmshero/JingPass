

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ValidationResult {
  valid: boolean;
  message?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单状态
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // 错误状态
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string>('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 登录';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 页面加载时检查记住密码
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedUsername = localStorage.getItem('rememberedUsername');
      const rememberMeFlag = localStorage.getItem('rememberMe');
      
      if (rememberMeFlag === 'true' && rememberedUsername) {
        setUsername(rememberedUsername);
        setRememberMe(true);
      }
    }
  }, []);

  // 验证函数
  const validateUsername = (usernameValue: string): ValidationResult => {
    if (!usernameValue.trim()) {
      return { valid: false, message: '请输入邮箱或手机号' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    if (!emailRegex.test(usernameValue) && !phoneRegex.test(usernameValue)) {
      return { valid: false, message: '请输入有效的邮箱或手机号' };
    }
    
    return { valid: true };
  };

  const validatePassword = (passwordValue: string): ValidationResult => {
    if (!passwordValue.trim()) {
      return { valid: false, message: '密码不能为空' };
    }
    
    if (passwordValue.length < 6) {
      return { valid: false, message: '密码长度至少6位' };
    }
    
    return { valid: true };
  };

  // 处理输入框变化
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError('');
    setLoginErrorMessage('');
    setLoginSuccessMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
    setLoginErrorMessage('');
    setLoginSuccessMessage('');
  };

  // 处理输入框失焦验证
  const handleUsernameBlur = () => {
    const validation = validateUsername(username);
    if (!validation.valid) {
      setUsernameError(validation.message || '');
    }
  };

  const handlePasswordBlur = () => {
    const validation = validatePassword(password);
    if (!validation.valid) {
      setPasswordError(validation.message || '');
    }
  };

  // 切换密码显示
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 清除之前的消息
    setLoginErrorMessage('');
    setLoginSuccessMessage('');
    
    // 验证输入
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    
    let hasError = false;
    
    if (!usernameValidation.valid) {
      setUsernameError(usernameValidation.message || '');
      hasError = true;
    } else {
      setUsernameError('');
    }
    
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message || '');
      hasError = true;
    } else {
      setPasswordError('');
    }
    
    if (hasError) {
      return;
    }
    
    // 显示加载状态
    setIsLoading(true);
    
    // 模拟登录请求
    setTimeout(() => {
      const loginSuccessful = true; // 模拟登录成功
      
      if (loginSuccessful) {
        // 保存记住密码状态
        if (typeof window !== 'undefined') {
          if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberMe');
          }
        }
        
        // 显示成功消息
        setLoginSuccessMessage('登录成功，正在跳转...');
        
        // 跳转到首页
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        // 显示登录失败
        setLoginErrorMessage('登录失败，请检查账号密码');
        setIsLoading(false);
      }
    }, 2000);
  };

  // 第三方登录处理
  const handleWechatLogin = () => {
    console.log('需要调用第三方接口实现微信登录功能');
    setLoginSuccessMessage('微信登录成功，正在跳转...');
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const handleQQLogin = () => {
    console.log('需要调用第三方接口实现QQ登录功能');
    setLoginSuccessMessage('QQ登录成功，正在跳转...');
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        const form = document.getElementById('login-form') as HTMLFormElement;
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  return (
    <div className={styles.pageWrapper}>
      <div className="w-full max-w-md">
        {/* Logo区域 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-graduation-cap text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">面经通</h1>
          <p className="text-text-secondary">提升面试技能，积累面试经验</p>
        </div>
        
        {/* 登录表单 */}
        <div className="bg-white rounded-2xl shadow-form p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">欢迎回来</h2>
          
          <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
            {/* 账号输入 */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-text-primary">
                邮箱/手机号
              </label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                className={`w-full px-4 py-3 border border-border-light rounded-lg ${styles.formInputFocus}`}
                placeholder="请输入邮箱或手机号"
                value={username}
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
                required
              />
              {usernameError && (
                <div className={`${styles.errorMessage} ${styles.show}`}>
                  {usernameError}
                </div>
              )}
            </div>
            
            {/* 密码输入 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                密码
              </label>
              <div className={styles.inputGroup}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password" 
                  name="password" 
                  className={`w-full px-4 py-3 pr-12 border border-border-light rounded-lg ${styles.formInputFocus}`}
                  placeholder="请输入密码"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                <button 
                  type="button" 
                  onClick={handleTogglePassword}
                  className={styles.togglePassword}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {passwordError && (
                <div className={`${styles.errorMessage} ${styles.show}`}>
                  {passwordError}
                </div>
              )}
            </div>
            
            {/* 记住密码和忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  name="remember-me" 
                  className="w-4 h-4 text-primary border-border-light rounded focus:ring-primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-text-secondary">记住密码</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-blue-700 transition-colors"
              >
                忘记密码？
              </Link>
            </div>
            
            {/* 登录按钮 */}
            <button 
              type="submit" 
              className={`w-full ${styles.btnPrimary}`}
              disabled={isLoading}
            >
              <span>{isLoading ? '登录中...' : '登录'}</span>
              {isLoading && (
                <i className="fas fa-spinner fa-spin ml-2"></i>
              )}
            </button>
            
            {/* 登录状态提示 */}
            <div className="text-center">
              {loginSuccessMessage && (
                <div className={`${styles.successMessage} ${styles.show}`}>
                  {loginSuccessMessage}
                </div>
              )}
              {loginErrorMessage && (
                <div className={`${styles.errorMessage} ${styles.show}`}>
                  {loginErrorMessage}
                </div>
              )}
            </div>
          </form>
          
          {/* 分割线 */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-border-light"></div>
            <span className="px-4 text-sm text-text-secondary">或</span>
            <div className="flex-1 h-px bg-border-light"></div>
          </div>
          
          {/* 第三方登录 */}
          <div className="space-y-3">
            <button 
              type="button" 
              onClick={handleWechatLogin}
              className={`w-full ${styles.socialBtn} flex items-center justify-center space-x-3`}
            >
              <i className="fab fa-weixin text-2xl text-secondary"></i>
              <span className="font-medium">微信登录</span>
            </button>
            <button 
              type="button" 
              onClick={handleQQLogin}
              className={`w-full ${styles.socialBtn} flex items-center justify-center space-x-3`}
            >
              <i className="fab fa-qq text-2xl text-info"></i>
              <span className="font-medium">QQ登录</span>
            </button>
          </div>
          
          {/* 注册链接 */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              还没有账号？
              <Link 
                to="/register" 
                className="text-primary hover:text-blue-700 font-medium transition-colors ml-1"
              >
                立即注册
              </Link>
            </p>
          </div>
        </div>
        
        {/* 底部版权 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            © 2024 面经通. 保留所有权利.
            <a href="#" className="hover:text-primary transition-colors ml-1">用户协议</a> |
            <a href="#" className="hover:text-primary transition-colors ml-1">隐私政策</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

