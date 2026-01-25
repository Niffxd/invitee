"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Check, Loader2, UserPlus, AlertCircle } from "lucide-react";
import { Button, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { SwitchComponent } from "./switch";

interface FormData {
  name: string;
  host: string;
  notes: string;
  willAttend: boolean;
  bringCompanion: boolean;
  companionName: string;
}

export function FormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "Juan Perez",
      host: "Nicolás Sanchez",
      notes: "",
      willAttend: false,
      bringCompanion: false,
      companionName: "",
    },
    mode: "onBlur",
  });

  const willAttend = useWatch({ control, name: "willAttend" });
  const bringCompanion = useWatch({ control, name: "bringCompanion" });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset success state after animation
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="relative px-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Animated Form Container with Hover Glow Effect */}
        <div
          className="animate-slide-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="group relative">
            {/* Animated Glow Border (on hover) */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500" />

            <div className="relative transform transition-all duration-300">
              <Form
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
                        <Label className="text-sm font-medium text-muted">Invitado/a</Label>
                        <Input
                          {...field}
                          className="transition-all duration-300 opacity-80"
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
                        <Label className="text-sm font-medium text-muted">Organizador</Label>
                        <Input
                          {...field}
                          className="transition-all duration-300 opacity-80"
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
                        <div className="flex flex-col gap-2 group w-full">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="notes"
                              className="text-sm font-medium transition-all duration-300 group-focus-within:text-accent"
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
                          <div className="relative group/textarea w-full">
                            {/* Focus ring effect */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within/textarea:opacity-100 blur transition duration-300" />
                            <TextArea
                              {...field}
                              id="notes"
                              aria-label="Mensaje para el organizador"
                              placeholder="Mensaje para el organizador..."
                              rows={4}
                              className="relative w-full transition-all duration-300 hover:shadow-md focus:shadow-xl"
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
                  <div className="space-y-4 rounded-xl bg-linear-to-br from-accent/5 to-primary/5 p-4 border border-accent/10 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 hover:border-accent-soft-hover hover:shadow-lg">
                    <Controller
                      name="willAttend"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="transform transition-all duration-300 hover:translate-x-1">
                          <SwitchComponent
                            label="¿Confirmar asistencia?"
                            name="willAttend"
                            value={value}
                            onChange={onChange}
                          />
                        </div>
                      )}
                    />

                    {/* Conditional Companion Section with Smooth Animation */}
                    {willAttend && (
                      <div className="space-y-4 overflow-hidden animate-slide-in-down">
                        {/* Divider */}
                        <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                        <Controller
                          name="bringCompanion"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <div className="transform transition-all duration-300 hover:translate-x-1">
                              <SwitchComponent
                                label="¿Traerás acompañante?"
                                name="bringCompanion"
                                value={value}
                                onChange={onChange}
                              />
                            </div>
                          )}
                        />

                        {/* Companion Name Field with Enhanced Styling */}
                        {bringCompanion && (
                          <div className="animate-slide-in-down pt-2">
                            <Controller
                              name="companionName"
                              control={control}
                              rules={{
                                required: bringCompanion ? "El nombre del acompañante es requerido" : false,
                                minLength: {
                                  value: 2,
                                  message: "El nombre debe tener al menos 2 caracteres",
                                },
                              }}
                              render={({ field }) => (
                                <div className="flex flex-col gap-2 group w-full">
                                  <Label
                                    htmlFor="companionName"
                                    className="text-sm font-medium transition-all duration-300 group-focus-within:text-accent"
                                  >
                                    <div className="flex items-center gap-2">
                                      <UserPlus className="h-4 w-4 transition-transform group-focus-within:scale-110" />
                                      Nombre del acompañante
                                    </div>
                                  </Label>
                                  <div className="relative w-full">
                                    {/* Focus ring effect */}
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-primary/0 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                                    <Input
                                      {...field}
                                      id="companionName"
                                      placeholder="Nombre de tu +1"
                                      className="relative w-full transition-all duration-300 hover:shadow-md focus:shadow-xl"
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
                    isDisabled={isSubmitting || isSuccess || !willAttend}
                    className={`
                      group relative flex-1 overflow-hidden transition-all duration-500
                      ${isSuccess
                        ? 'bg-success hover:bg-success scale-100'
                        : 'hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
                      }
                      ${!willAttend ? 'opacity-50' : 'opacity-100'}
                    `}
                  >
                    {/* Animated Background Shimmer */}
                    {!isSubmitting && !isSuccess && willAttend && (
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-shimmer" />
                    )}

                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      {isSuccess && (
                        <Check className="h-5 w-5 animate-bounce-gentle" />
                      )}
                      {!isSubmitting && !isSuccess && (
                        <Check className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      )}
                      <span className="font-semibold">
                        {isSubmitting
                          ? "Enviando..."
                          : isSuccess
                            ? "¡Confirmado!"
                            : "Confirmar asistencia"
                        }
                      </span>
                    </div>

                    {/* Success Pulse Ring */}
                    {isSuccess && (
                      <div className="absolute inset-0 rounded-lg animate-ping-slow bg-success-soft-hover" />
                    )}
                  </Button>
                </div>

                {/* Success Message with Enhanced Animation */}
                {isSuccess && (
                  <div className="animate-slide-in-down">
                    <div className="rounded-lg bg-linear-to-r from-success/10 via-success-soft-hover to-success/10 border border-success/30 p-4 text-center shadow-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-5 w-5 text-success animate-bounce-gentle" />
                        <span className="text-sm font-semibold text-success">
                          ¡Tu asistencia ha sido confirmada exitosamente!
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}