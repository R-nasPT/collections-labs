type Id = string | number;

type EndpointFunction = (id: Id) => string;

type EndpointGroup = {
  readonly [key: string]: string | EndpointFunction;
};

export const endpoints = {
  deliveryOrder: {
    getAll: '/deliveryorder',
    getById: (id: Id) => `/deliveryorder/${id}`,
    create: '/deliveryorder',
    update: (id: Id) => `/deliveryorder/${id}`,
    cancel: (id: Id) => `/deliveryorder/${id}/cancel`,
  },
  inventory: {
    getAll: '/inventory',
    getById: (id: Id) => `/inventory/${id}`,
    create: '/inventory',
    update: (id: Id) => `/inventory/${id}`,
    delete: (id: Id) => `/inventory/${id}`,
  },
  user: {
    getAll: '/users',
    getById: (id: Id) => `/users/${id}`,
    create: '/users',
    update: (id: Id) => `/users/${id}`,
    delete: (id: Id) => `/users/${id}`,
  },
} as const satisfies Record<string, EndpointGroup>;

export type EndpointKey = keyof typeof endpoints;
export type Endpoints<K extends EndpointKey> = (typeof endpoints)[K];
