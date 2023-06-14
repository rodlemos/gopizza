export type ProductNavigationProps = {
  id?: string;
};

export type OrderNavigationProps = {
  id: string;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      products: ProductNavigationProps;
      order: OrderNavigationProps;
      orders: undefined;
    }
  }
}
