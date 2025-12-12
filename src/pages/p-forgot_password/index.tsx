

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface FormData {
  emailPhone: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  emailPhone: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单数据状态
  const [formData, setFormData] = useState<FormData>({
    emailPhone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 表单错误状态
  const [formErrors, setFormErrors] = useState<FormErrors>({
    emailPhone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI状态
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verificationCodeCountdown, setVerificationCodeCountdown] = useState(0);
  const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(false);

  // 定时器引用
  const countdownTimerRef = useRef<number | null>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '面经通 - 找回密码';
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

  // 邮箱/手机号验证
  const validateEmailPhone = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1[3-9]\d{9}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  // 密码强度验证
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return passwordRegex.test(password);
  };

  // 显示错误信息
  const showError = (field: keyof FormErrors, message: string) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  // 隐藏错误信息
  const hideError = (field: keyof FormErrors) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // 开始倒计时
  const startCountdown = () => {
    setIsCodeButtonDisabled(true);
    setVerificationCodeCountdown(60);
    
    countdownTimerRef.current = window.setInterval(() => {
      setVerificationCodeCountdown(prev => {
        if (prev <= 1) {
          setIsCodeButtonDisabled(false);
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 处理输入变化
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // 实时验证
    if (field === 'verificationCode') {
      // 只允许数字
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [field]: numericValue
      }));
      return;
    }
  };

  // 处理输入框失去焦点
  const handleInputBlur = (field: keyof FormData) => {
    const value = formData[field];
    
    switch (field) {
      case 'emailPhone':
        if (value && !validateEmailPhone(value)) {
          showError(field, '请输入正确的邮箱或手机号格式');
        } else {
          hideError(field);
        }
        break;
      case 'verificationCode':
        if (value && value.length !== 6) {
          showError(field, '验证码应为6位数字');
        } else {
          hideError(field);
        }
        break;
      case 'newPassword':
        if (value && !validatePassword(value)) {
          showError(field, '密码长度为8-20位，必须包含字母和数字');
        } else {
          hideError(field);
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.newPassword) {
          showError(field, '两次输入的密码不一致');
        } else {
          hideError(field);
        }
        break;
    }
  };

  // 获取验证码
  const handleGetVerificationCode = () => {
    const emailPhone = formData.emailPhone.trim();
    
    // 验证邮箱/手机号
    if (!emailPhone) {
      showError('emailPhone', '请输入邮箱或手机号');
      return;
    }
    
    if (!validateEmailPhone(emailPhone)) {
      showError('emailPhone', '请输入正确的邮箱或手机号格式');
      return;
    }
    
    hideError('emailPhone');
    
    // 模拟发送验证码
    console.log('发送验证码到:', emailPhone);
    startCountdown();
  };

  // 表单验证
  const validateForm = (): boolean => {
    let isValid = true;
    
    // 验证邮箱/手机号
    const emailPhone = formData.emailPhone.trim();
    if (!emailPhone) {
      showError('emailPhone', '请输入邮箱或手机号');
      isValid = false;
    } else if (!validateEmailPhone(emailPhone)) {
      showError('emailPhone', '请输入正确的邮箱或手机号格式');
      isValid = false;
    } else {
      hideError('emailPhone');
    }
    
    // 验证验证码
    const verificationCode = formData.verificationCode.trim();
    if (!verificationCode) {
      showError('verificationCode', '请输入验证码');
      isValid = false;
    } else if (verificationCode.length !== 6) {
      showError('verificationCode', '验证码应为6位数字');
      isValid = false;
    } else {
      hideError('verificationCode');
    }
    
    // 验证新密码
    const newPassword = formData.newPassword;
    if (!newPassword) {
      showError('newPassword', '请输入新密码');
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      showError('newPassword', '密码长度为8-20位，必须包含字母和数字');
      isValid = false;
    } else {
      hideError('newPassword');
    }
    
    // 验证确认密码
    const confirmPassword = formData.confirmPassword;
    if (!confirmPassword) {
      showError('confirmPassword', '请确认新密码');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      showError('confirmPassword', '两次输入的密码不一致');
      isValid = false;
    } else {
      hideError('confirmPassword');
    }
    
    return isValid;
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // 模拟重置密码请求
    setIsSubmitting(true);
    
    setTimeout(() => {
      // 模拟重置成功
      console.log('密码重置成功');
      setShowSuccessModal(true);
      setIsSubmitting(false);
    }, 2000);
  };

  // 成功模态框确认
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  // 返回登录
  const handleBackToLogin = () => {
    navigate(-1);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 找回密码容器 */}
      <div className="w-full max-w-md">
        {/* Logo区域 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">面经通</h1>
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">找回密码</h2>
          <p className="text-text-secondary text-sm">请输入您的邮箱或手机号，我们将发送验证码帮您重置密码</p>
        </div>

        {/* 找回密码表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6 space-y-6">
          {/* 邮箱/手机号输入 */}
          <div className="space-y-2">
            <label htmlFor="email-phone" className="block text-sm font-medium text-text-primary">
              邮箱/手机号 *
            </label>
            <input 
              type="text" 
              id="email-phone" 
              name="email-phone" 
              placeholder="请输入邮箱或手机号" 
              className={`w-full px-4 py-3 border rounded-lg ${styles.formInputFocus} ${
                formErrors.emailPhone ? 'border-danger' : 'border-gray-300'
              }`}
              value={formData.emailPhone}
              onChange={(e) => handleInputChange('emailPhone', e.target.value)}
              onBlur={() => handleInputBlur('emailPhone')}
              required
            />
            {formErrors.emailPhone && (
              <div className={styles.errorMessage}>{formErrors.emailPhone}</div>
            )}
          </div>

          {/* 验证码输入 */}
          <div className="space-y-2">
            <label htmlFor="verification-code" className="block text-sm font-medium text-text-primary">
              验证码 *
            </label>
            <div className="flex space-x-3">
              <input 
                type="text" 
                id="verification-code" 
                name="verification-code" 
                placeholder="请输入验证码" 
                maxLength={6}
                className={`flex-1 px-4 py-3 border rounded-lg ${styles.formInputFocus} ${
                  formErrors.verificationCode ? 'border-danger' : 'border-gray-300'
                }`}
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                onBlur={() => handleInputBlur('verificationCode')}
                required
              />
              <button 
                type="button" 
                onClick={handleGetVerificationCode}
                disabled={isCodeButtonDisabled}
                className={`${styles.btnSecondary} whitespace-nowrap px-4 py-3`}
              >
                {verificationCodeCountdown > 0 ? `${verificationCodeCountdown}秒后重发` : '获取验证码'}
              </button>
            </div>
            {formErrors.verificationCode && (
              <div className={styles.errorMessage}>{formErrors.verificationCode}</div>
            )}
          </div>

          {/* 新密码输入 */}
          <div className="space-y-2">
            <label htmlFor="new-password" className="block text-sm font-medium text-text-primary">
              新密码 *
            </label>
            <div className="relative">
              <input 
                type={showNewPassword ? 'text' : 'password'}
                id="new-password" 
                name="new-password" 
                placeholder="请输入新密码（8-20位，包含字母和数字）" 
                className={`w-full px-4 py-3 pr-12 border rounded-lg ${styles.formInputFocus} ${
                  formErrors.newPassword ? 'border-danger' : 'border-gray-300'
                }`}
                minLength={8}
                maxLength={20}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                onBlur={() => handleInputBlur('newPassword')}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`${styles.passwordToggle} absolute right-4 top-1/2 transform -translate-y-1/2`}
              >
                <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {formErrors.newPassword && (
              <div className={styles.errorMessage}>{formErrors.newPassword}</div>
            )}
          </div>

          {/* 确认新密码输入 */}
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-text-primary">
              确认新密码 *
            </label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password" 
                name="confirm-password" 
                placeholder="请再次输入新密码" 
                className={`w-full px-4 py-3 pr-12 border rounded-lg ${styles.formInputFocus} ${
                  formErrors.confirmPassword ? 'border-danger' : 'border-gray-300'
                }`}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => handleInputBlur('confirmPassword')}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`${styles.passwordToggle} absolute right-4 top-1/2 transform -translate-y-1/2`}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {formErrors.confirmPassword && (
              <div className={styles.errorMessage}>{formErrors.confirmPassword}</div>
            )}
          </div>

          {/* 重置密码按钮 */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full ${styles.btnPrimary} py-3 text-lg font-medium`}
          >
            {isSubmitting ? '重置中...' : '重置密码'}
          </button>

          {/* 返回登录 */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-sm text-primary hover:text-blue-700 font-medium"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              返回登录
            </button>
          </div>
        </form>

        {/* 底部版权信息 */}
        <div className="text-center mt-8 text-sm text-text-secondary">
          <p>&copy; 2024 面经通. 保留所有权利.</p>
        </div>
      </div>

      {/* 成功提示模态框 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-secondary text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">密码重置成功</h3>
              <p className="text-text-secondary text-sm mb-6">您的密码已成功重置，请使用新密码登录</p>
              <button 
                onClick={handleSuccessConfirm}
                className={`w-full ${styles.btnPrimary} py-3 font-medium`}
              >
                去登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

