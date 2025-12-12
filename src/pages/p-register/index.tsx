

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface FormData {
  contact: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  agreement: boolean;
}

interface FormErrors {
  contact: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  agreement: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单数据状态
  const [formData, setFormData] = useState<FormData>({
    contact: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    agreement: false
  });

  // 表单错误状态
  const [formErrors, setFormErrors] = useState<FormErrors>({
    contact: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    agreement: ''
  });

  // UI状态
  const [registerType, setRegisterType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  // 定时器引用
  const countdownTimerRef = useRef<number | null>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 注册';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  // 表单验证
  useEffect(() => {
    const isValid = validateContact() && 
                   validatePassword() && 
                   validateConfirmPassword() && 
                   validateVerificationCode() && 
                   validateAgreement();
    setIsFormValid(isValid);
  }, [formData, registerType]);

  // 倒计时效果
  useEffect(() => {
    if (countdownSeconds > 0) {
      countdownTimerRef.current = window.setInterval(() => {
        setCountdownSeconds(prev => prev - 1);
      }, 1000);
    } else if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [countdownSeconds]);

  // 验证函数
  const validateContact = (): boolean => {
    const value = formData.contact.trim();
    if (!value) {
      setFormErrors(prev => ({ ...prev, contact: registerType === 'email' ? '请输入邮箱地址' : '请输入手机号码' }));
      return false;
    }

    if (registerType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors(prev => ({ ...prev, contact: '请输入有效的邮箱地址' }));
        return false;
      }
    } else {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(value)) {
        setFormErrors(prev => ({ ...prev, contact: '请输入有效的手机号码' }));
        return false;
      }
    }

    setFormErrors(prev => ({ ...prev, contact: '' }));
    return true;
  };

