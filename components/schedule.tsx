import { CalendarFold, Clock4, MapPinHouse } from "lucide-react";
import { Card } from "@heroui/react";

export const Schedule = () => {
  return (
    <div className="relative p-8">
      <div className="relative max-w-3xl mx-auto space-y-3">
        {/* Single Column Layout */}
        <div className="space-y-3">
          {/* Date Card */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

              <div className="relative transform transition-all duration-300">
                <Card className="w-full p-4 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                      <CalendarFold className="size-6 text-accent" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted block mb-0.5">Fecha</span>
                      <span className="text-base sm:text-lg font-bold text-foreground">Sábado 7 de Febrero</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

              <div className="relative transform transition-all duration-300">
                <Card className="w-full p-4 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                      <Clock4 className="size-6 text-accent" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted block mb-0.5">Horario</span>
                      <span className="text-base sm:text-lg font-bold text-foreground">14:00 - 00:00</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

              <div className="relative transform transition-all duration-300">
                <Card className="w-full p-4 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 shrink-0">
                      <MapPinHouse className="size-6 text-accent" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted block mb-0.5">Ubicación</span>
                      <span className="text-sm sm:text-base font-bold text-foreground block mb-2 leading-tight">
                        Jonas Salk 2892, Esq. F. Leloir
                      </span>
                      <span className="text-xs sm:text-sm text-muted">Yerba Buena, Tucumán</span>
                      {/* Map Preview */}
                      <div className="mt-3 rounded-xl overflow-hidden border border-border/20">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d890.2640657110951!2d-65.3120096714643!3d-26.806337098538336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942242e845d9fd81%3A0x53894b3793567516!2sJonas%20Salk%20%26%20F.%20Leloir%2C%20Yerba%20Buena%2C%20Tucum%C3%A1n!5e0!3m2!1sen!2sar!4v1769334063158!5m2!1sen!2sar"
                          width="100%"
                          height="200px"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
