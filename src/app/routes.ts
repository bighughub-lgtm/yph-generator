import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout';
import { StartScreen } from './screens/StartScreen';
import { ProductScreen } from './screens/ProductScreen';
import { BrandScreen } from './screens/BrandScreen';
import { QuantityScreen } from './screens/QuantityScreen';
import { CompositionScreen } from './screens/CompositionScreen';
import { DesignsScreen } from './screens/DesignsScreen';
import { MockupsScreen } from './screens/MockupsScreen';
import { FinishedScreen } from './screens/FinishedScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: StartScreen },
      { path: 'product', Component: ProductScreen },
      { path: 'brand', Component: BrandScreen },
      { path: 'quantity', Component: QuantityScreen },
      { path: 'composition', Component: CompositionScreen },
      { path: 'designs', Component: DesignsScreen },
      { path: 'mockups', Component: MockupsScreen },
      { path: 'finished', Component: FinishedScreen },
    ],
  },
]);