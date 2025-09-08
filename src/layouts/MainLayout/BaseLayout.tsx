// import Navbar from '@components/Navbar/Navbar';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CircularProgess from '@components/Spinner/CircularProgess';
import Nav from '@components/Navbar/Nav';

const BaseLayout: React.FC = () => {

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Fixed Nav */}
      <Nav />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-primary-background scrollbar-hide px-4 sm:px-6 lg:px-8 ">
          <div className="text-text-secondary py-8 sm:py-12">
            <Suspense fallback={<CircularProgess />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
    </div>
  );
};

export default BaseLayout;
