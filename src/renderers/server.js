import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import App from 'components/StarMatch';

export async function serverRenderer() {
  const initialData = {
    appName: 'Star Match',
  };

  const pageData = {
    title: `${initialData.appName}`,
  };

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <App initialData={initialData} />,
    ),
    pageData,
  });
}
