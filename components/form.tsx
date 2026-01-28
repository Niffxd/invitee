"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Check, Loader2, UserPlus, AlertCircle, Lock, Send, Frown } from "lucide-react";
import { Button, Form as FormHeroui, Input, Label, TextArea, TextField } from "@heroui/react";
import { updateInvitee } from "@/helpers";
import { SwitchComponent } from "./switch";
import { RadioButton } from "./radio-button";
import { showToast } from "./toast";

interface FormData {
  name: string;
  host: string;
  notes: string;
  answerSelected: string;
  hasPlusOne: boolean;
  companionName: string;
}

export const Form = ({ inviteeId, inviteeName }: { inviteeId: string, inviteeName: string | undefined }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: inviteeName,
      host: "Nicolás Sanchez",
      notes: "",
      answerSelected: "",
      hasPlusOne: false,
      companionName: "",
    },
    mode: "onBlur",
  });

  const answerSelected = useWatch({ control, name: "answerSelected" });
  const hasPlusOne = useWatch({ control, name: "hasPlusOne" });

  const radioOptions = [
    {
      value: "isConfirmed",
      label: "Asistiré",
    },
    {
      value: "isDeclined",
      label: "No asistiré",
    }
  ];

  // Effect to handle isConfirmed state changes
  useEffect(() => {
    if (answerSelected !== "isConfirmed") {
      setValue("hasPlusOne", false);
      setValue("companionName", "");
    }
  }, [answerSelected, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!inviteeId) {
      showToast({
        text: "Error: ID de invitado no encontrado",
        variant: "danger",
        icon: <AlertCircle />,
        description: "No se pudo identificar el invitado",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isConfirmedSelected = data.answerSelected === "isConfirmed";
      const isDeclinedSelected = data.answerSelected === "isDeclined";

      await updateInvitee(
        inviteeId,
        {
          isConfirmed: isConfirmedSelected,
          isDeclined: isDeclinedSelected,
          hasPlusOne: data.hasPlusOne,
          notes: data.notes || "",
        },
        data.hasPlusOne,
        data.hasPlusOne ? data.companionName : undefined
      );

      // Show success toast
      if (isConfirmedSelected) {
        showToast({
          text: "¡Tu asistencia ha sido confirmada exitosamente!",
          variant: "success",
          icon: <Check />,
          description: "Gracias por confirmar tu asistencia",
        });
      }

      if (isDeclinedSelected) {
        showToast({
          text: "¡Lamentamos que no puedas asistir!",
          variant: "accent",
          icon: <Frown />,
          description: "Podes cambiar de opinión ingresando nuevamente al enlace",
        });
      }
    } catch (error) {
      const inviteeNotFound = error instanceof Error && error.message === "Invitee not found"
      // Show error toast
      showToast({
        text: "Error al confirmar asistencia",
        variant: "danger",
        icon: <AlertCircle />,
        description: inviteeNotFound ? "Invitado no se encuentra en la lista" : "Ocurrió un error inesperado",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-8 z-20">
      <div className="relative max-w-3xl mx-auto">
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
                    Confirma tu asistencia
                  </h1>
                  {/* Decorative line with animation */}
                  <div className="relative h-1 w-32 overflow-hidden rounded-full bg-accent/10">
                    <div className="absolute inset-0 bg-linear-to-r from-accent/50 via-primary to-accent/50 animate-shimmer" />
                  </div>
                </div>

                {/* Disabled Fields with Enhanced Styling */}
                <div
                  className="space-y-4 animate-slide-in-up"
                  style={{ animationDelay: "0.3s", animationFillMode: "both" }}
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        isDisabled
                        name={field.name}
                        type="text"
                        className="group"
                      >
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium text-muted">Invitado/a</Label>
                          <div className="flex items-center gap-1.5 text-xs text-muted/70">
                            <Lock className="h-3.5 w-3.5" />
                          </div>
                        </div>
                        <Input
                          {...field}
                          className="transition-all duration-300 bg-muted/20 cursor-not-allowed border-dashed"
                        />
                      </TextField>
                    )}
                  />

                  <Controller
                    name="host"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        isDisabled
                        name={field.name}
                        type="text"
                        className="group"
                      >
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium text-muted">Organizador</Label>
                          <div className="flex items-center gap-1.5 text-xs text-muted/70">
                            <Lock className="h-3.5 w-3.5" />
                          </div>
                        </div>
                        <Input
                          {...field}
                          className="transition-all duration-300 bg-muted/20 cursor-not-allowed border-dashed"
                        />
                      </TextField>
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
                              aria-label="Mensaje para el organizador"
                              placeholder="Mensaje para el organizador..."
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

                {/* Attendance Switch with Enhanced Card Styling */}
                <div
                  className="animate-slide-in-up"
                  style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                >
                  <div className="space-y-4 rounded-xl bg-linear-to-br from-accent/5 to-primary/5 p-4 border border-accent/10 transition-all duration-500">
                    <Controller
                      name="answerSelected"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="transform transition-all duration-300">
                          <RadioButton
                            name={answerSelected}
                            options={radioOptions}
                            value={value as string}
                            onChange={onChange}
                          />
                        </div>
                      )}
                    />
                    {/* Conditional Companion Section with Smooth Animation */}
                    {answerSelected === "isConfirmed" && (
                      <div className="space-y-4 overflow-hidden animate-slide-in-down">
                        {/* Divider */}
                        <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                        <Controller
                          name="hasPlusOne"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <div className="transform transition-all duration-300">
                              <SwitchComponent
                                label="¿Traerás acompañante?"
                                name="hasPlusOne"
                                value={value}
                                onChange={onChange}
                              />
                            </div>
                          )}
                        />

                        {/* Companion Name Field with Enhanced Styling */}
                        {hasPlusOne && (
                          <div className="animate-slide-in-down pt-2">
                            <Controller
                              name="companionName"
                              control={control}
                              rules={{
                                required: hasPlusOne ? "El nombre del acompañante es requerido" : false,
                                minLength: {
                                  value: 2,
                                  message: "El nombre debe tener al menos 2 caracteres",
                                },
                              }}
                              render={({ field }) => (
                                <div className="flex flex-col gap-2 group/companion w-full">
                                  <Label
                                    htmlFor="companionName"
                                    className="text-sm font-medium transition-all duration-300 group-focus-within/companion:text-accent"
                                  >
                                    <div className="flex items-center gap-2">
                                      <UserPlus className="h-4 w-4 transition-transform group-focus-within/companion:scale-110" />
                                      Nombre del acompañante
                                    </div>
                                  </Label>
                                  <div className="relative w-full">
                                    {/* Focus ring effect */}
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within/companion:opacity-100 blur transition duration-300" />
                                    <Input
                                      {...field}
                                      id="companionName"
                                      placeholder="Nombre de tu +1"
                                      className="relative w-full transition-all duration-300 focus:shadow-xl"
                                    />
                                  </div>
                                  {errors.companionName && (
                                    <div className="flex items-center gap-2 text-sm text-danger animate-slide-in-down">
                                      <AlertCircle className="h-4 w-4 animate-pulse" />
                                      <span>{errors.companionName.message}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button with Enhanced Loading and Success States */}
                <div
                  className="flex gap-3 pt-4 animate-slide-in-up"
                  style={{ animationDelay: "0.6s", animationFillMode: "both" }}
                >
                  <Button
                    type="submit"
                    isDisabled={!(isSubmitting || answerSelected !== "")}
                    className={`
                      group relative flex-1 overflow-hidden transition-all duration-500
                      active:scale-[0.98]
                      ${isSubmitting || answerSelected !== "" ? 'opacity-100' : 'opacity-50'}
                    `}
                  >
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {!isSubmitting && (
                        <Send className="h-5 w-5 transition-transform duration-300" />
                      )}
                      <span className="font-semibold">
                        {isSubmitting
                          ? "Enviando..."
                          : "Enviar"
                        }
                      </span>
                    </div>
                  </Button>
                </div>

              </FormHeroui>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}