import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLocked } from '../store/appSlice';
import { useBiometrics } from '../hooks/useBiometrics';
import { RootState } from '../store';

export const LockOverlay = () => {
  const dispatch = useDispatch();
  const { isLocked } = useSelector((state: RootState) => state.app);
  const { isAvailable, authenticate } = useBiometrics();
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleBiometricUnlock = async () => {
    const success = await authenticate();
    if (success) {
      dispatch(setLocked(false));
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordUnlock = () => {
    // Simple password check - in real app, verify against stored password
    if (password.length >= 4) {
      dispatch(setLocked(false));
      setPassword('');
      setShowPasswordInput(false);
    } else {
      Alert.alert('Error', 'Password must be at least 4 characters');
    }
  };

  React.useEffect(() => {
    if (isLocked && !showPasswordInput) {
      if (isAvailable) {
        handleBiometricUnlock();
      } else {
        setShowPasswordInput(true);
      }
    }
  }, [isLocked]);

  if (!isLocked) return null;

  return (
    <Modal visible={isLocked} animationType="fade" transparent={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.title}>App Locked</Text>
          <Text style={styles.subtitle}>
            {showPasswordInput
              ? 'Enter password to unlock'
              : 'Authenticate to continue'}
          </Text>

          {showPasswordInput ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoFocus
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handlePasswordUnlock}
              >
                <Text style={styles.buttonText}>Unlock</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleBiometricUnlock}
            >
              <Text style={styles.buttonText}>Authenticate</Text>
            </TouchableOpacity>
          )}

          {!showPasswordInput && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setShowPasswordInput(true)}
            >
              <Text style={styles.linkText}>Use Password Instead</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
    padding: 8,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});