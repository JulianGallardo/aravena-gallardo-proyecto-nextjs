import { date } from "zod";

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
export async function fetchPaginationOrders( page: number) {
  const orders = ordenes;
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(start, end);
  return { paginatedOrders, totalPages };
}

export async function fetchFilteredOrderById(query: string, currentPage: number) {

  console.log(query, currentPage)
  if (query) {
    console.log("entro")
    console.log(ordenes.map((order) => console.log(order.id === query)));
    const filteredOrders = ordenes.filter((order) => console.log(order.id === query));
    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(start, end);
    console.log(paginatedOrders);
    return { paginatedOrders, totalPages };
  } else {
    return await fetchPaginationOrders(currentPage);
  }
}