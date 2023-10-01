import { Link, NavLink } from 'react-router-dom';
import { ModeToggle } from './mode.toggle';
import { Button } from './ui/button';
import { LogOut, Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenuSeparator } from './ui/dropdown-menu';

const NavBar = () => {
  const navLink = 'transition-colors hover:text-foreground/80 ';

  const active = (isActive: boolean) =>
    isActive
      ? `${navLink} text-foreground font-semibold`
      : `${navLink} text-foreground/60`;

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className='class="mr-4 hidden md:flex items-center'>
          <span className="sr-only">Toggle Menu</span>
          <Link
            className="mr-6 flex items-center space-x-2 text-2xl font-bold"
            to={'/'}
          >
            Z
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLink
              className={({ isActive }) => active(isActive)}
              to={'/dashboard'}
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) => active(isActive)}
              to={'/products'}
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) => active(isActive)}
              to={'/customers'}
            >
              Customers
            </NavLink>
            <NavLink
              className={({ isActive }) => active(isActive)}
              to={'/subscriptions'}
            >
              Subscriptions
            </NavLink>
            <NavLink
              className={({ isActive }) => active(isActive)}
              to={'/orders'}
            >
              Orders
            </NavLink>
          </nav>
        </div>
        <div className="flex justify-between md:justify-end space-x-6 w-full">
          <Button className="md:hidden " variant="outline" size="icon">
            <Menu className="h-[1.2rem] w-[1.2rem] "></Menu>
          </Button>
          <Link
            className="md:hidden mr-6 flex items-center space-x-2 text-2xl font-bold"
            to={'/'}
          >
            Z
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:block" asChild>
              <Avatar className="w-9 h-9 overflow-hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Username</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-35">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
