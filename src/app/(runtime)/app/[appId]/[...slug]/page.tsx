import AppRenderer from "@/components/runtime/AppRenderer"

export default async function Page(props: any) {
  const params = await props.params;
  const { appId, slug } = params;

  const path = "/" + (slug?.join("/") || "dashboard");

  return <AppRenderer appId={appId} path={path} />;
}
