"use server";

import { ProductService } from "@/prisma/services/productService";
import { OrderService } from "@/prisma/services/orderService";
import { PromoExtendida } from "./definitions";
const productService = new ProductService();
const orderService = new OrderService();

const ITEMS_PER_PAGE = 4;
export async function fetchPaginationOrders(page: number, clientId: number) {
  const orders = await orderService.getAllOrdersByUserId(clientId);
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchFilteredOrderById(
  query: string,
  currentPage: number,
  clientId: number
) {
  if (query && query !== "") {

    const splittedQuery = query.split("&").map((item) => item.split("="));
    let queryOrderStatus = "";
    let queryOrderId = "";

    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "status") {
        queryOrderStatus = splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "query") {
        queryOrderId = splittedQuery[i][1];
      }
    }

    const ordenes = await orderService.getAllOrdersByUserId(clientId);
    const filteredOrders = ordenes.filter((order) =>
      (numberIncludes(order.orderId, queryOrderId)) && (
        queryOrderStatus !== "" ? order.status === queryOrderStatus : true

      )
    );

    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationOrders(currentPage,clientId);
  }
}

export async function fetchPaginationBurgers(page: number) {
  const burgers = await productService.getAllBurgersActive();
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

export async function fetchPaginationBurgersByName(
  query: String,
  page: number
) {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const burgers = await productService.getAllBurgersActive();
  if (!burgers) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) {
    // query is not empty

    let queryName = "";
    let queryCategory = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName = splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "category") {
        queryCategory = splittedQuery[i][1];
      }
    }
    const filteredBurgers = burgers
      .filter((burger) =>
        burger.name.toLowerCase().includes(queryName.toLowerCase())
      )
      .filter((burger) =>
        burger.category.toLowerCase().includes(queryCategory.toLowerCase())
      );
    const totalItems = filteredBurgers.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredBurgers.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationBurgers(page);
  }
}

export async function fetchPaginatedPromos(page: number) {
  const promos = await productService.getAllPromosActive();
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

export async function fetchPaginatedPromosByName(
  query: String,
  page: number
): Promise<{ paginatedOrders: PromoExtendida[]; totalPages: number }> {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const promos: PromoExtendida[] = await productService.getAllPromosActive();

  if (!promos) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) {
    // query is not empty

    let queryName = "";
    let queryCategory = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName = splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "category") {
        queryCategory = splittedQuery[i][1];
      }
    }
    const filteredPromos = promos
      .filter((promo) =>
        promo.name.toLowerCase().includes(queryName.toLowerCase())
      )
      .filter((promo) =>
        promo.category.toLowerCase().includes(queryCategory.toLowerCase())
      );
    const totalItems = filteredPromos.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredPromos.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginatedPromos(page);
  }
}

export async function fetchPaginationExtras(page: number) {
  const extras = await productService.getAllExtrasActive();
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

export async function fetchPaginationExtrasByName(
  query: String,
  page: number,
  items_per_page: number
) {
  const splittedQuery = query.split("&").map((item) => item.split("="));
  const extras = await productService.getAllExtrasActive();
  if (!extras) {
    return { paginatedOrders: [], totalPages: 0 };
  }
  if (query !== "" || query !== null) {
    // query is not empty

    let queryName = "";
    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "query") {
        queryName = splittedQuery[i][1];
      }
    }
    const filteredExtras = extras.filter((extra) =>
      extra.name.toLowerCase().includes(queryName.toLowerCase())
    );
    const totalItems = filteredExtras.length;
    const totalPages = Math.ceil(totalItems / items_per_page);
    const start = (page - 1) * items_per_page;
    const end = start + items_per_page;
    const paginatedOrders = filteredExtras.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationExtras(page);
  }
}

export async function fetchPaginationAdminOrders(page: number) {
  const orders = await orderService.getAllOrders();
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchPaginationAdminOrdersById(
  query: string,
  currentPage: number
) {

  if (query && query !== "") {

    const splittedQuery = query.split("&").map((item) => item.split("="));
    let queryOrderStatus = "";
    let queryOrderId = "";

    for (let i = 0; i < splittedQuery.length; i++) {
      if (splittedQuery[i][0] === "status") {
        queryOrderStatus = splittedQuery[i][1];
      }
      if (splittedQuery[i][0] === "query") {
        queryOrderId = splittedQuery[i][1];
      }
    }

    const ordenes = await orderService.getAllOrders();
    const filteredOrders = ordenes.filter((order) =>
      (numberIncludes(order.orderId, queryOrderId)) && (
        queryOrderStatus !== "" ? order.status === queryOrderStatus : true

      )
    );

    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(start, end);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationAdminOrders(currentPage);
  }
}

function numberIncludes(number: number, query: string) {
  return number.toString().includes(query);
}
