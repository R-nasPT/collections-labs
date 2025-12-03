const { notification, showNotification, hideNotification } = useNotification();

showNotification(t("NO_ITEM_WITH_BARCODE"), "error", 500);
// -- or --
showNotification({
  type: 'warning',
  title: 'Duplicate fulfillment code',
  message: `Fulfillment code ${trimmedCode} has already been added.`,
  duration: 3000,
});

<NotificationDialog
  message={notification?.message || ""}
  type={notification?.type}
  open={notification?.isOpen || false}
  onClose={hideNotification}
/>
