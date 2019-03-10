import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import NavStyles from './styles/NavStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
}

Router.onRouteChangeComplete = () => {
  NProgress.done();
}

Router.onRouteChangeError = (error) => {
  console.log('Routing error', error)
}

const Nav = () => (
  <NavStyles>
    <Link href="/items"><a>Items</a></Link>
    <Link href="/sell"><a>Sell</a></Link>
    <Link href="/signup"><a>Signup</a></Link>
    <Link href="/orders"><a>Orders</a></Link>
    <Link href="/me"><a>Account</a></Link>
  </NavStyles>
)

export default Nav;