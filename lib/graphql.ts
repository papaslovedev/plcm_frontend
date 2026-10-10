"const DEFAULT_GRAPHQL_URL = "https://plcmbackend.up.railway.app/graphql";

/** Resolve the backend GraphQL endpoint even when Railway's env var includes /api or /api/graphql. */
export function graphqlEndpoint(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_GRAPHQL_URL;
  try {
    const url = new URL(configured);
    const path = url.pathname.replace(/\\/+$/, "");
    const basePath = path.replace(/\\/api\\/graphql$/i, "").replace(/\\/api$/i, "").replace(/\\/graphql$/i, "");
    url.pathname = (basePath + "/graphql").replace(/\\/{2,}/g, "/");
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\\/$/, "");
  } catch {
    return DEFAULT_GRAPHQL_URL;
  }
}
