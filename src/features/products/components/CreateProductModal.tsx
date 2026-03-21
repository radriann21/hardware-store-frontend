import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Flex,
  Input,
  NativeSelect,
  Portal,
  NumberInput,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormData,
} from "@/features/products/validations/product.validation";
import { useGetCategories } from "@/features/categories/hooks/useCategories";
import { useGetMeasures } from "@/features/measures/hooks/useMeasures";
import { useCreateProduct, useEditProduct } from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/interfaces/interfaces";
import { useEffect } from "react";

interface CreateProductModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  productToEdit?: Product | null;
}

export const CreateProductModal = ({
  isOpen,
  onOpenChange,
  productToEdit,
}: CreateProductModalProps) => {
  const { data: categories } = useGetCategories();
  const { data: measures } = useGetMeasures();
  
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: editProduct } = useEditProduct();

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        price_usd: Number(productToEdit.price_usd),
        actual_stock: productToEdit.actual_stock,
        min_stock: productToEdit.min_stock,
        measure_id: productToEdit.measure.id,
        category_id: productToEdit.category.id,
        tax_percentage: 16,
      });
    } else {
      reset();
    }
  }, [productToEdit, reset]);

  const onSubmit = (data: ProductFormData) => {
    if (productToEdit) {
      editProduct(
        { id: productToEdit.id.toString(), data },
        {
          onSuccess: () => {
            onOpenChange();
            reset();
          },
        }
      );
    } else {
      createProduct(data, {
        onSuccess: () => {
          onOpenChange();
          reset();
        },
      });
    }
  };

  /* este modal es una barbaridad hermano */

  return (
    <Dialog.Root size="lg" open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {productToEdit ? "Editar producto" : "Crear nuevo producto"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root>
                  <Fieldset.Legend fontWeight="semibold">
                    Información del producto
                  </Fieldset.Legend>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label fontWeight="semibold">Nombre</Field.Label>
                    <Input
                      size="sm"
                      placeholder="Nombre del producto.."
                      {...register("name")}
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.description}>
                    <Field.Label fontWeight="semibold">Descripción</Field.Label>
                    <Input
                      size="sm"
                      placeholder="Descripción del producto.."
                      {...register("description")}
                    />
                    {errors.description && (
                      <Field.ErrorText>
                        {errors.description.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.price_usd}>
                    <Field.Label fontWeight="semibold">
                      Precio (USD)
                    </Field.Label>
                    <Controller
                      name="price_usd"
                      control={control}
                      render={({ field }) => (
                        <NumberInput.Root
                          size="sm"
                          name={field.name}
                          width="100%"
                          disabled={field.disabled}
                          formatOptions={{
                            style: "currency",
                            currency: "USD",
                            currencyDisplay: "code",
                            currencySign: "accounting",
                          }}
                          onValueChange={(details) => {
                            field.onChange(details.valueAsNumber);
                          }}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                    {errors.price_usd && (
                      <Field.ErrorText>
                        {errors.price_usd.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Flex alignItems="center" gapX="4">
                    <Field.Root invalid={!!errors.actual_stock}>
                      <Field.Label fontWeight="semibold">
                        Stock Actual
                      </Field.Label>
                      <Controller
                        name="actual_stock"
                        control={control}
                        render={({ field }) => (
                          <NumberInput.Root
                            size="sm"
                            width="100%"
                            disabled={field.disabled}
                            name={field.name}
                            value={field.value?.toString() || ""}
                            onValueChange={(details) => {
                              field.onChange(details.valueAsNumber);
                            }}
                          >
                            <NumberInput.Control />
                            <NumberInput.Input onBlur={field.onBlur} />
                          </NumberInput.Root>
                        )}
                      />
                      {errors.actual_stock && (
                        <Field.ErrorText>
                          {errors.actual_stock.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.min_stock}>
                      <Field.Label fontWeight="semibold">
                        Stock Mínimo
                      </Field.Label>
                      <Controller
                        name="min_stock"
                        control={control}
                        render={({ field }) => (
                          <NumberInput.Root
                            size="sm"
                            width="100%"
                            disabled={field.disabled}
                            name={field.name}
                            value={field.value?.toString() || ""}
                            onValueChange={(details) => {
                              field.onChange(details.valueAsNumber);
                            }}
                          >
                            <NumberInput.Control />
                            <NumberInput.Input onBlur={field.onBlur} />
                          </NumberInput.Root>
                        )}
                      />
                      {errors.min_stock && (
                        <Field.ErrorText>
                          {errors.min_stock.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Flex>
                  <Flex w="full" alignItems="center" gapX="20px">
                    <Field.Root invalid={!!errors.category_id}>
                      <Field.Label fontWeight="semibold">Categoría</Field.Label>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field
                          {...register("category_id", { valueAsNumber: true })}
                        >
                          {categories?.map((category) => (
                            <option
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                      {errors.category_id && (
                        <Field.ErrorText>
                          {errors.category_id.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.measure_id}>
                      <Field.Label fontWeight="semibold">Medida</Field.Label>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field
                          {...register("measure_id", { valueAsNumber: true })}
                        >
                          {measures?.map((measure) => (
                            <option
                              key={measure.id}
                              value={measure.id.toString()}
                            >
                              {measure.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                      {errors.measure_id && (
                        <Field.ErrorText>
                          {errors.measure_id.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Flex>
                  <Field.Root>
                    <Flex
                      w="full"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Field.Label fontWeight="semibold">IVA</Field.Label>
                      <Field.HelperText fontSize="xs">
                        Por defecto 16% - Opcional
                      </Field.HelperText>
                    </Flex>
                    <Controller
                      name="tax_percentage"
                      control={control}
                      render={({ field }) => (
                        <NumberInput.Root
                          size="sm"
                          width="100%"
                          disabled={field.disabled}
                          name={field.name}
                          value={field.value?.toString() || ""}
                          onValueChange={(details) => {
                            field.onChange(details.valueAsNumber);
                          }}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                    {errors.tax_percentage && (
                      <Field.ErrorText>
                        {errors.tax_percentage.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Button
                    type="submit"
                    size="sm"
                    bgColor="green.600"
                    color="white"
                    _hover={{ bgColor: "green.700" }}
                  >
                    {productToEdit ? "Actualizar Producto" : "Crear Producto"}
                  </Button>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
