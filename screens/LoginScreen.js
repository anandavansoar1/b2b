import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Modal,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import Button from '../components/Button';
import { useResponsive } from '../utils/responsive';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, wp, hp, isTablet, isIOS, contentWidth } = useResponsive();

  const styles = useMemo(() => StyleSheet.create({
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
      paddingHorizontal: pd(20),
      alignItems: 'center',
      zIndex: 1,
      paddingTop: pd(40),
      paddingBottom: pd(40),
      justifyContent: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: pd(35),
    },
    brandBadge: {
      width: fs(88),
      height: fs(88),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: pd(20),
    },
    brand: {
      fontWeight: '800',
      letterSpacing: 0.5,
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
    },
    sub: {
      marginTop: pd(6),
      letterSpacing: 2.5,
      fontWeight: '600',
    },
    authCard: {
      width: '100%',
      borderRadius: rd(24),
      paddingVertical: pd(35),
      paddingHorizontal: pd(25),
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: 'rgba(201, 162, 93, 0.15)', // subtle gold border
    },
    welcomeText: {
      fontSize: fs(24),
      fontWeight: '700',
      marginBottom: pd(6),
      textAlign: 'center',
    },
    instructionText: {
      fontSize: fs(14),
      textAlign: 'center',
      marginBottom: pd(30),
      fontWeight: '500',
    },
    formSpace: {
      width: '100%',
    },
    inputContainer: {
    },
    label: {
      fontWeight: '600',
      marginBottom: pd(8),
      marginLeft: pd(4),
      opacity: 0.9,
    },
    modernInput: {
      height: pd(54),
      borderRadius: rd(14),
      paddingHorizontal: pd(16),
      fontSize: fs(16),
      borderWidth: 1.5,
      fontWeight: '600',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    modernInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: pd(8),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    scanBtn: {
      width: pd(44),
      height: pd(44),
      justifyContent: 'center',
      alignItems: 'center',
    },
    phoneInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: pd(54),
    },
    phonePrefix: {
      height: pd(54),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: pd(14),
      borderWidth: 1.5,
      borderRightWidth: 0,
      borderTopLeftRadius: rd(14),
      borderBottomLeftRadius: rd(14),
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
      marginBottom: pd(26),
    },
    backBtn: {
      position: 'absolute',
      top: pd(24),
      left: pd(20),
      zIndex: 10,
      width: pd(40),
      height: pd(40),
      justifyContent: 'center',
    },
    loginBtn: {
      height: pd(54),
      marginTop: pd(8),
      borderRadius: rd(14),
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: pd(24),
    },
    line: {
      flex: 1,
      height: 1,
      opacity: 0.5,
    },
    orText: {
      marginHorizontal: pd(16),
      fontSize: fs(12),
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
    scannerRoot: {
      flex: 1,
      backgroundColor: '#000',
    },
    scannerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scannerHeader: {
      position: 'absolute',
      top: pd(50),
      left: pd(20),
      right: pd(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeScanner: {
      width: pd(44),
      height: pd(44),
      justifyContent: 'center',
      alignItems: 'center',
    },
    scannerTitle: {
      flex: 1,
      color: '#FFF',
      fontSize: fs(18),
      fontWeight: '700',
      textAlign: 'center',
      marginRight: pd(44), // offset close btn
    },
    scannerTarget: {
      width: pd(250),
      height: pd(250),
      position: 'relative',
    },
    targetCorner: {
      position: 'absolute',
      width: pd(30),
      height: pd(30),
      borderColor: COLORS.primary,
      borderWidth: rd(4),
    },
    topLeft: {
      top: 0,
      left: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    topRight: {
      top: 0,
      right: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    scannerHint: {
      color: '#FFF',
      marginTop: pd(40),
      fontSize: fs(14),
      fontWeight: '500',
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: pd(20),
      paddingVertical: pd(10),
      borderRadius: rd(20),
    },
  }), [fs, pd, rd, isDarkMode, theme]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1); // 1 = Phone, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const otpInputs = Array(4).fill(0);
  const otpRefs = useRef([]);
  const phoneInputRef = useRef(null);

  const handleScanPress = async () => {
    if (!permission?.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Camera permission is required to scan codes.');
        return;
      }
    }
    setShowScanner(true);
  };

  const handleBarcodeScanned = ({ data }) => {
    setCompanyCode(data);
    setShowScanner(false);
    // Auto focus phone input after scan
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 500);
  };

  const handleSendCode = () => {
    if (!companyCode.trim()) {
      Alert.alert('Required', 'Please enter or scan your Company Code');
      return;
    }
    if (phoneNumber.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return;
    }
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
    <KeyboardAwareScrollView
      style={[styles.root, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FAF6ED' }]}
      contentContainerStyle={[styles.content, { minHeight: '100%' }]}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 50 : 100}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      scrollEnabled={!!activeInput}
    >
      {/* Decorative Background Elements */}
      <View style={[styles.bgCircleTop, { backgroundColor: isDarkMode ? '#C9A25D20' : '#C9A25D30' }]} />
      <View style={[styles.bgCircleBottom, { backgroundColor: isDarkMode ? '#8D6E6315' : '#E8D9C260' }]} />

      <View style={{ width: '100%', alignItems: 'center', paddingVertical: pd(20) }}>
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
                  {/* Company Code Field */}
                  <View style={[styles.inputContainer, { marginBottom: pd(16) }]}>
                    <Text style={[styles.label, { color: theme.text, fontSize: fs(13) }]}>Company Code</Text>
                    <View style={[
                      styles.modernInputWrapper,
                      {
                        backgroundColor: theme.inputBackground,
                        borderColor: activeInput === 'company' ? COLORS.primary : theme.border,
                        borderWidth: activeInput === 'company' ? 2 : 1,
                        height: pd(54),
                        borderRadius: rd(14),
                      }
                    ]}>
                      <TextInput
                        style={[
                          styles.modernInput,
                          {
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: theme.text,
                            height: '100%',
                            fontSize: fs(16),
                            borderWidth: 0,
                            shadowOpacity: 0,
                            elevation: 0,
                          },
                        ]}
                        placeholder="Enter Company Code"
                        placeholderTextColor={COLORS.textMuted}
                        value={companyCode}
                        onChangeText={setCompanyCode}
                        returnKeyType="next"
                        onSubmitEditing={() => phoneInputRef.current?.focus()}
                        onFocus={() => setActiveInput('company')}
                        onBlur={() => setActiveInput(null)}
                      />
                      <TouchableOpacity 
                        style={styles.scanBtn}
                        onPress={handleScanPress}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="qr-code-outline" size={fs(22)} color={COLORS.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

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
                        ref={phoneInputRef}
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

        <Text style={[styles.footer, { color: theme.textSecondary, fontSize: fs(12), paddingBottom: pd(24), paddingTop: pd(24) }]}>
          © 2026 Goldshopper B2B Portal. All rights reserved.
        </Text>

      {/* Scanner Modal */}
      <Modal
        visible={showScanner}
        animationType="slide"
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={styles.scannerRoot}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'pdf417'],
            }}
          />
          
          <View style={styles.scannerOverlay}>
            <View style={styles.scannerHeader}>
              <TouchableOpacity onPress={() => setShowScanner(false)} style={styles.closeScanner}>
                <Ionicons name="close" size={fs(30)} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.scannerTitle}>Scan Company Code</Text>
            </View>
            
            <View style={styles.scannerTarget}>
              <View style={[styles.targetCorner, styles.topLeft]} />
              <View style={[styles.targetCorner, styles.topRight]} />
              <View style={[styles.targetCorner, styles.bottomLeft]} />
              <View style={[styles.targetCorner, styles.bottomRight]} />
            </View>
            
            <Text style={styles.scannerHint}>Align the code inside the box to scan</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};
//abc 

export default LoginScreen;
