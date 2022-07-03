import { Route, Routes } from 'react-router';

import { LoginLayout } from './view/layouts/login/login.layout';
import { MainLayout } from './view/layouts/main/main.layout';
import { Cameras } from './view/pages/cameras/cameras.component';
import { ComingSoon } from './view/pages/coming-soon/coming-soon.component';
import { Auth } from './view/pages/login/login.component';
import { NotFoundPage } from './view/pages/not-found/not-found.component';
import { Redux } from './view/pages/redux/redux.component';
import { Rules } from './view/pages/rules/rules.component';

export const Router = () => (
  <>
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="login" element={<Auth />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Rules />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cameras" element={<Cameras />} />
        <Route path="/defects" element={<ComingSoon />} />
        <Route path="/reports" element={<ComingSoon />} />
        <Route path="/settings" element={<ComingSoon />} />
      </Route>
    </Routes>
  </>
);
