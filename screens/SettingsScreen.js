import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert ,Platform} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();

  const [notifications, setNotifications] = React.useState(true);
  const [biometric, setBiometric] = React.useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) }
      ]
    );
  };

  const SectionTitle = ({ title }) => (
    <Text style={[styles.sectionTitle, { color: theme.textSecondary, fontSize: fs(13) }]}>
      {title.toUpperCase()}
    </Text>
  );

  const SettingRow = ({ icon, label, type = 'link', value, onValueChange, onPress, color = COLORS.primary, destructive = false }) => {
    return (
      <TouchableOpacity 
        style={[styles.settingRow, { 
          paddingVertical: pd(16),
          paddingHorizontal: pd(16)
        }]}
        onPress={onPress}
        disabled={type === 'switch'}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#3A3A3A' : `${color}15`, borderRadius: rd(10) }]}>
            <Ionicons name={icon} size={fs(20)} color={destructive ? '#E74C3C' : color} />
          </View>
          <Text style={[styles.settingLabel, { 
            color: destructive ? '#E74C3C' : theme.text, 
            fontSize: fs(15),
            fontWeight: '500' 
          }]}>
            {label}
          </Text>
        </View>

        {type === 'link' && (
          <Ionicons name="chevron-forward" size={fs(20)} color={theme.textSecondary} />
        )}

        {type === 'switch' && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : (value ? '#FFFFFF' : '#f4f3f4')}
          />
        )}
      </TouchableOpacity>
    );
  };

  const SettingGroup = ({ children }) => (
    <View style={[styles.settingGroup, { 
      backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF',
      borderRadius: rd(16), 
      overflow: 'hidden',
      borderColor: isDarkMode ? '#3A3A3A' : '#E5E7EB',
      borderWidth: 1,
      marginBottom: pd(24)
    }]}>
      {React.Children.map(children, (child, index) => {
        if (!child) return null;
        return (
          <>
            {child}
            {index !== React.Children.count(children) - 1 && (
              <View style={[styles.divider, { backgroundColor: isDarkMode ? '#3A3A3A' : '#E5E7EB' }]} />
            )}
          </>
        );
      })}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header
        title="Settings"
        subtitle="App preferences & account"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={[styles.scrollContent, { alignItems: 'center' }]} showsVerticalScrollIndicator={false}>
        <View style={{ width: contentWidth, paddingHorizontal: pd(16), paddingTop: pd(10) }}>
          
          {/* User Profile Summary */}
          <View style={[styles.profileCard, { 
            backgroundColor: isDarkMode ? '#2C2C2C' : COLORS.primary, 
            borderRadius: rd(20),
            padding: pd(20),
            marginBottom: pd(24)
          }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.avatarBox, { backgroundColor: isDarkMode ? '#3A3A3A' : '#FFFFFF33', borderRadius: rd(25) }]}>
                <Ionicons name="person" size={fs(26)} color="#FFFFFF" />
              </View>
              <View style={{ marginLeft: pd(16) }}>
                <Text style={{ fontSize: fs(18), fontWeight: '700', color: '#FFFFFF' }}>John Doe</Text>
                <Text style={{ fontSize: fs(13), color: isDarkMode ? '#AAAAAA' : '#E0E7FF', marginTop: pd(4) }}>+91 98765 43210</Text>
              </View>
            </View>
          </View>

          <SectionTitle title="Preferences" />
          <SettingGroup>
            <SettingRow 
              icon="moon-outline" 
              label="Dark Mode" 
              type="switch" 
              value={isDarkMode} 
              onValueChange={toggleTheme} 
              color="#3B82F6"
            />
            <SettingRow 
              icon="notifications-outline" 
              label="Push Notifications" 
              type="switch" 
              value={notifications} 
              onValueChange={setNotifications} 
              color="#F59E0B"
            />
            <SettingRow 
              icon="finger-print-outline" 
              label="Biometric Login" 
              type="switch" 
              value={biometric} 
              onValueChange={setBiometric} 
              color="#10B981"
            />
          </SettingGroup>

          <SectionTitle title="Account" />
          <SettingGroup>
            <SettingRow icon="person-outline" label="Edit Profile" onPress={() => {}} />
            <SettingRow icon="location-outline" label="Delivery Addresses" onPress={() => {}} />
            <SettingRow icon="card-outline" label="Payment Methods" onPress={() => {}} />
          </SettingGroup>

          <SectionTitle title="Support" />
          <SettingGroup>
            <SettingRow icon="chatbubble-ellipses-outline" label="Help & Support" onPress={() => {}} color={COLORS.textSecondary} />
            <SettingRow icon="document-text-outline" label="Terms & Conditions" onPress={() => {}} color={COLORS.textSecondary} />
            <SettingRow icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => {}} color={COLORS.textSecondary} />
          </SettingGroup>

          <SettingGroup>
            <SettingRow 
              icon="log-out-outline" 
              label="Log Out" 
              onPress={handleLogout} 
              destructive={true} 
            />
          </SettingGroup>

          <Text style={[styles.versionText, { color: theme.textSecondary, fontSize: fs(12) }]}>
            Goldshopper B2B v1.0.0
          </Text>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 12,
  },
  profileCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingGroup: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingLabel: {
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SettingsScreen;
