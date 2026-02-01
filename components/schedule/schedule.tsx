import { CalendarFold, Clock4, MapPinHouse } from "lucide-react";
import { Card } from "./components";

export const Schedule = () => {
  return (
    <div className="relative p-8">
      <div className="relative max-w-xl mx-auto space-y-3">
        {/* Single Column Layout */}
        <div className="space-y-3">
          {/* Date Card */}
          <Card
            title="Fecha"
            description="Sábado 7 de Febrero"
            icon={<CalendarFold className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          />

          {/* Time Card */}
          <Card
            title="Horario"
            description="14:00 - 00:00"
            icon={<Clock4 className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          />

          {/* Location Card */}
          <Card
            title="Ubicación"
            description="Jonas Salk 2892, Esq. F. Leloir"
            icon={<MapPinHouse className="size-6 text-accent" strokeWidth={2} />}
            className="animate-slide-in-up"
          >
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
          </Card>
        </div>
      </div>
    </div>
  );
};
