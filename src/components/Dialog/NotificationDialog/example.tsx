const { notification, showNotification, hideNotification } = useNotification();

showNotification(t("NO_ITEM_WITH_BARCODE"), "error");

<NotificationDialog
  message={notification?.message || ""}
  type={notification?.type}
  open={notification?.isOpen || false}
  onClose={hideNotification}
/>
