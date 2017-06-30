import Link from "next/link"

export default ({ pathname }) =>
  <header>
    <Link prefetch href="/">
      <a className={pathname === "/" && "is-active"}>Home</a>
    </Link>
    {" "}
    <Link prefetch href="/about">
      <a className={pathname === "/about" && "is-active"}>About</a>
    </Link>
  </header>
