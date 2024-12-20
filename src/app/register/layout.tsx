import "@/styles/globals.css";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div id="modal-root"></div>
    </>
  );
}
