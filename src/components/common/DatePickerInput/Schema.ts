import { z } from "zod";

const DateValueSchema = z.object({
  startDate: z.union([z.date(), z.null()]),
  endDate: z.union([z.date(), z.null()]),
});

// ------ perfect ------
const DateValueSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

// const DateValueSchema = z.object({
//   startDate: z.string().datetime(),
//   endDate: z.string().datetime(),
// });

export const AdviceUpdateSchema = z.object({
  dateSingle: DateValueSchema.or(
    z.undefined().refine(() => false, {
      message: `Make sure any date! All M/D missed!!`,
    })
  ),
});
