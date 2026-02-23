import { useState } from 'react';

interface AlertConfig {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  confirmText?: string;
  onConfirm?: () => void;
}

export const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (config: AlertConfig) => {
    setAlertConfig(config);
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
    setTimeout(() => {
      if (alertConfig?.onConfirm) {
        alertConfig.onConfirm();
      }
      setAlertConfig(null);
    }, 200);
  };

  return {
    alertConfig,
    visible,
    showAlert,
    hideAlert,
  };
};
