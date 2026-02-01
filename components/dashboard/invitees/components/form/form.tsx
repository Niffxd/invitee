"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Check, Loader2, UserPlus, AlertCircle, User } from "lucide-react";
import { Button, Form as FormHeroui, Input, Label, TextArea } from "@heroui/react";
import { createInvitee, updateInvitee, showToast } from "@/helpers";
import { Switch, Loading } from "@/components";
import { CredentialProps } from "@/types";
import { NewInviteeFormData } from "./types";

export const NewInviteeForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewInviteeFormData>({
    defaultValues: {
      name: "",
      notes: "",
      hasPlusOne: false,
      plusOneName: "",
    },
    mode: "onBlur",
  });

  const hasPlusOne = useWatch({ control, name: "hasPlusOne" });

  // Check authentication
  useEffect(() => {
    const storedCredential = sessionStorage.getItem("credential");

    if (!storedCredential) {
      router.push("/login");
      return;
    }

    try {
      const parsedCredential = JSON.parse(storedCredential);
      setCredential(parsedCredential);
    } catch (error) {
      console.error("Failed to parse credential:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Effect to handle hasPlusOne state changes
  useEffect(() => {
    if (!hasPlusOne) {
      setValue("plusOneName", "");
    }
  }, [hasPlusOne, setValue]);

  const onSubmit = async (data: NewInviteeFormData) => {
    setIsSubmitting(true);

    try {
      // Create the invitee with the name
      const inviteeId = await createInvitee(data.name);

      // If notes or plus one are provided, update the invitee
      if (data.notes || data.hasPlusOne) {
        await updateInvitee(
          inviteeId,
          {
            isConfirmed: false,
            isDeclined: false,
            hasPlusOne: data.hasPlusOne,
            notes: data.notes || "",
          },
          data.hasPlusOne,
          data.hasPlusOne ? data.plusOneName : undefined
        );
      }

      // Show success toast
      showToast({
        text: "Invitado creado exitosamente",
        variant: "success",
        icon: <Check />,
        description: `${data.name} ha sido agregado a la lista`,
      });

      // Navigate back to invitees list
      router.push("/dashboard/invitees");
    } catch (error) {
      console.error("Error creating invitee:", error);
      showToast({
        text: "Error al crear invitado",
        variant: "danger",
        icon: <AlertCircle />,
        description: "Ocurrió un error. Por favor, intenta de nuevo",
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!credential) {
    return null; // Will redirect
  }

  return (
    <div className="relative p-8">
      <div className="relative max-w-xl mx-auto">
        {/* Animated Form Container with Hover Glow Effect */}
        <div
          className="animate-slide-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="group relative">
            {/* Animated Glow Border */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

            <div className="relative transform transition-all duration-300">
              <FormHeroui
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-5 rounded-2xl backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg p-6 sm:p-8"
              >
                {/* Animated Title with Gradient */}
                <div
                  className="relative mb-2 animate-fade-in"
                  style={{ animationDelay: "0.2s", animationFillMode: "both" }}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift mb-3">
                    Crear nuevo invitado
                  </h1>
                  {/* Decorative line with animation */}
                  <div className="relative h-1 w-32 overflow-hidden rounded-full bg-accent/10">
                    <div className="absolute inset-0 bg-linear-to-r from-accent/50 via-primary to-accent/50 animate-shimmer" />
                  </div>
                </div>

                {/* Name Field */}
                <div
                  className="animate-slide-in-up"
                  style={{ animationDelay: "0.3s", animationFillMode: "both" }}
                >
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "El nombre es requerido",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-2 group/name w-full">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium transition-all duration-300 group-focus-within/name:text-accent"
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 transition-transform group-focus-within/name:scale-110" />
                            Nombre del invitado
                          </div>
                        </Label>
                        <div className="relative w-full">
                          {/* Focus ring effect */}
                          <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within/name:opacity-100 blur transition duration-300" />
                          <Input
                            {...field}
                            id="name"
                            placeholder="Nombre completo"
                            className="relative w-full transition-all duration-300 focus:shadow-xl"
                          />
                        </div>
                        {errors.name && (
                          <div className="flex items-center gap-2 text-sm text-danger animate-slide-in-down">
                            <AlertCircle className="h-4 w-4 animate-pulse" />
                            <span>{errors.name.message}</span>
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Notes Field with Character Counter */}
                <div
                  className="animate-slide-in-up"
                  style={{ animationDelay: "0.4s", animationFillMode: "both" }}
                >
                  <Controller
                    name="notes"
                    control={control}
                    rules={{
                      maxLength: {
                        value: 64,
                        message: "Las notas no pueden exceder 64 caracteres",
                      },
                    }}
                    render={({ field }) => {
                      const charCount = field.value?.length || 0;
                      const maxChars = 64;
                      const isNearLimit = charCount > maxChars * 0.8;

                      return (
                        <div className="flex flex-col gap-2 group/notes w-full">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="notes"
                              className="text-sm font-medium transition-all duration-300 group-focus-within/notes:text-accent"
                            >
                              Notas adicionales
                            </Label>
                            <span
                              className={`text-xs font-medium transition-all duration-300 ${isNearLimit
                                ? 'text-warning scale-110'
                                : 'text-muted'
                                }`}
                            >
                              {charCount}/{maxChars}
                            </span>
                          </div>
                          <div className="relative w-full">
                            {/* Focus ring effect */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within/notes:opacity-100 blur transition duration-300" />
                            <TextArea
                              {...field}
                              id="notes"
                              aria-label="Notas adicionales"
                              placeholder="Notas adicionales sobre el invitado..."
                              rows={4}
                              className="relative w-full transition-all duration-300 focus:shadow-xl"
                            />
                          </div>
                          {errors.notes && (
                            <div className="flex items-center gap-2 text-sm text-danger animate-slide-in-down">
                              <AlertCircle className="h-4 w-4 animate-pulse" />
                              <span>{errors.notes.message}</span>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Plus One Section with Enhanced Card Styling */}
                <div
                  className="animate-slide-in-up"
                  style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                >
                  <div className="space-y-4 rounded-xl bg-linear-to-br from-accent/5 to-primary/5 p-4 border border-accent/10 transition-all duration-500">
                    <Controller
                      name="hasPlusOne"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="transform transition-all duration-300">
                          <Switch
                            label="¿Tiene acompañante?"
                            name="hasPlusOne"
                            value={value}
                            onChange={onChange}
                          />
                        </div>
                      )}
                    />

                    {/* Conditional Plus One Name Field with Smooth Animation */}
                    {hasPlusOne && (
                      <div className="animate-slide-in-down pt-2">
                        <Controller
                          name="plusOneName"
                          control={control}
                          rules={{
                            required: hasPlusOne ? "El nombre del acompañante es requerido" : false,
                            minLength: {
                              value: 2,
                              message: "El nombre debe tener al menos 2 caracteres",
                            },
                          }}
                          render={({ field }) => (
                            <div className="flex flex-col gap-2 group/plusOne w-full">
                              <Label
                                htmlFor="plusOneName"
                                className="text-sm font-medium transition-all duration-300 group-focus-within/plusOne:text-accent"
                              >
                                <div className="flex items-center gap-2">
                                  <UserPlus className="h-4 w-4 transition-transform group-focus-within/plusOne:scale-110" />
                                  Nombre del acompañante
                                </div>
                              </Label>
                              <div className="relative w-full">
                                {/* Focus ring effect */}
                                <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within/plusOne:opacity-100 blur transition duration-300" />
                                <Input
                                  {...field}
                                  id="plusOneName"
                                  placeholder="Nombre del acompañante"
                                  className="relative w-full transition-all duration-300 focus:shadow-xl"
                                />
                              </div>
                              {errors.plusOneName && (
                                <div className="flex items-center gap-2 text-sm text-danger animate-slide-in-down">
                                  <AlertCircle className="h-4 w-4 animate-pulse" />
                                  <span>{errors.plusOneName.message}</span>
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button with Enhanced Loading and Success States */}
                <div
                  className="w-full flex flex-col gap-4 pt-4 animate-slide-in-up"
                  style={{ animationDelay: "0.6s", animationFillMode: "both" }}
                >
                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    className={`
                      w-full group relative overflow-hidden transition-all duration-500
                      active:scale-[0.98]
                      `}
                  >
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {!isSubmitting && (
                        <Check className="h-5 w-5 transition-transform duration-300" />
                      )}
                      <span className="font-semibold">
                        {isSubmitting
                          ? "Creando..."
                          : "Crear invitado"
                        }
                      </span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onPress={() => router.push("/dashboard")}
                    isDisabled={isSubmitting}
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>

              </FormHeroui>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
