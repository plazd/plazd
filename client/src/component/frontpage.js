import React from "react";
import { Link } from "@material-ui/core";

export default function App() {
  return (
    <div>
      <Link href="/signup" variant="body2">
        {"Want an account? Sign Up"}
      </Link>
      <br />
      <Link href="/signin" variant="body2">
        {"Login into account?"}
      </Link>
    </div>
  );
}