  const validatePassword = (): boolean => {
    const value = formData.password;
    if (!value) {
      setFormErrors(prev => ({ ...prev, password: '请输入密码' }));
      return false;
    }

    if (value.length < 6) {
      setFormErrors(prev => ({ ...prev, password: '密码至少需要6位字符' }));
      return false;
    }

    setFormErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const validateConfirmPassword = (): boolean => {
    const confirmPassword = formData.confirmPassword;
    if (!confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: '请确认密码' }));
      return false;
    }

    if (formData.password !== confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: '两次输入的密码不一致' }));
      return false;
    }

    setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
    return true;
  };

  const validateVerificationCode = (): boolean => {
    const value = formData.verificationCode.trim();
    if (!value) {
      setFormErrors(prev => ({ ...prev, verificationCode: '请输入验证码' }));
      return false;
    }

    if (value.length !== 6) {
      setFormErrors(prev => ({ ...prev, verificationCode: '请输入6位验证码' }));
      return false;
    }

    setFormErrors(prev => ({ ...prev, verificationCode: '' }));
    return true;
  };

  const validateAgreement = (): boolean => {
    if (!formData.agreement) {
      setFormErrors(prev => ({ ...prev, agreement: '请同意用户协议和隐私政策' }));
      return false;
    }

    setFormErrors(prev => ({ ...prev, agreement: '' }));
    return true;
  };

  // 事件处理函数
  const handleRegisterTypeChange = (type: 'email' | 'phone') => {
    setRegisterType(type);
    setFormData(prev => ({ ...prev, contact: '' }));
    setFormErrors(prev => ({ ...prev, contact: '' }));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordToggle = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleGetVerificationCode = () => {
    if (!validateContact()) {
      return;
    }

    console.log('发送验证码到:', formData.contact);
    setCountdownSeconds(60);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('注册成功，跳转到首页');
      navigate('/home');
    } catch (error) {
      console.error('注册失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserAgreementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('打开用户协议');
  };

  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('打开隐私政策');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* 注册卡片 */}
        <div className={`${styles.registerCard} w-full max-w-md rounded-2xl shadow-2xl p-8`}>
          {/* Logo区域 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-graduation-cap text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">欢迎注册面经通</h1>
            <p className="text-text-secondary">开启你的面试提升之旅</p>
          </div>

          {/* 注册表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 注册方式选择 */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button 
                type="button" 
                onClick={() => handleRegisterTypeChange('email')}
                className={`${registerType === 'email' ? styles.tabActive : styles.tabInactive} flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors`}
              >
                邮箱注册
              </button>
              <button 
                type="button" 
                onClick={() => handleRegisterTypeChange('phone')}
                className={`${registerType === 'phone' ? styles.tabActive : styles.tabInactive} flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors`}
              >
                手机注册
              </button>
            </div>

            {/* 邮箱/手机号输入 */}
            <div className="space-y-2">
              <label htmlFor="contact-input" className="block text-sm font-medium text-text-primary">
                <span>{registerType === 'email' ? '邮箱地址' : '手机号码'}</span> <span className="text-danger">*</span>
              </label>
              <input 
                type={registerType} 
                id="contact-input" 
                name="contact" 
                placeholder={registerType === 'email' ? '请输入邮箱地址' : '请输入手机号码'}
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${styles.formInput} transition-colors`}
                required
              />
              {formErrors.contact && (
                <div className="text-danger text-sm">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  <span>{formErrors.contact}</span>
                </div>
              )}
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label htmlFor="password-input" className="block text-sm font-medium text-text-primary">
                密码 <span className="text-danger">*</span>
              </label>
              <div className={styles.inputGroup}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password-input" 
                  name="password" 
                  placeholder="请输入密码（至少6位）"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg ${styles.formInput} transition-colors`}
                  minLength={6}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => handlePasswordToggle('password')}
                  className={styles.passwordToggle}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {formErrors.password && (
                <div className="text-danger text-sm">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  <span>{formErrors.password}</span>
                </div>
              )}
            </div>

            {/* 确认密码输入 */}
            <div className="space-y-2">
              <label htmlFor="confirm-password-input" className="block text-sm font-medium text-text-primary">
                确认密码 <span className="text-danger">*</span>
              </label>
              <div className={styles.inputGroup}>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password-input" 
                  name="confirmPassword" 
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg ${styles.formInput} transition-colors`}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => handlePasswordToggle('confirmPassword')}
                  className={styles.passwordToggle}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {formErrors.confirmPassword && (
                <div className="text-danger text-sm">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  <span>{formErrors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* 验证码输入 */}
            <div className="space-y-2">
              <label htmlFor="verification-code-input" className="block text-sm font-medium text-text-primary">
                验证码 <span className="text-danger">*</span>
              </label>
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  id="verification-code-input" 
                  name="verificationCode" 
                  placeholder="请输入验证码"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                  className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg ${styles.formInput} transition-colors`}
                  maxLength={6}
                  required
                />
                <button 
                  type="button" 
                  onClick={handleGetVerificationCode}
                  disabled={countdownSeconds > 0}
                  className={`px-6 py-3 rounded-lg transition-colors font-medium whitespace-nowrap ${
                    countdownSeconds > 0 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-blue-600'
                  }`}
                >
                  {countdownSeconds > 0 ? `${countdownSeconds}秒后重发` : '获取验证码'}
                </button>
              </div>
              {formErrors.verificationCode && (
                <div className="text-danger text-sm">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  <span>{formErrors.verificationCode}</span>
                </div>
              )}
            </div>

            {/* 用户协议 */}
            <div className="space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  id="agreement-checkbox" 
                  name="agreement" 
                  checked={formData.agreement}
                  onChange={(e) => handleInputChange('agreement', e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
                <span className="text-sm text-text-secondary">
                  我已阅读并同意
                  <a href="#" onClick={handleUserAgreementClick} className="text-primary hover:text-blue-600 underline">《用户协议》</a>
                  和
                  <a href="#" onClick={handlePrivacyPolicyClick} className="text-primary hover:text-blue-600 underline">《隐私政策》</a>
                </span>
              </label>
              {formErrors.agreement && (
                <div className="text-danger text-sm">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  <span>{formErrors.agreement}</span>
                </div>
              )}
            </div>

            {/* 注册按钮 */}
            <button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  注册中...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus mr-2"></i>
                  注册
                </>
              )}
            </button>
          </form>

          {/* 登录链接 */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              已有账号？
              <Link to="/login" className="text-primary hover:text-blue-600 font-medium">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 底部版权信息 */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white text-sm opacity-80">
          © 2024 面经通. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default RegisterPage;

