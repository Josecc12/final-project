import findAll from "@/actions/user/findAll";
import PageClient from "./page.client";

export default async function Page() {
  const response = await findAll();

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return <PageClient users={response.data} />;
}
