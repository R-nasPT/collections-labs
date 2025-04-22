<div className="md:w-[35%]">
  <Label
    label={label}
    icon={<Icon className={hasError ? "text-red-600" : `text-purple-600`} />}
    htmlFor={name}
    errors={hasError}
    required
  />
  <Label
    htmlFor={`items.${index}.deliveryCode`}
    label={t("LABEL.RETURNED_DELIVERY_ORDER")}
    errors={errors.items?.[index]?.deliveryCode?.message}
    className="text-[10px]"
    required
  />
  <FormInput
    name={`items.${index}.deliveryCode`}
    register={register}
    errors={errors}
    className="py-2 px-4 text-xs rounded-xl"
  />
</div>
