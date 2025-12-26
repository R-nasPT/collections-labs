import type { BatchResponses } from '../types';

export class BatchOperationError extends Error {
  failedResponses: BatchResponses<unknown>['responses'];
  totalCount: number;

  constructor(
    failedResponses: BatchResponses<unknown>['responses'],
    totalCount: number
  ) {
    super(
      `Batch operation failed: ${failedResponses.length} of ${totalCount} requests failed`
    );
    this.name = 'BatchOperationError';
    this.failedResponses = failedResponses;
    this.totalCount = totalCount;
  }
}

export const validateBatchResponse = <T>(response: BatchResponses<T>): T[] => {
  const failedResponses = response.responses.filter((res) => res.status >= 300);

  if (failedResponses.length > 0) {
    throw new BatchOperationError(failedResponses, response.responses.length);
  }

  return response.responses.map((res) => res.body);
};

// ------------------------ Example -------------------------------
const printBatchOrders = async (ids: string[]) => {
  const requests = ids.map((id) => ({
    method: 'POST',
    url: endpoints.batch.url(endpoints.deliveryOrder.print(id)),
    headers: { 'content-type': 'application/json' },
  }));

  const response = await apiClient.post<BatchOrderResponse>(
    endpoints.batch.transaction,
    { requests }
  );

  validateBatchResponse(response.data);

  return response.data;
};

//============ Error handling ใน component:

const { mutate } = usePrintBatchOrders();

mutate(ids, {
  onError: (error) => {
    if (error instanceof BatchOperationError) {
      // access error.failedResponses, error.totalCount
      console.error(JSON.stringify(error.failedResponses, null, 2));
      toast.error(`ล้มเหลว ${error.failedResponses.length} รายการ`);
    }
  },
});
