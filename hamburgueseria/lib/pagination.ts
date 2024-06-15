"use server";

import { ProductService } from '@/prisma/services/productService';
import { PromoExtendida } from './definitions';
const productService = new ProductService();
const ordenes = [
  {
    id: "1",
    nombre: "Hamburguesa de pollo",
    date: new Date(),
    precio: 5,
    cantidad: 2,
  },
  {
    id: "2",
    nombre: "Hamburguesa de res",
    date: new Date(),
    precio: 6,
    cantidad: 1,
  },
  {
    id: "3",
    nombre: "Hamburguesa de pescado",
    date: new Date(),
    precio: 7,
    cantidad: 3,
  },
  {
    id: "4",
    nombre: "Hamburguesa vegetariana",
    date: new Date(),
    precio: 4,
    cantidad: 2,
  },
  {
    id: "5",
    nombre: "Hamburguesa de pollo",
    date: new Date(),
    precio: 5,
    cantidad: 2,
  },
  {
    id: "6",
    nombre: "Hamburguesa de res",
    date: new Date(),
    precio: 6,
    cantidad: 1,
  },
  {
    id: "7",
    nombre: "Hamburguesa de pescado",
    date: new Date(),
    precio: 7,
    cantidad: 3,
  },
  {
    id: "8",
    nombre: "Hamburguesa vegetariana",
    date: new Date(),
    precio: 4,
    cantidad: 2,
  },
  {
    id: "9",
    nombre: "Hamburguesa de pollo",
    date: new Date(),
    precio: 5,
    cantidad: 2,
  },
  {
    id: "10",
    nombre: "Hamburguesa de res",
    date: new Date(),
    precio: 6,
    cantidad: 1,
  },
  {
    id: "11",
    nombre: "Hamburguesa de pescado",
    date: new Date(),
    precio: 7,
    cantidad: 3,
  },
  {
    id: "12",
    nombre: "Hamburguesa vegetariana",
    date: new Date(),
    precio: 4,
    cantidad: 2,
  },
  {
    id: "13",
    nombre: "Hamburguesa de pollo",
    date: new Date(),
    precio: 5,
    cantidad: 2,
  },
  {
    id: "14",
    nombre: "Hamburguesa de res",
    date: new Date(),
    precio: 6,
    cantidad: 1,
  },
  {
    id: "15",
    nombre: "Hamburguesa de pescado",
    date: new Date(),
    precio: 7,
    cantidad: 3,
  }
];


const ITEMS_PER_PAGE = 4;
export async function fetchPaginationOrders(page: number) {
  const orders = ordenes;
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchFilteredOrderById(query: string, currentPage: number) {
  if (query) {
    const filteredOrders = ordenes.filter((order) => order.id === query);
    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationOrders(currentPage);
  }
}

export async function fetchPaginationBurgers(page: number) {

  const burgers = await productService.getAllBurgers();
  if (!burgers) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  const totalItems = burgers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = burgers.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchPaginationBurgersByName(query: String, page: number) {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const burgers = await productService.getAllBurgers();
  if (!burgers) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) { // query is not empty

    let queryName = "";
    let queryCategory = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName= splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "category") {
        queryCategory = splittedQuery[i][1];
      }
    }
    const filteredBurgers = burgers.filter((burger) => burger.name.toLowerCase().includes(queryName.toLowerCase())).filter((burger) => burger.category.toLowerCase().includes(queryCategory.toLowerCase()));
    const totalItems = filteredBurgers.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredBurgers.slice(start, end);
    return { paginatedOrders, totalPages };
  }
  else {
    return await fetchPaginationBurgers(page);
  }
}

export async function fetchPaginatedPromos(page: number) {
  const promos = await productService.getAllPromos();
  if (!promos) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  const totalItems = promos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = promos.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchPaginatedPromosByName(query: String, page: number):Promise<{paginatedOrders:PromoExtendida[],totalPages:number}> {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const promos:PromoExtendida[] = await productService.getAllPromos();
  
  if (!promos) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) { // query is not empty

    let queryName = "";
    let queryCategory = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName= splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "category") {
        queryCategory = splittedQuery[i][1];
      }
    }
    const filteredPromos = promos.filter((promo) => promo.name.toLowerCase().includes(queryName.toLowerCase())).filter((promo) => promo.category.toLowerCase().includes(queryCategory.toLowerCase()));
    const totalItems = filteredPromos.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredPromos.slice(start, end);
    return { paginatedOrders, totalPages };
  }
  else {
    return await fetchPaginatedPromos(page);
  }
}


export async function fetchPaginationExtras(page: number) {
  const extras = await productService.getAllExtras();
  if (!extras) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  const totalItems = extras.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = extras.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchPaginationExtrasByName(query: String, page: number) {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const extras = await productService.getAllExtras();
  if (!extras) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) { // query is not empty

    let queryName = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName= splittedQuery[i][1];
      }
    }
    const filteredExtras = extras.filter((extra) => extra.name.toLowerCase().includes(queryName.toLowerCase()));
    const totalItems = filteredExtras.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredExtras.slice(start, end);
    return { paginatedOrders, totalPages };
  }
  else {
    return await fetchPaginationExtras(page);
  }
}


