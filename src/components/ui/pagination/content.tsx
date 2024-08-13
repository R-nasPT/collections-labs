import DeliveryOrdersContent from "@/components/delivery-orders/DeliveryOrdersContent";
import { redirect } from "@/navigation";

interface DeliveryOrdersProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DeliveryOrders({
  searchParams,
}: DeliveryOrdersProps) {
  const page = Number(searchParams["page"]);
  const per_page = Number(searchParams["per_page"]);
  const status = searchParams["status"] as string | undefined;

  if (!page || !per_page) {
    redirect('/delivery-orders?page=1&per_page=10');
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_0_3px_rgba(0,0,0,0.3)] mb-5">
        <DeliveryOrdersContent page={page} per_page={per_page} status={status}/>
    </div>
  );
}



// -------------------------------------------------------------------------------------
"use client";

import OrderTable from "./OrderTable";
import { useRouter } from "@/navigation";
import { useEffect, useState } from "react";
import { useDeliveryOrdersList } from "@/services";
import DrawerOrderDetail from "./DrawerOrderDetail";
import OrderStatusFilter from "./OrderStatusFilter";
import CancelDialog from "../common/modal/CancelDialog";
import { Pagination } from "../ui";

interface DeliveryOrdersContentProps {
  page: number;
  per_page: number;
  status?: string;
}
export default function DeliveryOrdersContent({
  page: initialPage,
  per_page: initialPerPage,
  status: initialStatus,
}: DeliveryOrdersContentProps) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [status, setStatus] = useState(initialStatus);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: orders, isLoading, isFetching, refetch } = useDeliveryOrdersList(initialPage, initialPerPage, initialStatus);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    router.push(
      `/delivery-orders?page=1&per_page=${perPage}${
        newStatus !== "" ? `&status=${newStatus}` : ""
      }`
    );
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    router.push(
      `/delivery-orders?page=1&per_page=${newPerPage}${
        status ? `&status=${status}` : ""
      }`
    );
  };

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const entries = orders?.data || [];
  const totalCount = orders?.total || 0;

  const handleOpenDrawer = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (initialPage !== page) setPage(initialPage);
    if (initialPerPage !== perPage) setPerPage(initialPerPage);
    if (initialStatus !== status) setStatus(initialStatus);
  }, [initialPage, initialPerPage, initialStatus, page, perPage, status]);
  return (
    <>
      <OrderStatusFilter
        status={status}
        handleStatusChange={handleStatusChange}
        statusResponse={orders?.status!}
      />

      <OrderTable
        orders={entries}
        isLoading={isLoading || isFetching}
        openDrawer={handleOpenDrawer}
        currentStatus={status}
      />

      <Pagination
        total={totalCount}
        hasNextPage={end < totalCount}
        hasPrevPage={start > 0}
        onPerPageChange={handlePerPageChange}
      />

      <DrawerOrderDetail
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        orderId={selectedOrderId}
      />
    </>
  );
}
