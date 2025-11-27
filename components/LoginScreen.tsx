import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Logo from './Logo';
import { COLORS } from '../theme';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'INPUT_MOBILE' | 'INPUT_OTP'>('INPUT_MOBILE');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid mobile number");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('INPUT_OTP');
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo width={100} height={100} />
          </View>
          <Text style={styles.title}>Paathner</Text>
          <Text style={styles.subtitle}>Your Ultimate Mall Companion</Text>

          <View style={styles.form}>
            {step === 'INPUT_MOBILE' ? (
              <>
                <Text style={styles.label}>ENTER MOBILE NUMBER</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.prefix}>+91</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="98765 43210"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={setMobile}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={isLoading}>
                  {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Get OTP</Text>}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.label}>ENTER OTP</Text>
                <TextInput
                  style={[styles.input, { textAlign: 'center', letterSpacing: 8 }]}
                  placeholder="••••"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={4}
                />
                <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={isLoading}>
                  {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Verify & Login</Text>}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  background: { flex: 1, justifyContent: 'center', backgroundColor: '#111827' }, // Dark background fallback
  content: { padding: 24, alignItems: 'center' },
  logoContainer: {
    width: 120, height: 120, backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 20
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#AAA', marginBottom: 40 },
  form: { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 20 },
  label: { color: '#888', fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, borderWidth: 1, borderColor: '#333' },
  prefix: { color: '#FFF', paddingHorizontal: 16, fontWeight: 'bold' },
  input: { flex: 1, color: '#FFF', padding: 16, fontSize: 16 },
  button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default LoginScreen;
