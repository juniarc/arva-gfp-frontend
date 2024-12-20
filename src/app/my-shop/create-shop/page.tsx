import CreateShopPage from "@/interfaces/components/createShopPage/CreateShopPage";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const userId = Number(cookiesList.get("userId")?.value || undefined);
  const token = cookiesList.get("token")?.value || undefined;

  return (
    <main className="min-h-[90vh] tablet:p-15 desktop:px-[120px] desktop:py-20">
      <CreateShopPage userId={userId} token={token} />
    </main>
  );
}
