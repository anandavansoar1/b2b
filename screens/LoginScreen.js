import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import Button from '../components/Button';
import { useResponsive } from '../utils/responsive';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, wp, hp, isTablet, isIOS, contentWidth } = useResponsive();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1); // 1 = Phone, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const otpInputs = Array(4).fill(0);
  const otpRefs = useRef([]);

  const handleSendCode = () => {
    if (phoneNumber.length < 10) return;
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) return;

    setLoading(true);
    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      navigation?.navigate && navigation.navigate('Main');
    }, 1200);
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FAF6ED' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Decorative Background Elements */}
      <View style={[styles.bgCircleTop, { backgroundColor: isDarkMode ? '#C9A25D20' : '#C9A25D30' }]} />
      <View style={[styles.bgCircleBottom, { backgroundColor: isDarkMode ? '#8D6E6315' : '#E8D9C260' }]} />

      <ScrollView
        contentContainerStyle={[styles.content]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center' }}>
          <View style={styles.headerContainer}>
            {/* Brand Logo / Badge */}
            <View style={[styles.brandBadge, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderRadius: rd(25), width: wp(22) > 88 ? 88 : wp(22), height: wp(22) > 88 ? 88 : wp(22) }]}>
              <Image source={require('../assets/home.png')} style={{ width: fs(56), height: fs(56), borderRadius: rd(16), overflow: 'hidden' }} resizeMode="contain" />
            </View>

            <Text style={[styles.brand, { color: theme.text, fontSize: fs(34) }]}>Goldshopper</Text>
            <Text style={[styles.sub, { color: theme.textSecondary, fontSize: fs(12) }]}>
              B2B WHOLESALE PORTAL
            </Text>
          </View>

          {/* Auth Card */}
          <View style={[styles.authCard, {
            backgroundColor: isDarkMode ? '#242424' : '#FFFFFF',
            shadowColor: isDarkMode ? '#000000' : '#C9A25D',
            width: contentWidth, 
            borderRadius: rd(24),
            paddingVertical: pd(35),
            paddingHorizontal: pd(25),
          }]}>

            {step === 1 ? (
              <>
                <Text style={[styles.welcomeText, { color: theme.text, fontSize: fs(24) }]}>Welcome Back</Text>
                <Text style={[styles.instructionText, { color: theme.textSecondary, fontSize: fs(14) }]}>
                  Enter your registered mobile number to login securely
                </Text>

                {/* Form - Step 1 */}
                <View style={styles.formSpace}>
                  <View style={[styles.inputContainer, { marginBottom: pd(18) }]}>
                    <Text style={[styles.label, { color: theme.text, fontSize: fs(13) }]}>Mobile Number</Text>
                    <View style={[styles.phoneInputWrapper, { height: pd(54) }]}>
                      <View style={[
                        styles.phonePrefix,
                        {
                          backgroundColor: isDarkMode ? '#3A3A3A' : '#F5F0E4',
                          borderColor: activeInput === 'phone' ? COLORS.primary : theme.border,
                          borderWidth: activeInput === 'phone' ? 2 : 1,
                          borderRightWidth: 0,
                          height: pd(54)
                        }
                      ]}>
                        <Text style={{ color: theme.text, fontWeight: '600', fontSize: fs(15) }}>+91</Text>
                      </View>
                      <TextInput
                        style={[
                          styles.modernInput,
                          styles.phoneInput,
                          {
                            backgroundColor: theme.inputBackground,
                            color: theme.text,
                            borderColor: activeInput === 'phone' ? COLORS.primary : theme.border,
                            borderWidth: activeInput === 'phone' ? 2 : 1,
                            height: pd(54),
                            fontSize: fs(16),
                          },
                        ]}
                        placeholder="98765 43210"
                        placeholderTextColor={COLORS.textMuted}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="number-pad"
                        maxLength={10}
                        returnKeyType="done"
                        onSubmitEditing={handleSendCode}
                        onFocus={() => setActiveInput('phone')}
                        onBlur={() => setActiveInput(null)}
                      />
                    </View>
                  </View>

                  <Button
                    title="Send OTP Code"
                    onPress={handleSendCode}
                    loading={loading}
                    style={[styles.loginBtn, { height: pd(54) }]}
                  />
                </View>
              </>
            ) : (
              <>
                {/* Step 2 - Verification */}
                <TouchableOpacity style={[styles.backBtn, { top: pd(24), left: pd(20) }]} onPress={() => setStep(1)}>
                  <Text style={{ fontSize: fs(24), color: theme.textSecondary }}>←</Text>
                </TouchableOpacity>

                <Text style={[styles.welcomeText, { color: theme.text, fontSize: fs(24) }]}>Verify OTP</Text>
                <Text style={[styles.instructionText, { color: theme.textSecondary, fontSize: fs(14) }]}>
                  Code sent to +91 {phoneNumber}
                </Text>

                <View style={styles.formSpace}>
                  <View style={[styles.otpContainer, { marginBottom: pd(26), paddingHorizontal: pd(8) }]}>
                    {otpInputs.map((_, index) => (
                      <TextInput
                        key={index}
                        ref={ref => otpRefs.current[index] = ref}
                        style={[
                          styles.otpInput,
                          {
                            backgroundColor: theme.inputBackground,
                            color: theme.text,
                            borderColor: activeInput === `otp${index}` ? COLORS.primary : theme.border,
                            borderWidth: activeInput === `otp${index}` ? 2 : 1,
                            flex: 1,
                            marginHorizontal: pd(8),
                            height: pd(64),
                            fontSize: fs(24),
                            borderRadius: rd(16),
                          }
                        ]}
                        maxLength={1}
                        keyboardType="number-pad"
                        returnKeyType={index === 3 ? 'done' : 'default'}
                        onSubmitEditing={index === 3 ? handleVerifyOTP : undefined}
                        value={otp[index]}
                        onChangeText={(val) => handleOtpChange(val, index)}
                        onFocus={() => setActiveInput(`otp${index}`)}
                        onBlur={() => setActiveInput(null)}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                            otpRefs.current[index - 1].focus();
                          }
                        }}
                      />
                    ))}
                  </View>

                  {!activeInput?.startsWith('otp') && (
                    <View style={[styles.resendContainer, { marginBottom: pd(26) }]}>
                      <Text style={{ color: theme.textSecondary, fontSize: fs(13) }}>Didn't receive code? </Text>
                      <TouchableOpacity>
                        <Text style={{ color: COLORS.primary, fontSize: fs(13), fontWeight: '700' }}>Resend in 30s</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <Button
                    title="Verify & Login"
                    onPress={handleVerifyOTP}
                    loading={loading}
                    style={[styles.loginBtn, { height: pd(54) }]}
                  />
                </View>
              </>
            )}

          </View>
        </View>

        <Text style={[styles.footer, { color: theme.textSecondary, fontSize: fs(12), marginTop: 'auto', paddingBottom: pd(20), paddingTop: pd(20) }]}>
          © 2026 Goldshopper B2B Portal. All rights reserved.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
//abc 
const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  bgCircleTop: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    top: -width * 0.7,
    left: -width * 0.25,
    zIndex: 0,
  },
  bgCircleBottom: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    bottom: -width * 0.5,
    right: -width * 0.4,
    zIndex: 0,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  brandBadge: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brand: {
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  sub: {
    marginTop: 6,
    letterSpacing: 2.5,
    fontWeight: '600',
  },
  authCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 35,
    paddingHorizontal: 25,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 93, 0.15)', // subtle gold border
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  formSpace: {
    width: '100%',
  },
  inputContainer: {
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    opacity: 0.9,
  },
  modernInput: {
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1.5,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
  },
  phonePrefix: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  phoneInput: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    letterSpacing: 1.5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    textAlign: 'center',
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  backBtn: {
    position: 'absolute',
    top: 24,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  loginBtn: {
    height: 54,
    marginTop: 8,

    borderRadius: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  applyBtn: {
    backgroundColor: 'transparent',
  },
  footer: {
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoginScreen;
