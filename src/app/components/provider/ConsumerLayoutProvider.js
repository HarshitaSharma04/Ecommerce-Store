import ConsumerSidebarDrawer from "../consumer/consumerSidebarDrawer";

export const metadata = {
  title: "ShopSmart: Auth",
  description: "Modern E-commerce Store",
};

export default function ConsumerLayoutProvider({ children , open, handleClose}) {
  return (
    // <>
      <ConsumerSidebarDrawer open={open} handleClose={handleClose}>{children}</ConsumerSidebarDrawer>
    // </>
  );
}
