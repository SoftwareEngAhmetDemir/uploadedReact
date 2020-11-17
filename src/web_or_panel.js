import React from 'react';
import { useHistory } from 'react-router-dom';
import Panel from './panel/index.js';
import Web from './web/index.js';

export default function WebPanel() {
  let pathname = useHistory().location.pathname.indexOf('/panel');
  return pathname != -1 ? <Panel /> : <Web />;
}
