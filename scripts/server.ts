import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.140.0/http/file_server.ts";

const port = 8000;

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname === "/") {
    return serveDir(req, {
      fsRoot: "dist",
      urlRoot: "",
      showDirListing: true,
      enableCors: true,
    });
  }

  return serveDir(req, {
    fsRoot: "dist",
    showDirListing: true,
    enableCors: true,
  });
}, { port });

console.log(`Server running on http://localhost:${port}`);
