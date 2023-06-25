import React from 'react';

import { Route, Routes } from 'react-router-dom';

import ChangeForgotPassword from '~/ui/modules/change-forgot-password/containers/ChangeForgotPassword';
import Login from '~/ui/modules/login/containers/Login';
import LayoutApp from '~/ui/shared/layout/LayoutApp';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/change-forgot-password"
        element={<ChangeForgotPassword />}
      />
      <Route path="/*" element={<LayoutApp />} />
    </Routes>
  );
}

export default App;
