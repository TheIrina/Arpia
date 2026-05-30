import { SignupForm } from "../components/signup-form";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SignupPage({ searchParams }: Props) {
  const params = await searchParams;
  const email = typeof params?.email === "string" ? params.email : "";

  return <SignupForm initialEmail={email} />;
}
