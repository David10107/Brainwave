import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from './Button';
import { brainwave } from '../assets'
import { navigation } from '../constants/index'
import MenuSvg from './../assets/svg/MenuSvg';
import { HamburgerMenu } from './design/Header'
import { disablePageScroll, enablePageScroll } from './../../node_modules/scroll-lock/src/scroll-lock';


function Header() {

    const pathname = useLocation();

    const [openNavigation, setOpenNavigation] = useState(false);

    function toggleMenu() {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    }

    function handleClick() {
        if (!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'}`}>
        <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
            <a href='#hero' className='block w-[12rem] xl:mr-8'>
                <img src={brainwave} alt="brainwave" width={190} height={40} />
            </a>

            <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
                    {navigation.map((item) => (
                        <a key={item.id} href={item.url} onClick={handleClick} className={`relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? 'lg:hidden' : ''} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash ? 'z-2 lg:text-n-1' : 'lg:text-n-1/50'} lg:leading-5 lg:hover:text-n-1 xl:px-12`}>{item.title}</a>
                    ))}
                </div>

                <HamburgerMenu />
            </nav>

            <a href='#signup' className='button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'>
                    New Account
            </a>

            <Button className="hidden lg:flex" href="#login" signIn={true}>
                Sign in
            </Button>

            <Button className='ml-auto lg:hidden' px='px-3' onClick={toggleMenu}>
                <MenuSvg openNavigation={openNavigation} />
            </Button>
        </div>
    </div>
  )
}

export default Header