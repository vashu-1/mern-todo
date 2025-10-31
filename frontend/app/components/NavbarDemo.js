'use client';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, selectUser } from '../store/userslice.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export function NavbarDemo() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navItems = [
    {
      name: 'About',
      link: '/About',
    },
    {
      name: 'Todo',
      link: '/Todo',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logouthandle = async (e) => {
    e?.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success('Logout successful');
      } else {
        toast.error(res.data.message || 'Logout failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }

    // clear redux memory
    dispatch(logout());

    // clear persisted data so the user won't be rehydrated
    try {
      localStorage.removeItem('persist:root');
    } catch (e) {
      console.warn('could not remove persist key', e);
    }
  };
  return (
    <div className="relative w-full">
      <ToastContainer />
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {user && user.loggedIn ? (
              <NavbarButton
                className="bg-white cursor-pointer text-black font-semibold py-2 px-4 rounded-xl"
                onClick={logouthandle}
              >
                Logout
              </NavbarButton>
            ) : (
              <>
                <NavbarButton variant="primary" to="/signup">
                  Sign Up
                </NavbarButton>
                <NavbarButton variant="primary" to="/login">
                  Login
                </NavbarButton>
              </>
            )}
            <MdAccountCircle size={30} className="text-white cursor-pointer" />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="space-y-2 px-4 items-center"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex flex-col w-1/2 gap-4">
              {user && user.loggedIn ? (
                <NavbarButton
                  variant="primary"
                  className="w-full"
                  onClick={logouthandle}
                >
                  Logout
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    to="/login"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    to="/signup"
                  >
                    Signup
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
